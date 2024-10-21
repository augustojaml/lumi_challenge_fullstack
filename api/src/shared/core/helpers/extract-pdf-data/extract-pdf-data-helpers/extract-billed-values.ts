interface BilledValueItem {
  item_name: string
  unit: string
  quantity: number
  unit_price: number
  amount: number
  unit_rate: number
}

function parseNumber(str: string): number {
  const cleanedStr = str.replace(/\./g, '').replace(/\s/g, '').replace(',', '.')
  const num = parseFloat(cleanedStr)
  return isNaN(num) ? 0 : num
}

export const extractBilledValues = (text: string): BilledValueItem[] => {
  const lines = text.split('\n')
  const startIndex = lines.findIndex((line) =>
    line.includes('Valores Faturados'),
  )
  const endIndex = lines.findIndex(
    (line, index) =>
      index > startIndex &&
      (line.includes('Histórico de Consumo') || line.includes('TOTAL')),
  )

  if (startIndex === -1 || endIndex === -1) {
    return []
  }

  const billedValuesLines = lines.slice(startIndex + 1, endIndex)
  const dataLines = billedValuesLines.slice(2)
  const items: BilledValueItem[] = []

  for (const line of dataLines) {
    const item = parseLine(line)
    if (item) {
      items.push(item)
    }
  }
  return items
}

const parseLine = (line: string): BilledValueItem | null => {
  const regex = /^(.*?)(-?\d[\d\s,.-]*)$/
  const match = line.trim().match(regex)

  if (match) {
    let itemName = match[1].trim()
    const numbersPart = match[2].trim()
    const numbers = numbersPart.split(/\s+/)

    let unit = ''
    const unitMatch = itemName.match(/(kWh|m³|kg|Unid)$/i)

    if (unitMatch) {
      unit = unitMatch[0]
      itemName = itemName.substring(0, itemName.length - unit.length).trim()
    }

    const item: BilledValueItem = {
      item_name: itemName,
      unit: unit || '',
      quantity: 0,
      unit_price: 0,
      amount: 0,
      unit_rate: 0,
    }

    if (numbers.length >= 4) {
      item.quantity = parseNumber(numbers[0])
      item.unit_price = parseNumber(numbers[1])
      item.amount = parseNumber(numbers[2])
      item.unit_rate = parseNumber(numbers[3])
    } else if (numbers.length === 1) {
      item.amount = parseNumber(numbers[0])
    }

    return item
  }
  return null
}
