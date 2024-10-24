import { Loading } from '@components/loading'
import { useGetClients } from '@global/api/query/use-get-client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { MoreVertical, Plus } from 'lucide-react'
import { useState } from 'react'

import { AddClientModal } from './add-client-modal'
import { ModalClientDetalhe } from './modal-client-detail'
import { IClient } from './props'

export const ClientsPage = () => {
  const { data: clients, isLoading, isError, error } = useGetClients()
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null)
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);

  const handleOpenInvoiceDetails = (client: IClient) => {
    setSelectedClient(client)
  }

  const getRandomNumber = (): number => {
    return Math.floor(Math.random() * 100) + 1
  }

  const handleAddClient = (newClientData: IClient) => {
    // Aqui você pode adicionar a lógica para enviar os dados do cliente à API
    console.log('Novo cliente adicionado:', newClientData);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div className="flex min-h-min flex-col items-center justify-center p-4 text-errorPrimary">
          <p>Ocorreu um erro ao carregar os dados dos clientes.</p>
          <p>{error?.message || 'Tente novamente mais tarde.'}</p>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-textPrimary">Histórico de Pagamentos</h2>
              <p className="text-gray-500">Veja os detalhes das faturas dos clientes abaixo.</p>
            </div>
            <button
              className="flex items-center space-x-2 rounded bg-main px-4 py-2 text-white hover:bg-mainDark"
              onClick={() => setIsAddClientModalOpen(true)}
            >
              <Plus className="h-5 w-5" />
              <span>Novo Cliente</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full rounded-lg bg-white shadow">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">#Número do Cliente</th>
                  <th className="p-3 text-left">Cliente</th>
                  <th className="p-3 text-left">CPF/CNPJ</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-right">Ações</th>
                </tr>
              </thead>
              {clients?.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={5} className="p-3 text-center">
                      Nenhum cliente encontrado
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {clients?.map((client) => (
                    <tr key={client.id} className="border-b last:border-none">
                      <td className="p-3">{`#${client.client_number}`}</td>
                      <td className="flex items-center space-x-3 p-3">
                        <img
                          src={`https://randomuser.me/api/portraits/men/${getRandomNumber()}.jpg`}
                          alt={client.full_name}
                          className="h-8 w-8 rounded-full"
                        />
                        <span>{client.full_name}</span>
                      </td>
                      <td className="p-3">{client.tax_id}</td>
                      <td className="p-3">{client.email}</td>
                      <td className="p-3 text-right">
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger asChild>
                            <button className="text-gray-500 hover:text-gray-700">
                              <MoreVertical className="h-5 w-5" />
                            </button>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Portal>
                            <DropdownMenu.Content
                              className="min-w-[150px] rounded-lg border border-gray-200 bg-white shadow-lg"
                              align="end"
                            >
                              <DropdownMenu.Item
                                className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onSelect={() =>
                                  handleOpenInvoiceDetails(client)
                                }
                              >
                                Detalhar
                              </DropdownMenu.Item>
                              <DropdownMenu.Item
                                className="flex cursor-pointer items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onSelect={() =>
                                  console.log('Editar', client.id)
                                }
                              >
                                Editar
                              </DropdownMenu.Item>
                              <DropdownMenu.Item
                                className="flex cursor-pointer items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                onSelect={() =>
                                  console.log('Deletar', client.id)
                                }
                              >
                                Deletar
                              </DropdownMenu.Item>
                            </DropdownMenu.Content>
                          </DropdownMenu.Portal>
                        </DropdownMenu.Root>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
      <ModalClientDetalhe
        selectedClient={selectedClient}
        setSelectedClient={setSelectedClient}
      />
      <AddClientModal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        onSubmit={handleAddClient}
      />
    </>
  )
}

export default ClientsPage
