import { z } from "zod";

export const coursesSchema = z.object({
	class: z.string(),
	subject: z.string(), //MATH,PHYSICS,
	board: z.string(), //BCA,BBA,MSC,BSC, WBBSE,WBCHSE,ICCSE,CBSE
	fees: z.string(),
	college: z.boolean(),
});

export type Course = z.infer<typeof coursesSchema>;
