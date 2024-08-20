import { z } from "zod";

z;
const blogShema = z.object({
	title: z.string().min(5),
	description: z.string().min(10),
});
export default blogShema