import { FastifyInstance } from 'fastify'
import { authenticateClientController } from '../controllers/authenticate-client-controller'
import { createClientController } from '../controllers/create-client-controller'
import { findAllClientsController } from '../controllers/find-all-clients-controller'
import { getUserProfileController } from '../controllers/get-user-profile-controller'
import { authorizeJwt } from '../middleware/authorize-jwt'

export async function clientsRoutes(app: FastifyInstance) {
  app.post('/clients', createClientController)
  app.post('/sessions', authenticateClientController)

  app.get('/me', { onRequest: [authorizeJwt] }, getUserProfileController)
  app.get('/clients', findAllClientsController)
}

/**
app.post(
  '/clients',
  { onRequest: [authorizeJwt, authorizeAdmin('ADMIN')] },
  createClientController,
)
 */
