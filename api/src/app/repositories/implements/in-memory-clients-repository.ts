import { Client, Prisma } from '@prisma/client'
import { IClientRepository } from '../interfaces/i-clients-repository'

import { v4 as uuidv4 } from 'uuid'

export class InMemoryClientsRepository implements IClientRepository {
  public items: Client[] = []

  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    const client = {
      id: uuidv4(),
      ...data,
    } as Client
    this.items.push(client)
    return client
  }

  async findById(id: string): Promise<Client | null> {
    const client = this.items.find((item) => item.id === id)
    return client || null
  }

  async findByEmail(email: string): Promise<Client | null> {
    const client = this.items.find((item) => item.email === email)
    return client || null
  }

  async findByClient(client_number: string): Promise<Client | null> {
    const client = this.items.find(
      (item) => item.client_number === client_number,
    )
    return client || null
  }

  async findAll(): Promise<Client[]> {
    return this.items
  }
}
