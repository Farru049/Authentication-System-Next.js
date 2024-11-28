import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export const sendVerificationEmail = async (email: any, token: any) => {
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verifyemail?token=${token}`;

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
