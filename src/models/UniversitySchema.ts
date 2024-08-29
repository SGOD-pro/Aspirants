import { z } from "zod";

export const universitySchema = z.object({
	name: z.string().transform((val) => val.toUpperCase()),
	type: z.string(),
});
export type University = z.infer<typeof universitySchema>;
