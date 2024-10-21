import { Prisma } from '@prisma/client'

export const toClientRequestMapper = (client: Prisma.ClientCreateInput) => {
  return {
    id: client.id,
    full_name: client.full_name,
    email: client.email,
    role: client.role,
    street: client.street,
    number: client.number,
    complement: client.complement,
    neighborhood: client.neighborhood,
    zip_code: client.zip_code,
    city: client.city,
    state: client.state,
    taxId: client.tax_id,
    state_registration: client.state_registration,
  }
}
