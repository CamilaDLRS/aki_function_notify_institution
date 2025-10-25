import { z } from 'zod';

export const notificationSchema = z.object({
  class_id: z.number().int().optional().nullable(),
  teacher_id: z.number().int(),
  message: z.string().max(500),
});
