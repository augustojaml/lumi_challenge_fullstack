import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { createAuthenticateTest } from '@/shared/core/helpers/create-authenticate-test'
import { fastifyApp } from '../app'

import fakeInvoices from '@/shared/core/fakes/fake-invoices.json'

describe('Find all invoices controller e2e', () => {
  beforeAll(async () => {
    await fastifyApp.ready()
  })

  afterAll(async () => {
    await fastifyApp.close()
  })

  it('should be able to find all invoices', async () => {
    const { token } = await createAuthenticateTest(fastifyApp)

    await request(fastifyApp.server)
      .post('/api/invoices')
      .set('Authorization', `Bearer ${token}`)
      .send(fakeInvoices[0])

    await request(fastifyApp.server)
      .post('/api/invoices')
      .set('Authorization', `Bearer ${token}`)
      .send(fakeInvoices[1])

    const response = await request(fastifyApp.server)
      .get('/api/invoices')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(201)

    expect(response.body.invoices).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          file_name: 'invoice_october_2024.pdf',
          client_number: '10011005',
          reference_month: '2024-10',
          installation_number: '123456789',
          amount_due: 1500.75,
        }),
        expect.objectContaining({
          file_name: 'invoice_november_2024.pdf',
          client_number: '10011005',
          reference_month: '2024-11',
          installation_number: '987654321',
          amount_due: 1600.5,
        }),
      ]),
    )
  })
})
