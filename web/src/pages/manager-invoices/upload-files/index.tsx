import { Trash2, Upload } from 'lucide-react'
import { useEffect, useState } from 'react'

interface UploadFilesProps {
  onChangeFiles?: (files: File[]) => void
}

export const UploadFiles = ({
  onChangeFiles = () => {
    /* */
  },
}: UploadFilesProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    onChangeFiles(uploadedFiles)
  }, [uploadedFiles, onChangeFiles])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    handleFiles(selectedFiles)
  }

  const handleFiles = (files: File[]) => {
    const pdfFiles = files.filter((file) => file.type === 'application/pdf')

    const newFiles = pdfFiles.filter(
      (file) => !uploadedFiles.some((f) => f.name === file.name),
    )

    setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles])
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const files = Array.from(event.dataTransfer.files)
    handleFiles(files)
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleRemoveFile = (index: number) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(updatedFiles)
  }

  return (
    <div className="flex min-h-96 flex-col gap-4 rounded-lg bg-white pt-6 md:flex-row">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`flex flex-1 flex-col items-center justify-center border-2 ${isDragging ? 'border-main bg-infoLight' : 'border-dashed border-gray-300'} p-6`}
      >
        <Upload className="mb-4 h-10 w-10 text-main" />
        <p className="mb-2 text-gray-500">Arraste e solte o arquivo</p>
        <span className="text-gray-500">ou</span>
        <label className="mt-4">
          <input
            type="file"
            accept="application/pdf"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="cursor-pointer rounded-lg bg-main px-4 py-2 text-white transition duration-300 hover:bg-mainDark">
            Buscar
          </div>
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-6 flex-1 md:mt-0">
          <ul className="space-y-4">
            {uploadedFiles.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-lg border bg-white p-3 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-main text-main">
                    <span className="text-xs font-bold">PDF</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-textPrimary">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  className="flex items-center space-x-1 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveFile(index)}
                >
                  <Trash2 className="h-5 w-5" />
                  <span>Remover</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default UploadFiles
