import { z } from "zod";

export const loginSchema = z.object({
	email: z
		.string()
		.regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Input a valid email" })
		.min(5),

	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" })	
});
