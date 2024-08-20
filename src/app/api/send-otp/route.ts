import { db } from "@/config/server";
import { Resend } from "resend";
import { VerifyEmail } from "@/email/EmailLayout";

export async function POST(req: Request, res: Response) {
	const resend = new Resend(process.env.RESEND_API_KEY);

	try {
		const {uid}=await req.json()
		// const { data, error } = await resend.emails.send({
		// 	from: "noreply@yourdomain.com", // Ensure this email is from a verified domain
		// 	to: ["testing938212@gmail.com"],
		// 	subject: "Hello world",
		// 	react: VerifyEmail({ verificationCode: "123456" }),
		// });
		console.log("id",uid);
		
		if(!uid) return Response.json({message:"Invalid request"}, { status: 400 });
		const validTime = new Date(Date.now() + 10 * 60 * 1000);
		await db.collection("users").doc(uid).update({
			otp: 123456,
			validTime
		});
		// console.log("Response Data:", data);
		// console.log("Response Error:", error);

		// if (error) {
		// 	return Response.json({ error }, { status: 500 });
		// }

		return Response.json({message:"Email sent"}, { status: 200 });
	} catch (error: any) {
		console.error("Catch Error:", error);
		return Response.json(
			{
				message: "An unexpected error occurred.",
				details: error.message || error.toString(),
			},
			{ status: 500 }
		);
	}
}
