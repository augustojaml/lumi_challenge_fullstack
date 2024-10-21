import { z } from 'zod'

const createClientSchema = z.object({
  client_number: z.string(),
  full_name: z.string(),
  hash_password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .max(8, { message: 'Password must be at most 8 characters long' }),
  email: z.string().email(),
  role: z.enum(['USER', 'ADMIN']),
  street: z.string(),
  number: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  zip_code: z.string().regex(/^\d{5}-\d{3}$/),
  city: z.string(),
  state: z.string().length(2),
  tax_id: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/),
  state_registration: z.string(),
  invoices: z.array(z.any()).optional().nullable(),
})

export { createClientSchema }
