interface ConsumptionHistoryItem {
  month_year: string
  consumption_kwh: number
  average_kwh_per_day: number
  days: number
}

export const extractConsumptionHistory = (
  text: string,
): ConsumptionHistoryItem[] => {
  const lines = text.split('\n')
  const startIndex = lines.findIndex((line) =>
    line.includes('Histórico de Consumo'),
  )
  if (startIndex === -1) {
    return []
  }

  const headerIndex = startIndex + 1

  const dataLines: string[] = []
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (
      line === '' ||
      line.includes('Reservado ao Fisco') ||
      line.includes('SEM VALOR FISCAL')
    ) {
      break
    }
    dataLines.push(line)
  }

  const items: ConsumptionHistoryItem[] = []

  for (const line of dataLines) {
    const item = parseLine(line)
    if (item) {
      items.push(item)
    }
  }

  return items
}

const parseLine = (line: string): ConsumptionHistoryItem | null => {
  const cleanedLine = line.trim().replace(/\s+/g, ' ')
  const parts = cleanedLine.split(' ')

  if (parts.length >= 4) {
    const item: ConsumptionHistoryItem = {
      month_year: parts[0],
      consumption_kwh: parseNumber(parts[1]),
      average_kwh_per_day: parseNumber(parts[2]),
      days: parseInt(parts[3], 10),
    }
    return item
  }
  return null
}

const parseNumber = (str: string): number => {
  const cleanedStr = str.replace(/\./g, '').replace(/\s/g, '').replace(',', '.')
  const num = parseFloat(cleanedStr)
  return isNaN(num) ? 0 : num
}
