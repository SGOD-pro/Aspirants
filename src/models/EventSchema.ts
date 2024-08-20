import { z } from "zod";

export const eventSchema = z.object({
    
    description: z.string().min(10),
    validDate: z.date(),
    
});

export type EventSchemaInterface = z.infer<typeof eventSchema>