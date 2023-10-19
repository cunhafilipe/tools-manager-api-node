import z from 'zod'

export const createUserSchema = z.object({
  name: z.string().min(3, { message: 'Name requires 3 caracters minimum' }),
  email: z.string().email(),
  password: z.string().min(6, { message: 'Password requires 6 caracters minimum' }),
}).required()


export type CreateUserDto = z.infer<typeof createUserSchema>