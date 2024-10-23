import { Invoice } from '@prisma/client'

export interface IBilledItemsData {
  item_name: string
  unit: string
  quantity: number
  unit_price: number
  amount: number
  unit_rate: number
}

export interface IConsumptionHistory {
  month_year: string
  consumption_kwh: number
  average_kwh_per_day: number
  days: number
}

export interface ICreateInvoiceData {
  file_name: string
  client_id: string
  client_number: string
  reference_month: string
  due_date: Date
  installation_number: string
  amount_due: number
  billed_items: IBilledItemsData[]
  consumption_history: IConsumptionHistory[]
}

export interface IInvoiceRepository {
  create(data: ICreateInvoiceData): Promise<Invoice>
  findById(id: string): Promise<Invoice | null>
  findAll(): Promise<Invoice[]>
  findInvoiceByReferenceMonth(reference_month: string): Promise<Invoice | null>
}
