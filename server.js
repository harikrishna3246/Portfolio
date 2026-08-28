const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve your portfolio files
app.use(express.static(__dirname));

// Home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Contact form API
app.post("/api/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email, and message are required."
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: subject
        ? `Portfolio Inquiry: ${subject}`
        : `New Message from ${name}`,

      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,

      html: `
        <h3>New Contact Form Submission</h3>

        <p><strong>Name:</strong> ${name}</p>

        <p>
          <strong>Email:</strong>
          <a href="mailto:${email}">${email}</a>
        </p>

        <p>
          <strong>Subject:</strong>
          ${subject || "N/A"}
        </p>

        <hr>

        <p><strong>Message:</strong></p>

        <p style="white-space: pre-wrap;">
          ${message}
        </p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Email sent successfully!"
    });

  } catch (error) {

    console.error("Email error:", error);

    res.status(500).json({
      success: false,
      message: "Server error sending email."
    });
  }
});

// IMPORTANT:
// Do NOT use app.listen() on Vercel.

module.exports = app;