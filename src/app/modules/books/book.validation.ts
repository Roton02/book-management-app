import { z } from 'zod';

export const createBookSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' }),
    body: z.string({ required_error: 'Body is required' }),
    authorId: z.string({ required_error: 'Author ID is required' }),
    publishedYear: z.number({ required_error: 'Published year is required' }),
    coverImageUrl: z.string().url().optional(),
  }),
});

export const bookValidation = {
  createBookSchema,
};
