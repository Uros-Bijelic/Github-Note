import { EPostType } from '@/types/post-types';
import z from 'zod';

const learningResourcesSchema = z.object({
  label: z.string().trim().min(1, 'Please provide resource label!'),
  link: z
    .string()
    .trim()
    .url('Invalid URL! Url must begin with "https://" or "http://"'),
});

export type ILearningResources = z.infer<typeof learningResourcesSchema>;

export const postSchema = z.object({
  title: z.string().trim().min(3, 'Title must be at least characters long!'),
  type: z.enum([EPostType.COMPONENT, EPostType.KNOWLEDGE, EPostType.WORKFLOW]),
  tags: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .min(1, 'Please add at leats one tag!'),
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters long!'),
  checklist: z.array(z.string()).optional(),
  codeExample: z.string().trim().optional(),
  content: z
    .string()
    .trim()
    .min(3, 'Content must be at least 3 characters long!')
    .optional(),
  learningResources: z.array(learningResourcesSchema).optional(),
});

export type IPostSchema = z.infer<typeof postSchema>;
