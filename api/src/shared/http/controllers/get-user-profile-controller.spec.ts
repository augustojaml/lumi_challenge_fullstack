import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { fastifyApp } from '../app'

import { createAuthenticateTest } from '@/shared/core/helpers/create-authenticate-test'

describe('Get user profile controller e2e', () => {
  beforeAll(async () => {
    await fastifyApp.ready()
  })

  afterAll(async () => {
    await fastifyApp.close()
  })

  it('should be able to get user profile', async () => {
    const { token } = await createAuthenticateTest(fastifyApp)

    const response = await request(fastifyApp.server)
      .get('/api/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(201)

    expect(response.body.client).toEqual(
      expect.objectContaining({
        client_number: '10011005',
        full_name: 'Clara Fernandes',
        email: 'clara.fernandes@example.com',
        role: 'ADMIN',
      }),
    )
  })
})
