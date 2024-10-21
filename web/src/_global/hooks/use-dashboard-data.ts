import { IClient } from '@pages/clients/props'
import { useMemo } from 'react'

interface UseClientDataReturn {
  hasData: boolean
  totalClients: number
  totalEnergyCompensated: number
  totalValueWithoutGD: number
  totalGDSavings: number
  barData: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
      borderColor: string
      borderWidth: number
    }[]
  }
  lineData: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      fill: boolean
      borderColor: string
      backgroundColor: string
      tension: number
    }[]
  }
  doughnutData: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string[]
    }[]
  }
  radarData: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string
      borderColor: string
      borderWidth: number
    }[]
  }
}

interface UseClientDataParams {
  clients: IClient[]
  isLoading: boolean
  isError: boolean
}

export const useDashboardData = ({
  clients,
  isLoading,
  isError,
}: UseClientDataParams): UseClientDataReturn => {
  const hasData = !isLoading && !isError && clients.length > 0

  const calculateTotal = (
    clients: IClient[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    itemFilter: (item: any) => boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    valueExtractor: (item: any) => number,
  ): number =>
    clients.reduce((acc, client) => {
      return (
        acc +
        client.invoices?.reduce((invoiceAcc, invoice) => {
          return (
            invoiceAcc +
            invoice.billed_items
              ?.filter(itemFilter)
              .reduce((itemAcc, item) => itemAcc + valueExtractor(item), 0)
          )
        }, 0)
      )
    }, 0)

  const totalClients = clients.length

  const totalEnergyCompensated = calculateTotal(
    clients,
    (item) => item.item_name === 'Energia compensada GD I',
    (item) => item.quantity,
  )

  const totalValueWithoutGD = calculateTotal(
    clients,
    (item) =>
      [
        'Energia Elétrica',
        'Energia SCEE s/ ICMS',
        'Contrib Ilum Publica Municipal',
      ].includes(item.item_name),
    (item) => item.amount,
  )

  const totalGDSavings = calculateTotal(
    clients,
    (item) => item.item_name === 'Energia compensada GD I',
    (item) => Math.abs(item.amount),
  )

  const barData = useMemo(() => {
    const labels = clients.flatMap((client) =>
      client.invoices.map((invoice) => invoice.reference_month),
    )
    const data = clients.flatMap((client) =>
      client.invoices.map(
        (invoice) =>
          invoice.billed_items.find(
            (item) => item.item_name === 'Energia Elétrica',
          )?.quantity || 0,
      ),
    )

    return {
      labels,
      datasets: [
        {
          label: 'Consumo de Energia (kWh)',
          data,
          backgroundColor: '#3B82F6',
          borderColor: '#1E40AF',
          borderWidth: 1,
        },
      ],
    }
  }, [clients])

  const lineData = useMemo(() => {
    const labels = clients.flatMap((client) =>
      client.invoices.map((invoice) => invoice.reference_month),
    )
    const data = clients.flatMap((client) =>
      client.invoices.map(
        (invoice) =>
          invoice.billed_items.find(
            (item) => item.item_name === 'Energia compensada GD I',
          )?.amount || 0,
      ),
    )

    return {
      labels,
      datasets: [
        {
          label: 'Economia GD (R$)',
          data,
          fill: false,
          borderColor: '#FF6A3D',
          backgroundColor: '#FFE4E0',
          tension: 0.1,
        },
      ],
    }
  }, [clients])

  const doughnutData = useMemo(() => {
    const labels = clients.map((client) => client.full_name)
    const data = clients.map((client) =>
      client.invoices.reduce((sum, invoice) => {
        const valueWithoutGD = invoice.billed_items
          .filter((item) =>
            [
              'Energia Elétrica',
              'Energia SCEE s/ ICMS',
              'Contrib Ilum Publica Municipal',
            ].includes(item.item_name),
          )
          .reduce((acc, item) => acc + item.amount, 0)
        return sum + valueWithoutGD
      }, 0),
    )

    return {
      labels,
      datasets: [
        {
          label: 'Valor Total sem GD por Cliente (R$)',
          data,
          backgroundColor: ['#3B82F6', '#FF6A3D', '#10B981', '#E11D48'],
        },
      ],
    }
  }, [clients])

  const radarData = useMemo(() => {
    const labels = clients.flatMap((client) =>
      client.invoices.map((invoice) => invoice.reference_month),
    )
    const data = clients.map((client) =>
      client.invoices.reduce(
        (sum, invoice) =>
          sum +
          invoice.consumption_history.reduce(
            (histSum, history) => histSum + history.consumption_kwh,
            0,
          ),
        0,
      ),
    )

    return {
      labels,
      datasets: [
        {
          label: 'Consumo Médio por Cliente',
          data,
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: '#3B82F6',
          borderWidth: 2,
        },
      ],
    }
  }, [clients])

  return {
    hasData,
    totalClients,
    totalEnergyCompensated,
    totalValueWithoutGD,
    totalGDSavings,
    barData,
    lineData,
    doughnutData,
    radarData,
  }
}
