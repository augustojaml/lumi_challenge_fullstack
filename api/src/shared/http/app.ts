import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from '../core/config/env'
import { errosHandlers } from './middleware/erros-handler'
import { appRoutes } from './routes'

import fastifyMultipart from '@fastify/multipart'

const fastifyApp = fastify()

fastifyApp.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
})

fastifyApp.register(fastifyMultipart)

fastifyApp.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '24h', // 1 day
  },
})

appRoutes(fastifyApp)

errosHandlers(fastifyApp)

export { fastifyApp }
