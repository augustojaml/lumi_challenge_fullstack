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

    const { body } = await request(fastifyApp.server)
      .get(`/api/me`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(body.client).toEqual(
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
