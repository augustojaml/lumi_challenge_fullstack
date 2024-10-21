import { z } from 'zod'

const invoiceIdSchema = z.object({
  id: z.string().uuid(),
})

export { invoiceIdSchema }
