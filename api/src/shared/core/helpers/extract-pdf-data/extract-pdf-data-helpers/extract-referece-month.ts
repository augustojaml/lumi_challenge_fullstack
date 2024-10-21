export const extractReferenceMonth = (text: string): string | null => {
  const lines = text.split('\n')
  const index = lines.findIndex((line) => line.includes('Referente a'))
  if (index !== -1 && lines.length > index + 1) {
    const nextLine = lines[index + 1]
    const parts = nextLine.trim().split(/\s+/)
    const referenceMonth = parts[0] // The first element is the "Reference month"
    return referenceMonth || null
  }
  return null
}
