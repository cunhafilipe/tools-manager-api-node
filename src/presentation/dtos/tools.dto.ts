import { z } from 'zod'

export const createToolSchema = z.object({
  title: z.string().min(3, { message: 'Title requires 3 caracters minimum' }),
  link: z.string().min(3, { message: 'Link requires 3 caracters minimum' }),
  description: z.string().max(256, { message: 'Description requires maximum of 256 caracters' }),
  tags: z.string().array().max(8, {
    message: 'Tags requires maximum of 8 tags',
  }),
})


export type CreateToolDto = z.infer<typeof createToolSchema>