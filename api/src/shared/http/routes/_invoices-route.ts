import { FastifyInstance } from 'fastify'
import { createInvoiceController } from '../controllers/create-invoice-controller'
import { FindAllInvoiceController } from '../controllers/find-all-invoice-controller'
import { getInvoiceByIdController } from '../controllers/get-invoice-by-id-controller'
import { uploadPdfInvoicesController } from '../controllers/upload-pdf-invoice-controller'
import { authorizeJwt } from '../middleware/authorize-jwt'

// { onRequest: [authorizeJwt, authorizeAdmin('ADMIN')] }
export async function invoicesRoutes(app: FastifyInstance) {
  app.post('/invoices', { onRequest: [authorizeJwt] }, createInvoiceController)
  app.post(
    '/invoices/upload',
    { onRequest: [authorizeJwt] },
    uploadPdfInvoicesController,
  )

  app.get('/invoices/:id', getInvoiceByIdController)
  app.get('/invoices', FindAllInvoiceController)
}
