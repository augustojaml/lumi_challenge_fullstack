import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { fastifyApp } from '../app'

import fakeUsers from '@/shared/core/fakes/fake-clients.json'

describe('Get user profile controller e2e', () => {
  beforeAll(async () => {
    await fastifyApp.ready()
  })

  afterAll(async () => {
    await fastifyApp.close()
  })

  it('should be able to get user profile', async () => {
    await request(fastifyApp.server)
      .post('/api/clients')
      .send(
        fakeUsers.find((user) => user.email === 'pedro.oliveira@example.com'),
      )

    await request(fastifyApp.server)
      .post('/api/clients')
      .send(fakeUsers.find((user) => user.email === 'maria.silva@example.com'))

    await request(fastifyApp.server)
      .post('/api/clients')
      .send(fakeUsers.find((user) => user.email === 'joao.pereira@example.com'))

    const response = await request(fastifyApp.server).get('/api/clients').send()

    expect(response.body.clients).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          full_name: 'Pedro Oliveira',
          email: 'pedro.oliveira@example.com',
        }),
        expect.objectContaining({
          full_name: 'Maria da Silva',
          email: 'maria.silva@example.com',
        }),
      ]),
    )
  })
})
