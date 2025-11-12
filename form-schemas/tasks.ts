import { z } from 'zod';

export const createTaskSchema = z.object({
  task_type: z.string().min(1, 'Task type is required'),
  details: z.string().min(2, 'Details are required'),
  description: z.string().min(2, 'Description is required'),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;