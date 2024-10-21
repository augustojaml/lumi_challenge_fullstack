import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { fastifyApp } from '../app'

import { createAuthenticateTest } from '@/shared/core/helpers/create-authenticate-test'

describe('Authenticate client controller e2e', () => {
  beforeAll(async () => {
    await fastifyApp.ready()
  })

  afterAll(async () => {
    await fastifyApp.close()
  })

  it('should be able to authenticate', async () => {
    const { token, client } = await createAuthenticateTest(fastifyApp)

    expect(token).toEqual(expect.any(String))
    expect(client).toEqual(
      expect.objectContaining({
        client_number: '10011005',
        full_name: 'Clara Fernandes',
        email: 'clara.fernandes@example.com',
        role: 'ADMIN',
      }),
    )
  })
})
