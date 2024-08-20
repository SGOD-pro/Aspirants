import { z } from "zod";

export const studentFormSchema = z.object({
	name: z.string().min(5),
	phoneNo: z.string().length(10).regex(/^\d{10}$/),
	email: z.string().email(),
	studentId: z.string().regex(/^ASP-\d{2}\/\d{2}-\d+$/,{message:"Invalid Student Id"}),
	admissionDate: z.date(),
	payment: z.string(),
	studyIn: z.string(),
	institutionName: z.string(),
	subject: z.string(),
	college:z.boolean()
});

export type Student = z.infer<typeof studentFormSchema>;