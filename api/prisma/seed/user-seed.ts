import { passwordHelper } from '@/shared/core/helpers/password-helper'
import { PrismaClient, Role } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  // Limpar todos os registros da tabela de clientes
  await prisma.client.deleteMany({})
  console.log('Todos os registros de clientes foram deletados.')

  const hashedPassword = await passwordHelper.hash('123456')

  const clients = [
    {
      full_name: 'Augusto Monteiro',
      client_number: '9999999991',
      hash_password: hashedPassword,
      email: 'augusto@email.com',
      role: 'ADMIN' as Role,
      street: 'Quadra 203',
      number: '10',
      complement: 'Bloco A',
      neighborhood: 'Águas Claras',
      zip_code: '71909-000',
      city: 'Águas Claras',
      state: 'DF',
      tax_id: '123.456.789-00',
      state_registration: '1234567890',
      invoices: undefined,
    },
    {
      full_name: 'Jose Mesaly Fonseca de Carvalho',
      client_number: '7204076116',
      hash_password: hashedPassword,
      email: 'jose_mesaly@email.com',
      role: 'USER' as Role,
      street: 'Rua Raul Correa',
      number: '547',
      complement: 'FD',
      neighborhood: 'Montes Claros',
      zip_code: '39401-029',
      city: 'Montes Claros',
      state: 'MG',
      tax_id: '99.015.634/0001-85',
      state_registration: '2345678901',
      invoices: undefined,
    },
    {
      full_name: 'Selfway Treinamento Personalizado LTDA',
      client_number: '7202210726',
      hash_password: hashedPassword,
      email: 'selfway@email.com',
      role: 'USER' as Role,
      street: 'Avenida Bandeirantes',
      number: '1586',
      complement: 'CS',
      neighborhood: 'Belo Horizonte',
      zip_code: '30315-032',
      city: 'Belo Horizonte',
      state: 'MG',
      tax_id: '99.015.634/0001-85',
      state_registration: '2345678901',
      invoices: undefined,
    },
  ]

  // Inserir os clientes no banco de dados
  for (const client of clients) {
    await prisma.client.create({
      data: client,
    })
  }

  console.log('Seed concluído com sucesso.')
}

// Executa a função de seed e lida com erros
main()
  .catch((e) => {
    console.error('Erro ao executar seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
