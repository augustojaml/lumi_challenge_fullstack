import { formatCurrency, formatDate } from '@global/helpers/format-values'
import { FileText } from 'lucide-react'

export interface UploadedInvoice {
  id: string
  file_name: string
  client_id: string
  client_number: string
  reference_month: string
  due_date: string
  installation_number: string
  amount_due: number
}

interface UploadedInvoicesProps {
  invoices: UploadedInvoice[]
}

export const UploadedInvoices = ({ invoices }: UploadedInvoicesProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {invoices.map((invoice, index) => (
        <div
          key={index}
          className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
        >
          <div className="rounded-lg bg-input p-3">
            <div className="flex items-start justify-between">
              <span className="text-sm text-gray-500">
                {invoice.reference_month}
              </span>
              <FileText className="h-6 w-6 text-main" />
            </div>
            <h3 className="mt-2 text-lg font-semibold text-textPrimary">
              {invoice.file_name}
            </h3>
            <p className="text-sm text-gray-500">
              Vencimento: <strong>{formatDate(invoice.due_date)}</strong>
            </p>
            <p className="text-sm text-gray-500">
              Instalação: <strong>{invoice.installation_number}</strong>
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-textPrimary">
              {formatCurrency(invoice.amount_due)}
            </span>
            {/* <button className="flex items-center space-x-2 text-main hover:text-mainDark focus:outline-none">
              <Download className="h-5 w-5" />
              <span>Details</span>
            </button> */}
          </div>
        </div>
      ))}
    </div>
  )
}
