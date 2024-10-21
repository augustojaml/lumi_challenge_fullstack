interface IBilledItem {
  id: string
  invoice_id: string
  item_name: string
  unit: string
  quantity: number
  unit_price: number
  amount: number
  unit_rate: number
}

interface IConsumptionHistory {
  id: string
  invoice_id: string
  month_year: string
  consumption_kwh: number
  average_kwh_per_day: number
  days: number
}

export interface IInvoice {
  id: string
  file_name: string
  client_id: string
  client_number: string
  reference_month: string
  due_date: string
  installation_number: string
  amount_due: number
  billed_items: IBilledItem[]
  consumption_history: IConsumptionHistory[]
}

export interface IClient {
  id: string
  client_number: string
  full_name: string
  hash_password: string
  email: string
  role: string
  street: string
  number: string
  complement: string
  neighborhood: string
  zip_code: string
  city: string
  state: string
  tax_id: string
  state_registration: string
  invoices: IInvoice[]
}
