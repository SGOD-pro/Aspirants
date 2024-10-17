import { z } from "zod";

// Define the schema
 const userSigninSchema = z.object({
	email: z
		.string()
		.email("Invalid email address")
		.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Input a valid email" }),
	password: z
		.string()
		.min(6, "Password must be at least 6 characters long") // Adjust the length as needed
		.max(20, "Password must not exceed 20 characters").regex(/[a-z]/, {
			message: "Password must contain at least one lowercase letter",
		})
		
});
export default userSigninSchema;
export type UserSignIn = z.infer<typeof userSigninSchema>;