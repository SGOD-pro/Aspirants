import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Input a valid email" })
		.min(5),

	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" })
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
});
