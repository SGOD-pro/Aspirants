import { z } from "zod";

export const coursesSchema = z.object({
	subject: z.string(), //MATH,PHYSICS,
	type: z.string(),
	university: z.string(),//board //BCA,BBA,MSC,BSC, WBBSE,WBCHSE,ICSE,CBSE
	fees: z.number(),
	department: z.string(),//class
	dateTime: z.date().optional(),
});

export type Course = z.infer<typeof coursesSchema>;
