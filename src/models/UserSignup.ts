import { z } from "zod";

// Define the schema
const userSignupSchema = z
	.object({
		email: z
			.string()
			.email("Invalid email address")
			.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Input a valid email" }),
		password: z
			.string()
			.min(6, "Password must be at least 6 characters long") // Adjust the length as needed
			.max(20, "Password must not exceed 20 characters")
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter",
			})
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			})
			.regex(/\d/, { message: "Password must contain at least one digit" })
			.regex(/[@$!%*?&]/, {
				message: "Password must contain at least one special character",
			}), // Adjust the length as needed
		confirmPassword: z
			.string()
			.regex(/[a-z]/, {
				message: "Password must contain at least one lowercase letter",
			})
			.regex(/[A-Z]/, {
				message: "Password must contain at least one uppercase letter",
			})
			.regex(/\d/, { message: "Password must contain at least one digit" })
			.regex(/[@$!%*?&]/, {
				message: "Password must contain at least one special character",
			}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"], // Set the path to indicate which field has the issue
	});
export default userSignupSchema;
export type UserSignup = z.infer<typeof userSignupSchema>;
