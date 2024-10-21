export const extractInstallationNumber = (text: string): string | null => {
  const lines = text.split('\n')
  const index = lines.findIndex((line) => line.includes('Nº DA INSTALAÇÃO'))
  if (index !== -1 && lines.length > index + 1) {
    const nextLine = lines[index + 1]
    const parts = nextLine.trim().split(/\s+/)

    const installationNumber = parts[parts.length - 1]
    return installationNumber || null
  }
  return null
}
