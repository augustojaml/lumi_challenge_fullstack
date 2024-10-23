import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { createAuthenticateTest } from '@/shared/core/helpers/create-authenticate-test'
import { fastifyApp } from '../app'

import fakeInvoices from '@/shared/core/fakes/fake-invoices.json'

describe('Get invoice by id controller e2e', () => {
  beforeAll(async () => {
    await fastifyApp.ready()
  })

  afterAll(async () => {
    await fastifyApp.close()
  })

  it('should be able to get invoice by id', async () => {
    const { token } = await createAuthenticateTest(fastifyApp)

    const createInvoice = await request(fastifyApp.server)
      .post('/api/invoices')
      .set('Authorization', `Bearer ${token}`)
      .send(fakeInvoices[0])

    const response = await request(fastifyApp.server)
      .get(`/api/invoices/${createInvoice.body.invoice.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(201)

    expect(response.body.invoice).toEqual(
      expect.objectContaining({
        file_name: 'invoice_october_2024.pdf',
        client_number: '10011005',
        reference_month: '2024-10',
        installation_number: '123456789',
      }),
    )
  })
})
