import { db } from "@/config/server";
import { Resend } from "resend";
import { VerifyEmail } from "@/email/EmailLayout";
import ReactDOMServer from 'react-dom/server';

// Function to generate a 6-digit OTP
function generateOTP() {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
	const resend = new Resend(process.env.RESEND_API_KEY);

	try {
		const { uid, email } = await req.json();
console.log(uid,email)
		// Check if uid and email are provided
		if (!uid || !email) {
			return new Response(
				JSON.stringify({ message: "Invalid request" }),
				{ status: 400 }
			);
		}

		// Generate OTP
		const otp = generateOTP();

		// Render React component to HTML string
		const emailHTML = VerifyEmail({ verificationCode: otp });

		// Send email via Resend API
		const { data, error } = await resend.emails.send({
			from: "Aspirants Classes <noreply@aspirantsclasses.com>", // Ensure this email is from a verified domain
			to: [email],
			subject: "New Registration",
			react: emailHTML,
		});


		// Check if there was an error in sending the email
		if (error) {
			console.error("Email send error:", error);
			return new Response(
				JSON.stringify({ error }),
				{ status: 500 }
			);
		}

		// Set OTP expiration time (10 minutes)
		const validTime = new Date(Date.now() + 10 * 60 * 1000);

		// Update user document with OTP and its validity time
		await db.collection("users").doc(uid).update({
			otp,
			validTime,
		});

		// Send success response
		return new Response(
			JSON.stringify({ message: "Email sent" }),
			{ status: 200 }
		);
	} catch (error: any) {
		console.error("Catch Error:", error);

		// Handle unexpected errors
		return new Response(
			JSON.stringify({
				message: "An unexpected error occurred.",
				details: error.message || error.toString(),
			}),
			{ status: 500 }
		);
	}
}
