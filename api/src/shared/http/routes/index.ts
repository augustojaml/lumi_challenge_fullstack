import { FastifyInstance } from 'fastify'

import { clientsRoutes } from './_clients-route'
import { invoicesRoutes } from './_invoices-route'

export const appRoutes = async (app: FastifyInstance) => {
  app.register(clientsRoutes, { prefix: '/api' })
  app.register(invoicesRoutes, { prefix: '/api' })
}
