import request from 'supertest'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { fastifyApp } from '../app'

import { createAuthenticateTest } from '@/shared/core/helpers/create-authenticate-test'

import fakeUsers from '@/shared/core/fakes/fake-clients.json'

describe('Upload invoices controller e2e', () => {
  beforeAll(async () => {
    await fastifyApp.ready()
  })

  afterAll(async () => {
    await fastifyApp.close()
  })

  it('should not be able to upload invoices without client', async () => {
    const findUser = fakeUsers.find(
      (user) => user.email === 'pedro.oliveira@example.com',
    )

    await request(fastifyApp.server)
      .post('/api/clients')
      .send({ ...findUser, client_number: '7204076116' })

    const { token } = await createAuthenticateTest(fastifyApp)

    const response = await request(fastifyApp.server)
      .post('/api/invoices/upload')
      .set('Authorization', `Bearer ${token}`)
      .attach('file', 'test/data/05-versions-space.pdf')
      .set('Content-Type', 'multipart/form-data')

    expect(response.statusCode).toEqual(201)

    expect(response.body.invoices).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          file_name: '05-versions-space.pdf',
          client_number: '7204076116',
          reference_month: 'JAN/2024',
          installation_number: '3001116735',
          amount_due: 107.38,
        }),
      ]),
    )
  })
})
