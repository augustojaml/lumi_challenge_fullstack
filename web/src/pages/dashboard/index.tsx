import { useGetClients } from '@global/api/query/use-get-client'
import { formatCurrency } from '@global/helpers/format-values'
import { useDashboardData } from '@global/hooks/use-dashboard-data'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  RadialLinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar, Doughnut, Line, Radar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
)

export const DashboardPage = () => {
  const { data, isLoading, isError } = useGetClients()

  const {
    hasData,
    totalClients,
    totalEnergyCompensated,
    totalValueWithoutGD,
    totalGDSavings,
    barData,
    doughnutData,
    lineData,
    radarData,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useDashboardData({ clients: data || [], isLoading, isError })

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-textPrimary">
        Dashboard Gráficos
      </h2>
      {!hasData ? (
        <div className="rounded-lg bg-white p-6 shadow">
          <p className="text-center text-gray-500">
            Nenhum dado disponível para gerar gráficos.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-sm font-semibold text-gray-500">
                Total de Clientes
              </h3>
              <p className="text-2xl font-bold text-main">{totalClients}</p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-sm font-semibold text-gray-500">
                Total de Energia Compensada (kWh)
              </h3>
              <p className="text-2xl font-bold text-main">
                {totalEnergyCompensated}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-sm font-semibold text-gray-500">
                Valor Total sem GD (R$)
              </h3>
              <p className="text-2xl font-bold text-main">
                {formatCurrency(totalValueWithoutGD)}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-sm font-semibold text-gray-500">
                Economia GD Total (R$)
              </h3>
              <p className="text-2xl font-bold text-main">
                {formatCurrency(totalGDSavings)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-lg font-semibold text-textPrimary">
                Consumo de Energia Mensal
              </h3>
              <Bar data={barData} options={{ responsive: true }} />
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-lg font-semibold text-textPrimary">
                Economia GD Mensal
              </h3>
              <Line data={lineData} options={{ responsive: true }} />
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-lg font-semibold text-textPrimary">
                Distribuição de Valor sem GD por Cliente
              </h3>
              <Doughnut data={doughnutData} options={{ responsive: true }} />
            </div>
            <div className="rounded-lg bg-white p-4 shadow">
              <h3 className="text-lg font-semibold text-textPrimary">
                Consumo Médio por Cliente
              </h3>
              <Radar data={radarData} options={{ responsive: true }} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default DashboardPage
