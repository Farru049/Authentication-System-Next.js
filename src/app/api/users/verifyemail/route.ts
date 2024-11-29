import sgMail from "@sendgrid/mail";

// Ensure API key is set
const sendgridApiKey = process.env.SENDGRID_API_KEY;
if (!sendgridApiKey) {
    throw new Error("SENDGRID_API_KEY is not defined in environment variables.");
}
sgMail.setApiKey(sendgridApiKey);

export const sendVerificationEmail = async (email: string, token: string): Promise<void> => {
    // Ensure base URL is defined in environment variables
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not defined in environment variables.");
    }

    const verificationLink = `${baseUrl}/verifyemail?token=${token}`;

    const message = {
        to: email,
        from: "alifarhaan655@gmail.com", // Replace with your verified sender email
        subject: "Verify Your Email",
        html: `
            <p>Click the link below to verify your email address:</p>
            <a href="${verificationLink}">${verificationLink}</a>
        `,
    };

    try {
        await sgMail.send(message);
        console.log("Verification email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error("Failed to send verification email");
    }
};
