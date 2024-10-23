import { uploadFilesFactory } from '@/shared/core/factories/upload-files-factory'
import { extractPdfData } from '@/shared/core/helpers/extract-pdf-data'
import { uploadFileSchema } from '@/shared/core/schemas/upload-file-schema'
import { FastifyReply, FastifyRequest } from 'fastify'

export const uploadPdfInvoicesController = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const parts = request.parts()
  const filesParts = await extractPdfData(parts)

  const uploadFile = uploadFilesFactory()

  const invoiceParts = uploadFileSchema.parse(filesParts)

  const { managerInvoices } = await uploadFile.execute({
    invoices: invoiceParts,
  })

  return reply.status(201).send({ invoices: managerInvoices })
}
