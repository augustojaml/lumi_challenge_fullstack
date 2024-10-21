export const extractDueDate = (text: string): string | null => {
  const lines = text.split('\n')
  const index = lines.findIndex((line) => line.includes('Referente a'))
  if (index !== -1 && lines.length > index + 1) {
    const nextLine = lines[index + 1]
    const parts = nextLine.trim().split(/\s+/)
    const dueDate = parts[1]
    return dueDate || null
  }
  return null
}
