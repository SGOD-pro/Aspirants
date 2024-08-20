import { db } from "@/config/server";
import { Resend } from "resend";
import { VerifyEmail } from "@/email/EmailLayout";

export async function POST(req: Request, res: Response) {
	try {
		// Parse the request body
		const body = await req.json();
		const { uid, otp } = body;
		console.log(otp);

		// Check if uid and otp are provided
		if (!uid || otp === undefined) {
			return Response.json({ message: "Missing uid or otp" }, { status: 404 });
		}

		// Fetch the user document from the database
		const userDoc = await db.collection("users").doc(uid).get();

		// Check if the document exists
		if (!userDoc.exists) {
			return Response.json({ message: "User not found" }, { status: 404 });
		}

		const userData = userDoc.data();
		console.log(userData);

		const validTime = userData?.validTime?.toDate();


		if (userData?.otp == otp && validTime && validTime > new Date()) {
			await db.collection("users").doc(uid).update({
				isVerified: true,
				otp: null,
				validTime: null,
			});
			return Response.json({ message: "Valid OTP" }, { status: 200 });
		} else {
			return Response.json(
				{ message: "Invalid OTP or expired" },
				{ status: 400 }
			);
		}
	} catch (error: any) {
		console.error("Catch Error:", error);
		return Response.json({ message: error.message }, { status: 500 });
	}
}
