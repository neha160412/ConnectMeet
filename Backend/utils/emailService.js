const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendResetEmail = async (email, resetLink) => {
  await transporter.sendMail({
    from: `"ConnectMeet" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "ConnectMeet - Reset Your Password",

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: auto;
        padding: 30px;
        border: 1px solid #ddd;
        border-radius: 12px;
      ">

        <h2 style="color:#1976d2;">
          🎥 ConnectMeet
        </h2>

        <h3>Password Reset Request</h3>

        <p>
          We received a request to reset your ConnectMeet password.
        </p>

        <p>
          Click the button below to create a new password:
        </p>

        <a
          href="${resetLink}"
          style="
            display:inline-block;
            padding:12px 20px;
            background:#1976d2;
            color:white;
            text-decoration:none;
            border-radius:6px;
            margin:15px 0;
          "
        >
          Reset Password
        </a>

        <p>
          This link will expire in <strong>15 minutes</strong>.
        </p>

        <p>
          If you did not request a password reset, you can safely ignore
          this email.
        </p>

        <hr />

        <p style="color:#777;font-size:12px;">
          ConnectMeet
        </p>

      </div>
    `,
  });
};

module.exports = sendResetEmail;