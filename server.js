const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("."));

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

    await transporter.sendMail({
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
      `
    });

    res.json({
      success: true,
      message: "Email sent successfully!"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error sending email."
    });
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Portfolio server running on http://localhost:${PORT}`);
  });
}

module.exports = app;