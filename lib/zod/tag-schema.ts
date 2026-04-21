import z from 'zod';

export const tagSchema = z.object({
  title: z.string().min(3, 'Please add tag title!'),
  ownerId: z.string(),
});

export type ITagSchema = z.infer<typeof tagSchema>;
