import { Client, Prisma } from '@prisma/client'

export interface IClientRepository {
  create(data: Prisma.ClientCreateInput): Promise<Client>
  findById(id: string): Promise<Client | null>
  findByEmail(email: string): Promise<Client | null>
  findByClient(client_number: string): Promise<Client | null>
  findAll(): Promise<Client[]>
}
