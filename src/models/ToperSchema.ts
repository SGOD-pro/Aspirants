import { z } from "zod";

export const addTopersSchema = z.object({
	photo: z
		.instanceof(File)
		.refine((file) => file.size < 5 * 1024 * 1024, {
			message: "File must be smaller than 5MB",
		})
		.refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
			message: "File must be an image (JPEG or PNG)",
		}),
	name: z.string().min(6, { message: "Name is required" }),
	details: z.string().min(4, { message: "Details is required" }),
});

export type addTopersSchemaType = z.infer<typeof addTopersSchema>;
