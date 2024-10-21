import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { fastifyApp } from '../app'

import fakeUsers from '@/shared/core/fakes/fake-clients.json'
import { createAuthenticateTest } from '@/shared/core/helpers/create-authenticate-test'

describe('Create client controller e2e', () => {
  beforeAll(async () => {
    await fastifyApp.ready()
  })

  afterAll(async () => {
    await fastifyApp.close()
  })

  it('should be able to create a new client', async () => {
    const findUser = fakeUsers.find(
      (user) => user.email === 'pedro.oliveira@example.com',
    )
    const { token } = await createAuthenticateTest(fastifyApp)

    const response = await request(fastifyApp.server)
      .post('/api/clients')
      .set('Authorization', `Bearer ${token}`)
      .send(findUser)

    expect(response.statusCode).toEqual(201)

    expect(response.body.client).toEqual(
      expect.objectContaining({
        full_name: 'Pedro Oliveira',
        email: 'pedro.oliveira@example.com',
        role: 'USER',
        zip_code: '72325-540',
        tax_id: '456.789.012-33',
      }),
    )
  })
})
