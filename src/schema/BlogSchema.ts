import { z } from "zod";

const blogShema = z.object({
	file: z
		.instanceof(File)
		.refine((file) => file.size < 5 * 1024 * 1024, {
			message: "File must be smaller than 5MB",
		})
		.refine(
			(file) => file.type === "text/markdown" || file.name.endsWith(".md"),
			{
				message: "Only Markdown (.md) files are allowed",
			}
		),
});

export default blogShema;

const blogDataSchema = z
	.object({
		title: z.string(),
		description: z.string().max(120, { message: "Description is too long" }).min(10, { message: "Description is too short" }),
		image: z.string(),
		date: z.string(),
		tags: z.array(z.string()).optional(),
	})
	.catchall(z.any());

export { blogDataSchema };
