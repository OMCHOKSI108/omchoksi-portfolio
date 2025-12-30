import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, message, type } = await req.json();

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
            subject: `New Portfolio ${type === 'booking' ? 'Booking Request' : 'Message'} from ${name}`,
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
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
    }
}
