import { AppError } from '@/shared/core/errors/app-error'
import { AxiosError } from 'axios'
import { FastifyInstance } from 'fastify'
import { env } from 'process'
import { ZodError } from 'zod'

export const errosHandlers = async (app: FastifyInstance) => {
  app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({
        message: 'Validation error.',
        issues: error.format(),
      })
    }

    if (error instanceof AppError) {
      return reply.status(error.statusCode).send({
        message: error.message,
      })
    }

    // Verificação para erros do Axios
    if (error instanceof AxiosError) {
      const status = error.response?.status || 500
      const message = error.response?.data?.message || 'External API error'
      return reply.status(status).send({
        message,
        details: error.response?.data || {},
      })
    }

    // Verificação genérica para erros do Fastify (comentada)
    // if (error.code.startsWith('FST') && error.statusCode) {
    //   return reply.status(error.statusCode).send({
    //     message: error.message,
    //   });
    // }

    if (env.NODE_ENV !== 'production') {
      console.error(`❌ ${JSON.stringify(error)}`)
    } else {
      // TODO: Send error to Sentry/NewRelic/DataDog
    }

    return reply.status(500).send({
      message: 'Internal server error.',
    })
  })
}
