import sgMail from "@sendgrid/mail";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

// Set up the SendGrid API key (from environment variable)
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update the user document with the token and expiry time
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour
      });
    }

    // Prepare the email content
    const link = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;
    const subject =
      emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password";
    const html = `
      <p>Click <a href="${link}">here</a> to ${
      emailType === "VERIFY" ? "verify your email" : "reset your password"
    }.</p>
      <p>If the link doesn't work, copy and paste the following URL into your browser:</p>
      <p>${link}</p>
    `;

    // Send the email
    const mailOptions = {
      to: email,
      from: process.env.SENDGRID_SENDER_EMAIL!, // Replace with your verified sender email
      subject,
      html,
    };

    const response = await sgMail.send(mailOptions);
    console.log("Email sent successfully:", response);
    return { success: true };
  } catch (error: any) {
    console.error("Error sending email:", error.message);
    throw new Error(error.message);
  }
};
