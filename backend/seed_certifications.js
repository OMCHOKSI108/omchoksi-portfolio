/*
  Seed script for certifications.
  Reads `../docs/certifications.txt` and updates the database.
  
  Usage: set MONGODB_URI in .env (or .env.local) then run:
    node seed_certifications.js
*/
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

async function main() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error('Please set MONGODB_URI in environment (.env file)');
        process.exit(1);
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

    // Path to the certifications text file
    // Assuming this script is in backend/ and the txt is in docs/ (sibling to backend root)
    // workspace/backend/seed_certifications.js -> workspace/docs/certifications.txt 
    // so path is ../docs/certifications.txt relative to backend/
    // But wait, the user said `docs\certifications.txt` is in workspace root.
    // And `backend` is in workspace root.
    // So from `backend/seed_certifications.js`, it is `../docs/certifications.txt`.

    // However, I should be careful about where the script is run from. 
    // If run from backend dir, `../docs` is correct.
    const docsPath = path.join(__dirname, '..', 'docs', 'certifications.txt');

    if (!fs.existsSync(docsPath)) {
        console.error(`File not found: ${docsPath}`);
        // Try absolute path if needed, but let's stick to relative
        process.exit(1);
    }

    const content = fs.readFileSync(docsPath, 'utf8');
    const certs = parseCertifications(content);

    console.log(`Parsed ${certs.length} certifications.`);

    for (const cert of certs) {
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

    // Helper to save current cert
    const pushCurrent = () => {
        if (current && current.title) {
            // Post-process dates
            if (current._issueDateString) {
                current.issueDate = parseDate(current._issueDateString);
            }
            // Default issue date if missing? Or error? Schema says required.
            if (!current.issueDate) current.issueDate = new Date(); // Fallback

            if (current._expiryDateString && current._expiryDateString.toLowerCase() !== 'n/a') {
                current.expiryDate = parseDate(current._expiryDateString);
            }

            // Clean link
            if (current.link === 'N/A') current.link = undefined;
            // Clean Credential ID
            if (current.credentialId === 'N/A') current.credentialId = undefined;

            // Default status
            current.status = (current.active) ? 'published' : 'draft';

            // Remove temp fields
            delete current._issueDateString;
            delete current._expiryDateString;

            certs.push(current);
        }
    };

    for (let line of lines) {
        line = line.trim();
        if (!line) continue;

        // Start of new certificate
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
                image: '', // Can be populated from File if needed, or left empty
                _issueDateString: '',
                _expiryDateString: ''
            };
            continue;
        }

        if (!current) continue;

        // Parse fields
        const titleMatch = line.match(/^Title:\s*(.*)$/i);
        if (titleMatch) { current.title = titleMatch[1].trim(); continue; }

        const slugMatch = line.match(/^Slug:\s*(.*)$/i);
        if (slugMatch) { current.slug = slugMatch[1].trim(); continue; }

        const descMatch = line.match(/^Description:\s*(.*)$/i); // Sometimes description is on next lines
        if (descMatch) {
            // If there is text immediately after Description:, use it
            // If empty, subsequent lines might be description
            if (descMatch[1].trim()) {
                current.description = descMatch[1].trim();
            }
            continue;
        }

        // Check if line is part of description (heuristics: no key prefix)
        // Keys usually end with :
        const isKey = /^[a-zA-Z\s]+:/.test(line);
        if (!isKey && current.description !== undefined) {
            // Must be continuation of description
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

        // Ignoring "File" for now as it maps to PDF filename, unless we want to use it as image placeholder
    }

    pushCurrent();
    return certs;
}

function parseDate(dateStr) {
    // DD-MM-YYYY
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        // new Date(year, monthIndex, day)
        return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    }
    return null;
}

main().catch(console.error);
