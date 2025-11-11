'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, DollarSign, TrendingUp, Calendar } from 'lucide-react'

interface DashboardProps {
  userId: string
}

interface Stats {
  totalFacturas: number
  totalMonto: number
  promedioMonto: number
  facturasEsteMes: number
}

export default function Dashboard({ userId }: DashboardProps) {
  const [stats, setStats] = useState<Stats>({
    totalFacturas: 0,
    totalMonto: 0,
    promedioMonto: 0,
    facturasEsteMes: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [userId])

  const loadStats = async () => {
    try {
      const { data, error } = await supabase
        .from('facturas')
        .select('*')
        .eq('user_id', userId)

      if (error) throw error

      const facturas = data || []
      const totalFacturas = facturas.length
      const totalMonto = facturas.reduce((sum, f) => sum + Number(f.monto), 0)
      const promedioMonto = totalFacturas > 0 ? totalMonto / totalFacturas : 0

      // Facturas de este mes
      const ahora = new Date()
      const inicioMes = new Date(ahora.getFullYear(), ahora.getMonth(), 1)
      const facturasEsteMes = facturas.filter(
        (f) => new Date(f.fecha) >= inicioMes
      ).length

      setStats({
        totalFacturas,
        totalMonto,
        promedioMonto,
        facturasEsteMes,
      })
    } catch (error: any) {
      console.error('Error cargando estadísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Cargando estadísticas...</div>
  }

  const statCards = [
    {
      title: 'Total Facturas',
      value: stats.totalFacturas,
      description: 'Facturas registradas',
      icon: FileText,
      color: 'text-blue-600',
    },
    {
      title: 'Total Monto',
      value: `$${stats.totalMonto.toFixed(2)}`,
      description: 'Suma total de facturas',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Promedio',
      value: `$${stats.promedioMonto.toFixed(2)}`,
      description: 'Monto promedio por factura',
      icon: TrendingUp,
      color: 'text-purple-600',
    },
    {
      title: 'Este Mes',
      value: stats.facturasEsteMes,
      description: 'Facturas del mes actual',
      icon: Calendar,
      color: 'text-orange-600',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Resumen de tus facturas y estadísticas
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

