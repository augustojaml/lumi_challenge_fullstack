import { Button } from '@components/forms/button'
import { Loading } from '@components/loading'
import { useUploadInvoices } from '@global/api/mutation/use-upload-invoices'
import { ArrowLeft, Upload } from 'lucide-react'
import { useMemo, useState } from 'react'

import { UploadFiles } from './upload-files'
import { UploadedInvoice, UploadedInvoices } from './uploaded-invoices'

export const ManageInvoicesPage = () => {
  const [files, setFiles] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<UploadedInvoice[]>([])
  const { mutateAsync, isPending } = useUploadInvoices()

  const handleChangeFiles = (files: File[]) => {
    setFiles(files)
  }

  const handleUploadFiles = async () => {
    try {
      const response = await mutateAsync({ files })
      console.log('response', response)
      setUploadedFiles(response.invoices)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleBackToUpload = () => {
    setUploadedFiles([])
  }

  const hasUploadedFiles = useMemo(
    () => uploadedFiles.length > 0,
    [uploadedFiles.length],
  )

  const downloadedInvoices = useMemo(
    () => uploadedFiles.filter((invoice) => !invoice.upload_reject),
    [uploadedFiles]
  )

  const rejectedInvoices = useMemo(
    () => uploadedFiles.filter((invoice) => invoice.upload_reject),
    [uploadedFiles]
  )

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-textPrimary">
          {hasUploadedFiles ? 'Faturas Baixadas' : 'Gerenciar PDFs'}
        </h2>

        <Button
          label={hasUploadedFiles ? 'Voltar' : 'Upload'}
          icon={
            hasUploadedFiles ? (
              <ArrowLeft className="h-5 w-5" />
            ) : (
              <Upload className="h-5 w-5" />
            )
          }
          onClick={hasUploadedFiles ? handleBackToUpload : handleUploadFiles}
          disabled={!hasUploadedFiles && files.length === 0}
        />
      </div>
      {isPending ? (
        <Loading />
      ) : (
        <>
          {hasUploadedFiles ? (
            <>
              {downloadedInvoices.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-successPrimary mb-4">
                    Faturas Baixadas
                  </h3>
                  <UploadedInvoices invoices={downloadedInvoices} />
                </>
              )}
              <hr className="my-4 mt-8" />
              {rejectedInvoices.length > 0 && (
                <>
                  <h3 className="mt-6 text-lg font-semibold text-errorPrimary mb-4">
                    Faturas Rejeitadas
                  </h3>
                  <UploadedInvoices invoices={rejectedInvoices} />
                </>
              )}
              {downloadedInvoices.length === 0 &&
                rejectedInvoices.length === 0 && (
                  <p className="text-center text-gray-500">
                    Nenhuma fatura encontrada.
                  </p>
                )}
            </>
          ) : (
            <UploadFiles onChangeFiles={handleChangeFiles} />
          )}
        </>
      )}
    </div>
  )
}

export default ManageInvoicesPage
