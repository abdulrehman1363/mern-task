const transporter = require('../config/mailer')

const sendWelcomeEmail = async (to, firstName, password) => {
  try {
    const mailOptions = {
      from: `"MERN TASK" <${process.env.EMAIL_USER}>`,
      to,
      subject: 'Welcome to Our Platform!',
      html: `
        <p>Hi ${firstName},</p>
        <p>Welcome to our platform! We're excited to have you join us.</p>
        <p>Your login credentials are:</p>
        <ul>
          <li>Email: ${to}</li>
          <li>Password: <strong>${password}</strong></li>
        </ul>
        <p>We recommend changing your password after logging in.</p>
        <p>Best regards,</p>
        <p>The Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send welcome email: ${error.message}`);
    throw new Error('Email sending failed');
  }
};

module.exports = {
  sendWelcomeEmail,
};
