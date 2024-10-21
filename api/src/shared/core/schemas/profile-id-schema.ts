import { z } from 'zod'

const profileIdSchema = z.object({
  id: z.string().uuid(),
})

export { profileIdSchema }
