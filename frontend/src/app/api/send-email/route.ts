import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, message, type } = await req.json();

        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.error('Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables');
            return NextResponse.json(
                { success: false, message: 'Server configuration error: Missing email credentials' },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Send to self
            subject: `New Portfolio ${type === 'booking' ? 'Booking Request' : 'Contact'} from ${name}`,
            text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
        Type: ${type}
      `,
            html: `
        <h3>New ${type === 'booking' ? 'Booking Request' : 'Contact Form Submission'}</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p><strong>Type:</strong> ${type}</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false, message: error.message || 'Failed to send email' }, { status: 500 });
    }
}
