import { Button } from '@components/forms/button';
import { Input } from '@components/forms/input';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const AddClientModal = ({
  isOpen,
  onClose,
  onSubmit,
}: AddClientModalProps) => {
  const [clientData, setClientData] = useState({
    full_name: '',
    client_number: '',
    email: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    zip_code: '',
    city: '',
    state: '',
    tax_id: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(clientData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/30" />
      <DialogContent
        className="fixed left-1/2 top-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg"
        aria-describedby="modal-description"
      >
        <DialogTitle className="text-xl flex items-center mb-2 justify-between font-semibold text-textPrimary">
          Adicionar Cliente
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </DialogTitle>
        <div id="modal-description" className="mb-4 text-sm text-gray-500">
          Preencha os campos abaixo para adicionar um novo cliente ao sistema.
        </div>

        <div>
          <div className="grid gap-4 md:grid-cols-1">
            <Input
              label='Nome completo'
              name="full_name"
              value={clientData.full_name}
              onChange={handleChange}
              placeholder="Digite o nome"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-1">
            <Input
              label='E-mail'
              name="email"
              value={clientData.email}
              onChange={handleChange}
              placeholder="Digite o email"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              label='CPF/CNPJ'
              name="tax_id"
              value={clientData.tax_id}
              onChange={handleChange}
              placeholder="Digite o CPF/CNPJ"
            />
            <Input
              label='Numero do cliente'
              name="client_number"
              value={clientData.client_number}
              onChange={handleChange}
              placeholder="Digite o número"
            />
          </div>

          <hr className='mt-2 mb-4' />
          <div className="grid gap-4 md:grid-cols-3">
            <div className='col-span-2'>
              <Input
                label="Rua"
                name="street"
                value={clientData.street}
                onChange={handleChange}
                placeholder="Digite a rua"

              />
            </div>
            <div className='w-full'>
              <Input
                label="Número"
                name="number"
                value={clientData.number}
                onChange={handleChange}
                placeholder="Digite o número"

              />
            </div>
          </div>


        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Input
            label='Complemento'
            name="complement"
            value={clientData.complement}
            onChange={handleChange}
            placeholder="Digite o complemento"
          />
          <Input
            label='Bairro'
            name="neighborhood"
            value={clientData.neighborhood}
            onChange={handleChange}
            placeholder="Digite o bairro"
          />
          <Input
            label='CEP'
            name="zip_code"
            value={clientData.zip_code}
            onChange={handleChange}
            placeholder="Digite o CEP"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className='col-span-2'>
            <Input
              label='Cidade'
              name="city"
              value={clientData.city}
              onChange={handleChange}
              placeholder="Digite a cidade"
            />
          </div>
          <div className='w-full'>
            <Input
              label='CEP'
              name="state"
              value={clientData.state}
              onChange={handleChange}
              placeholder="Digite o estado"
            />
          </div>
        </div>


        <div className=" flex justify-end space-x-2">
          <Button label="Cancelar" onClick={onClose}>
            Cancelar
          </Button>
          <Button label="Salvar" onClick={handleSubmit}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
