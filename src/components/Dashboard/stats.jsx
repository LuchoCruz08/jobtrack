import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

export function ApplicationStats() {
  const [applications, setApplications] = useState([])
  const supabase = createClient()

  useEffect(() => {
    async function fetchApplications() {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
      
      if (error) {
        console.error('Error fetching applications:', error)
      } else {
        setApplications(data)
      }
    }

    fetchApplications()
  })

  const groupBy = (key) => {
    return applications.reduce((acc, app) => {
      const groupKey = app[key]
      if (!acc[groupKey]) {
        acc[groupKey] = 0
      }
      acc[groupKey]++
      return acc
    }, {})
  }

  const statusData = groupBy('status')
  const statusChartData = {
    labels: Object.keys(statusData),
    datasets: [{
      data: Object.values(statusData),
      backgroundColor: ['#3498db', '#2ecc71', '#e74c3c', '#f39c12'],
    }]
  }

  const platformData = groupBy('platform')
  const platformChartData = {
    labels: Object.keys(platformData),
    datasets: [{
      label: 'Applications by Platform',
      data: Object.values(platformData),
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
    }]
  }

  const applicationsByMonth = applications.reduce((acc, app) => {
    const date = new Date(app.application_date)
    const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`
    if (!acc[monthYear]) {
      acc[monthYear] = 0
    }
    acc[monthYear]++
    return acc
  }, {})

  const timeChartData = {
    labels: Object.keys(applicationsByMonth),
    datasets: [{
      label: 'Applications over Time',
      data: Object.values(applicationsByMonth),
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Doughnut data={statusChartData} options={{ responsive: true, plugins: { legend: { labels: { color: 'white' } } } }} />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Platformas</CardTitle>
        </CardHeader>
        <CardContent>
          <Bar data={platformChartData} options={{ responsive: true, scales: { y: { ticks: { color: 'white' } }, x: { ticks: { color: 'white' } } }, plugins: { legend: { labels: { color: 'white' } } } }} />
        </CardContent>
      </Card>

      <Card className="col-span-1 md:col-span-2 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Tiempo</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={timeChartData} options={{ responsive: true, scales: { y: { ticks: { color: 'white' } }, x: { ticks: { color: 'white' } } }, plugins: { legend: { labels: { color: 'white' } } } }} />
        </CardContent>
      </Card>
    </div>
  )
}
