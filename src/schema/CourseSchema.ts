import { z } from "zod";

export const coursesSchema = z.object({
	subjects: z.array(z.string()).min(1), //MATH,PHYSICS,
	type: z.enum(["school", "undergraduate", "competitive", "special"]),
	header: z.string(),
	fees: z.string().optional(),
	name:z.string().optional(),
	// department: z.string(), //class
	// dateTime: z.date().optional(),
}).refine((data) => data.type !== 'school' || !!data.name, {
	message: 'Name is required for school type courses',
	path: ['name'],
  });

export type Course = z.infer<typeof coursesSchema>;