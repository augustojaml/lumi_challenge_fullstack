import { z } from 'zod'

const sessionsSchema = z.object({
  email: z.string().email(),
  hash_password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(8, { message: 'Password must be at most 8 characters long' }),
})

export { sessionsSchema }
