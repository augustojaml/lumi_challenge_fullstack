import { FastifyInstance } from 'fastify'
import request from 'supertest'

import fakeUsers from '@/shared/core/fakes/fake-clients.json'

export const createAuthenticateTest = async (fastifyApp: FastifyInstance) => {
  const findUser = fakeUsers.find(
    (user) => user.email === 'clara.fernandes@example.com',
  )

  await request(fastifyApp.server).post('/api/clients').send(findUser)

  const {
    body: { client, token },
  } = await request(fastifyApp.server).post('/api/sessions').send({
    email: 'clara.fernandes@example.com',
    hash_password: '123456',
  })

  return { client, token }
}
