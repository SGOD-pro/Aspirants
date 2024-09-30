// import nodemailer from "nodemailer";
// import { render } from "@react-email/render";
// import { VerifyEmail } from "@/email/EmailLayout"; // Path to your React email template

// // Create a Nodemailer transporter
// const transporter = nodemailer.createTransport({
// 	service: "gmail", // Or your email service
// 	auth: {
// 		user: "your-email@gmail.com",
// 		pass: "your-email-password",
// 	},
// });

// // Render the React email template to HTML
// const sendWelcomeEmail = async (to: string) => {
// 	const emailHtml = render(VerifyEmail({ verificationCode: "123456" }));

// 	const mailOptions = {
// 		from: "your-email@gmail.com",
// 		to,
// 		subject: "Welcome to Our Platform",
// 		html: emailHtml, // HTML generated from React email component
// 	};

// 	try {
// 		await transporter.sendMail(mailOptions);
// 		console.log("Email sent successfully");
// 	} catch (error) {
// 		console.error("Error sending email:", error);
// 	}
// };

// // Example of sending an email
// sendWelcomeEmail("recipient@example.com");
