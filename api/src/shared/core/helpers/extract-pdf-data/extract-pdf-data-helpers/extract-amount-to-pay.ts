export const extractAmountToPay = (text: string): string | null => {
  const lines = text.split('\n')
  const index = lines.findIndex((line) => line.includes('Valor a pagar (R$)'))
  if (index !== -1 && lines.length > index + 1) {
    const nextLine = lines[index + 1]
    const parts = nextLine.trim().split(/\s+/)

    let amountToPay = parts[parts.length - 1]

    amountToPay = amountToPay.replace(',', '.')
    return amountToPay || null
  }
  return null
}
