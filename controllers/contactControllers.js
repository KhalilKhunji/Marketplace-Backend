const contactModel = require("../models/contactModel");
const nodemailer = require("nodemailer");

// validate email function using an external API
const validateEmail = async (email) => {
  const response = await fetch(
    `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.PRIVATE_API_KEY}&email=${email}`
  );
  const data = await response.json();
  if (data.quality_score < 0.5) {
    throw new Error("Invalid email.");
  }
};

//  function to send notification email
const sendNotificationEmail = async ({ name, email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: `${name}`,
    replyTo: email,
    to: process.env.EMAIL,
    subject,
    html: `<p>
        <b>Name:</b> ${name} <br>
        <b>Email:</b> ${email} <br>
        <b>Subject:</b> ${subject} <br>
        <b>Message:</b> ${message}
    </p>`,
  };

  await transporter.sendMail(mailOptions);
};

const sendAutoResponseEmail = async ({ name, email }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL, // antique.online.marketplace@gmail.com inside .env
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Antique Market Place Complaint",
    html: `<p>
            Dear ${name},
            </p><p>Thank you for reaching out to Antique Marketplace. We have received your message and will get back to you as soon as possible.</p>
            <br>
            <p>Best regards,
            <br>Antique MarketPlace Customer Support</p>`,
  };

  await transporter.sendMail(mailOptions);
};

// Controller function to handle contact form submission
const create = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res
      .status(400)
      .json({ error: "Please provide name, email, subject, and message." });
  }

  try {
    await validateEmail(email);

    const contact = await contactModel.create({
      name,
      email,
      subject,
      message,
    });
    await sendNotificationEmail({ name, email, subject, message });
    await sendAutoResponseEmail({ name, email });

    return res.status(200).json({ contact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  create,
};
