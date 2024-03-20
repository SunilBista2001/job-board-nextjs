import { z } from "zod";

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export const createJobSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  companyName: z.string().min(3).max(255),
  location: z.string(),
  locationType: z.string(),
  salary: z.string(),
  type: z.string(),
});

export type jobFilterType = z.infer<typeof jobFilterSchema>;

export type CreateJobSchema = z.infer<typeof createJobSchema>;
