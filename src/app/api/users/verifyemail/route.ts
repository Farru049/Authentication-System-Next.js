import sgMail from "@sendgrid/mail";

// Ensure API key is set
const sendgridApiKey = process.env.SENDGRID_API_KEY;
if (!sendgridApiKey) {
    throw new Error("SENDGRID_API_KEY is not defined in environment variables.");
}
sgMail.setApiKey(sendgridApiKey);

// Define a type for the route handler with additional methods
type RouteHandlerWithExtras = {
    GET?: Function;
    HEAD?: Function;
    OPTIONS?: Function;
    POST?: Function;
    sendVerificationEmail?: (email: string, token: string) => Promise<void>;
};

// Type-safe function for checking fields
function checkFields<T extends Record<string, unknown>>(obj: T): T {
    return obj;
}

// Verification email sending function
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

// Validate the route handler
checkFields<RouteHandlerWithExtras>({
    sendVerificationEmail,
    // You can add other route handler methods if needed
});

// Specify the runtime
export const runtime = 'nodejs';