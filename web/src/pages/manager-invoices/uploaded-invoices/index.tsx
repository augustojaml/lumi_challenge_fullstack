import { formatCurrency, formatDate } from '@global/helpers/format-values'
import { FileText, Info } from 'lucide-react'

export interface UploadedInvoice {
  id: string
  file_name: string
  client_id: string
  client_number: string
  reference_month: string
  due_date: string
  installation_number: string
  amount_due: number
  upload_reject: 'INVOICE_ALREADY_EXISTS' | 'CLIENT_NOT_FOUND' | undefined
}

interface UploadedInvoicesProps {
  invoices: UploadedInvoice[]
}

export const UploadedInvoices = ({ invoices }: UploadedInvoicesProps) => {
  const upload_reject_keys = {
    INVOICE_ALREADY_EXISTS: 'Fatura já existe',
    CLIENT_NOT_FOUND: 'Cliente não encontrado',
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {invoices.map((invoice, key) => {
        let bgColor = 'bg-white'
        let textColor = 'text-textPrimary'
        let borderColor = 'border-gray-200'

        if (invoice.upload_reject === 'INVOICE_ALREADY_EXISTS') {
          bgColor = 'bg-yellow-50'
          textColor = 'text-yellow-700'
          borderColor = 'border-yellow-300'
        } else if (invoice.upload_reject === 'CLIENT_NOT_FOUND') {
          bgColor = 'bg-red-50'
          textColor = 'text-red-700'
          borderColor = 'border-red-300'
        }

        return (
          <div
            key={key}
            className={`flex flex-col justify-between rounded-lg border ${borderColor} ${bgColor} p-4 shadow-lg`}
          >
            <div className="rounded-lg bg-input p-3">
              <div className="flex items-start justify-between">
                <span className="text-sm text-gray-500">
                  {invoice.reference_month}
                </span>
                <FileText className={`h-6 w-6 ${textColor}`} />
              </div>
              <h3 className={`mt-2 text-lg font-semibold ${textColor}`}>
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
              <span className={`text-lg font-semibold ${textColor}`}>
                {formatCurrency(invoice.amount_due)}
              </span>
            </div>
            {invoice.upload_reject && (
              <span className="mt-2 flex items-center text-xs text-red-600">
                <Info className="mr-1 h-4 w-4" />
                {upload_reject_keys[invoice.upload_reject as keyof typeof upload_reject_keys]}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
