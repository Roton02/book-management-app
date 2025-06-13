import { z } from 'zod'

const createBookIssueSchema = z.object({
  bookId: z.string(),
  userId: z.string(),
  returnDate: z.string().optional(),
  allowedHours: z.number().optional(),
})

export const bookIssueValidation = {
  createBookIssueSchema,
}
