export const extractClientNumber = (texto: string): string | null => {
  const lines = texto.split('\n')
  const index = lines.findIndex((line) => line.includes('Nº DO CLIENTE'))
  if (index !== -1 && lines.length > index + 1) {
    const nextLine = lines[index + 1]
    const clientNumber = nextLine.trim().split(/\s+/)[0]
    return clientNumber || null
  }
  return null
}
