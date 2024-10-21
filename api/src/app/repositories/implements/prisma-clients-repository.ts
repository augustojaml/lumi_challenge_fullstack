import { prisma } from '@/shared/core/libs/prisma'
import { Client, Prisma } from '@prisma/client'
import { IClientRepository } from '../interfaces/i-clients-repository'

export class PrismaClientsRepository implements IClientRepository {
  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    const client = await prisma.client.create({ data })
    return client
  }

  async findById(id: string): Promise<Client | null> {
    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        invoices: {
          include: {
            billed_items: true,
            consumption_history: true,
          },
        },
      },
    })

    return client || null
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = prisma.client.findUnique({ where: { email } })
    return client || null
  }

  async findByClient(client_number: string): Promise<Client | null> {
    const client = prisma.client.findUnique({ where: { client_number } })
    return client || null
  }

  async findAll(): Promise<Client[]> {
    const clients = await prisma.client.findMany({
      where: {
        role: {
          not: 'ADMIN',
        },
      },

      include: {
        invoices: {
          include: {
            billed_items: true,
            consumption_history: true,
          },
        },
      },
    })
    return clients
  }
}
