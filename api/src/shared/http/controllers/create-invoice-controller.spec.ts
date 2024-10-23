import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { fastifyApp } from '../app'

import fakeInvoices from '@/shared/core/fakes/fake-invoices.json'
import { createAuthenticateTest } from '@/shared/core/helpers/create-authenticate-test'

describe('Create invoice controller e2e', () => {
  beforeAll(async () => {
    await fastifyApp.ready()
  })

  afterAll(async () => {
    await fastifyApp.close()
  })

  it('should be able to create a invoice', async () => {
    const { token } = await createAuthenticateTest(fastifyApp)

    const response = await request(fastifyApp.server)
      .post('/api/invoices')
      .set('Authorization', `Bearer ${token}`)
      .send(fakeInvoices[0])

    expect(response.statusCode).toEqual(201)

    expect(response.body.invoice).toEqual(
      expect.objectContaining({
        file_name: 'invoice_october_2024.pdf',
        client_number: '10011005',
        reference_month: '2024-10',
        installation_number: '123456789',
        amount_due: 1500.75,
      }),
    )
  })
})
