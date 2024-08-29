import { z } from "zod";

export const studentFormSchema = z.object({
	name: z.string().min(5,{message:"Name is required"}),
	studentId: z.string().regex(/^ASP-\d{2}\/\d{2}-\d+$/,{message:"Invalid Student Id"}),
	phoneNo: z.string().length(10).regex(/^\d{10}$/),
	email: z.string().email(),
	admissionDate: z.date().optional(),
	subjects: z.array(z.string()),
	payment: z.string().optional(),

	institutionName: z.string(),
	college:z.boolean(),
	university: z.string(),
	address:z.string().optional(),
	pin:z.number().optional(),
});

export type Student = z.infer<typeof studentFormSchema>;