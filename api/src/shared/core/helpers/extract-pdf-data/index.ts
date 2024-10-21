import { Multipart } from '@fastify/multipart'
import pdfParse from 'pdf-parse'
import { extractAmountToPay } from './extract-pdf-data-helpers/extract-amount-to-pay'
import { extractBilledValues } from './extract-pdf-data-helpers/extract-billed-values'
import { extractClientNumber } from './extract-pdf-data-helpers/extract-client-number'
import { extractConsumptionHistory } from './extract-pdf-data-helpers/extract-consumption_history'
import { extractDueDate } from './extract-pdf-data-helpers/extract-due-date'
import { extractInstallationNumber } from './extract-pdf-data-helpers/extract-installation-number'
import { extractReferenceMonth } from './extract-pdf-data-helpers/extract-referece-month'
import { streamToBuffer } from './extract-pdf-data-helpers/stream-to-buffer'

export const extractPdfData = async (
  parts: AsyncIterableIterator<Multipart>,
) => {
  const results = []

  for await (const part of parts) {
    if (part.type === 'file') {
      const buffer = await streamToBuffer(part.file)
      const pdfData = await pdfParse(buffer)

      const client_number = extractClientNumber(pdfData.text)
      const reference_month = extractReferenceMonth(pdfData.text)
      const due_date = extractDueDate(pdfData.text)
      const installation_number = extractInstallationNumber(pdfData.text)
      const amount_due = extractAmountToPay(pdfData.text)
      const billed_items = extractBilledValues(pdfData.text)
      const consumption_history = extractConsumptionHistory(pdfData.text)

      results.push({
        client_number,
        file_name: part.filename,
        reference_month,
        due_date,
        installation_number,
        amount_due,
        billed_items,
        consumption_history,
      })
    } else {
      continue
    }
  }

  return results
}
