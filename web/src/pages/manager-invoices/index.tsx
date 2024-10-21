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

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-textPrimary">
          {hasUploadedFiles ? 'Fatura baixadas' : 'Gerenciar PDFs'}
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
          {uploadedFiles.length ? (
            <UploadedInvoices invoices={uploadedFiles} />
          ) : (
            <UploadFiles onChangeFiles={handleChangeFiles} />
          )}
        </>
      )}
    </div>
  )
}

export default ManageInvoicesPage
