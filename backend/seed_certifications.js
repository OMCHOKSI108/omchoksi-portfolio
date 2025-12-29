/*
  Seed script for certifications.
  Reads `../docs/certifications.txt` and updates the database.
  Uploads corresponding PDFs from `../docs/certificate/` to Cloudinary.
  
  Usage: set MONGODB_URI and CLOUDINARY_URL in .env then run:
    node seed_certifications.js
*/
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

async function main() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('Please set MONGODB_URI in environment (.env file)');
        process.exit(1);
    }

    // Configure Cloudinary explicitly
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
        console.warn('Warning: Cloudinary credentials missing in .env. File uploads may fail.');
    }

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }

    // Define local schema to match src/models/Certification.ts
    const CertificationSchema = new mongoose.Schema({
        title: { type: String, required: true, index: true },
        slug: { type: String, required: true, unique: true, index: true },
        description: { type: String, required: true },
        tags: [{ type: String, index: true }],
        link: { type: String },
        image: { type: String },
        pdf: { type: String }, // specific field for PDF URL
        issuer: { type: String, required: true },
        issueDate: { type: Date, required: true },
        expiryDate: { type: Date },
        credentialId: { type: String },
        active: { type: Boolean, default: true, index: true },
        featured: { type: Boolean, default: false, index: true },
        status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft', index: true },
    }, {
        timestamps: true,
    });

    const Certification = mongoose.models.Certification || mongoose.model('Certification', CertificationSchema);

    // Paths
    const docsPath = path.join(__dirname, '..', 'docs', 'certifications.txt');
    const pdfDir = path.join(__dirname, '..', 'docs', 'certificate');

    if (!fs.existsSync(docsPath)) {
        console.error(`File not found: ${docsPath}`);
        process.exit(1);
    }

    const content = fs.readFileSync(docsPath, 'utf8');
    const certs = parseCertifications(content);

    console.log(`Parsed ${certs.length} certifications.`);

    for (const cert of certs) {
        // Handle PDF Upload
        if (cert.localFileName) {
            const pdfPath = path.join(pdfDir, cert.localFileName);
            if (fs.existsSync(pdfPath)) {
                try {
                    console.log(`Uploading ${cert.localFileName}...`);
                    // Upload to Cloudinary
                    const result = await cloudinary.uploader.upload(pdfPath, {
                        folder: 'certifications',
                        resource_type: 'auto', // Important for PDFs
                        use_filename: true,
                        unique_filename: false,
                        overwrite: true
                    });

                    if (result && result.secure_url) {
                        cert.pdf = result.secure_url;
                        cert.image = result.secure_url; // Use PDF as image (frontend handles thumbnailing)
                        console.log(`  -> Uploaded: ${result.secure_url}`);
                    }
                } catch (uploadErr) {
                    console.error(`  -> Failed to upload PDF for ${cert.title}:`, uploadErr.message);
                }
            } else {
                console.warn(`  -> PDF file not found locally: ${pdfPath}`);
            }
            // Cleanup temp field
            delete cert.localFileName;
        }

        try {
            await Certification.findOneAndUpdate(
                { slug: cert.slug },
                cert,
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            console.log(`Upserted: ${cert.title}`);
        } catch (err) {
            console.error(`Error upserting ${cert.title}:`, err.message);
        }
    }

    console.log('Seeding complete.');
    process.exit(0);
}

function parseCertifications(text) {
    const lines = text.split(/\r?\n/);
    const certs = [];
    let current = null;

    const pushCurrent = () => {
        if (current && current.title) {
            if (current._issueDateString) current.issueDate = parseDate(current._issueDateString);
            if (!current.issueDate) current.issueDate = new Date();

            if (current._expiryDateString && current._expiryDateString.toLowerCase() !== 'n/a') {
                current.expiryDate = parseDate(current._expiryDateString);
            }

            if (current.link === 'N/A') current.link = undefined;
            if (current.credentialId === 'N/A') current.credentialId = undefined;

            current.status = (current.active) ? 'published' : 'draft';

            delete current._issueDateString;
            delete current._expiryDateString;

            certs.push(current);
        }
    };

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        if (/^CERTIFICATE \d+/i.test(line)) {
            pushCurrent();
            current = {
                title: '',
                slug: '',
                description: '',
                tags: [],
                link: '',
                issuer: '',
                active: true,
                featured: false,
                image: '',
                pdf: '',
                localFileName: '',
                _issueDateString: '',
                _expiryDateString: ''
            };
            continue;
        }

        if (!current) continue;

        const titleMatch = line.match(/^Title:\s*(.*)$/i);
        if (titleMatch) { current.title = titleMatch[1].trim(); continue; }

        const slugMatch = line.match(/^Slug:\s*(.*)$/i);
        if (slugMatch) { current.slug = slugMatch[1].trim(); continue; }

        const descMatch = line.match(/^Description:\s*(.*)$/i);
        if (descMatch) {
            if (descMatch[1].trim()) {
                current.description = descMatch[1].trim();
            }
            continue;
        }

        const isKey = /^[a-zA-Z\s]+:/.test(line);
        if (!isKey && current.description !== undefined) {
            current.description = (current.description ? current.description + ' ' : '') + line;
            continue;
        }

        const tagsMatch = line.match(/^Tags:\s*(.*)$/i);
        if (tagsMatch) {
            current.tags = tagsMatch[1].split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
            continue;
        }

        const linkMatch = line.match(/^Link:\s*(.*)$/i);
        if (linkMatch) { current.link = linkMatch[1].trim(); continue; }

        const issuerMatch = line.match(/^Issuer:\s*(.*)$/i);
        if (issuerMatch) { current.issuer = issuerMatch[1].trim(); continue; }

        const issueDateMatch = line.match(/^Issue Date:\s*(.*)$/i);
        if (issueDateMatch) { current._issueDateString = issueDateMatch[1].trim(); continue; }

        const expiryDateMatch = line.match(/^Expiry Date:\s*(.*)$/i);
        if (expiryDateMatch) { current._expiryDateString = expiryDateMatch[1].trim(); continue; }

        const credIdMatch = line.match(/^Credential ID:\s*(.*)$/i);
        if (credIdMatch) { current.credentialId = credIdMatch[1].trim(); continue; }

        const activeMatch = line.match(/^Active:\s*(.*)$/i);
        if (activeMatch) { current.active = activeMatch[1].trim().toLowerCase() === 'yes'; continue; }

        const featuredMatch = line.match(/^Featured:\s*(.*)$/i);
        if (featuredMatch) { current.featured = featuredMatch[1].trim().toLowerCase() === 'yes'; continue; }

        const fileMatch = line.match(/^File:\s*(.*)$/i);
        if (fileMatch) { current.localFileName = fileMatch[1].trim(); continue; }
    }

    pushCurrent();
    return certs;
}

function parseDate(dateStr) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    return null;
}

main().catch(console.error);
