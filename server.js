// Optional Node.js Express Backend for Portfolio Contact Form
// To use this backend locally or on a server (e.g. Render/Heroku/Vercel):
// 1. Run: npm install express nodemailer cors dotenv
// 2. Set environment variables in .env:
//    EMAIL_USER=harikrishnasb3246@gmail.com
//    EMAIL_PASS=your_app_password
// 3. Start server: node server.js

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
  }

  try {
    // Configure Transporter (Gmail App Password)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'harikrishnasb3246@gmail.com',
        pass: process.env.EMAIL_PASS // Gmail App Password
      }
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'harikrishnasb3246@gmail.com',
      replyTo: email,
      subject: subject ? `Portfolio Inquiry: ${subject}` : `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission from Portfolio</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
        <hr/>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email via Node server:', error);
    res.status(500).json({ success: false, message: 'Server error sending email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio server running on http://localhost:${PORT}`);
});
