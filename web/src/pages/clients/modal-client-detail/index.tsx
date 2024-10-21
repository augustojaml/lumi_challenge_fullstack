import { formatCurrency, formatDate } from '@global/helpers/format-values'
import * as Dialog from '@radix-ui/react-dialog'
import { Download, Info } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import { IClient } from '../props'

interface ModalClientDetalheProps {
  selectedClient: IClient | null
  setSelectedClient: Dispatch<SetStateAction<IClient | null>>
}

export const ModalClientDetalhe = ({
  selectedClient,
  setSelectedClient,
}: ModalClientDetalheProps) => {
  if (!selectedClient) {
    return
  }

  return (
    <Dialog.Root
      open={!!selectedClient}
      onOpenChange={() => setSelectedClient(null)}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
          <Dialog.Title className="mb-2 text-xl font-semibold text-textPrimary">
            Detalhes da Fatura
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-sm text-gray-500">
            Informações detalhadas sobre a fatura de{' '}
            <strong className="text-textPrimary">
              {selectedClient.full_name}
            </strong>
            .
          </Dialog.Description>
          <div className="custom-scroll mb-4 max-h-64 space-y-4 overflow-y-auto">
            {selectedClient.invoices.length > 0 ? (
              selectedClient.invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between rounded-lg border p-3 shadow-sm"
                >
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Referência:</span>
                    <p className="text-base font-medium text-textPrimary">
                      {invoice.reference_month}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Valor:</span>
                    <p className="text-base font-medium text-textPrimary">
                      {formatCurrency(invoice.amount_due)}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Vencimento:</span>
                    <p className="text-base font-medium text-textPrimary">
                      {formatDate(invoice.due_date)}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex items-center justify-center rounded-full bg-main p-2 text-white transition hover:brightness-75">
                      <Download className="h-4 w-4" />
                    </button>
                    <button className="flex items-center justify-center rounded-full bg-infoPrimary p-2 text-white transition hover:brightness-75">
                      <Info className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Nenhuma fatura encontrada.</p>
            )}
          </div>
          <div className="flex justify-end">
            <Dialog.Close asChild>
              <button className="rounded-lg bg-main px-4 py-2 text-white transition hover:bg-mainDark">
                Fechar
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
