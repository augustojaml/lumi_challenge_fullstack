import { z } from 'zod'

const billedItemSchema = z.object({
  item_name: z.string(),
  unit: z.string(),
  quantity: z.number(),
  unit_price: z.number(),
  amount: z.number(),
  unit_rate: z.number(),
})

const consumptionHistorySchema = z.object({
  month_year: z.string(),
  consumption_kwh: z.number(),
  average_kwh_per_day: z.number(),
  days: z.number(),
})

const uploadFileSchema = z.array(
  z.object({
    file_name: z.string(),
    client_number: z.string(),
    reference_month: z.string(),
    due_date: z.string().transform((date) => new Date(date)),
    installation_number: z.string(),
    amount_due: z.preprocess((val) => parseFloat(val as string), z.number()),
    billed_items: z.array(billedItemSchema),
    consumption_history: z.array(consumptionHistorySchema),
  }),
)

// Wrap the schema in an array

export { uploadFileSchema }
