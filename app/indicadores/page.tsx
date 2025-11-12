'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'
import LoginForm from '@/components/LoginForm'
import { Layout } from '@/components/Layout'
import { Toaster } from '@/components/ui/toaster'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Users,
  Clock,
  AlertCircle,
  CheckCircle2,
  Activity,
  Target,
  Zap,
  ThumbsUp,
  Calendar
} from 'lucide-react';

export default function IndicadoresMetricas() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState<'antes' | 'despues'>('antes');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <LoginForm />
        <Toaster />
      </>
    )
  }

  const indicadoresPrincipales = {
    antes: {
      reprocesos: { valor: 30, unidad: '%', tendencia: 'negativa', descripcion: 'de las órdenes requieren reproceso' },
      retrasos: { valor: 40, unidad: '%', tendencia: 'negativa', descripcion: 'de proyectos con demoras' },
      satisfaccion: { valor: 70, unidad: '%', tendencia: 'neutra', descripcion: 'satisfacción del cliente' },
      trazabilidad: { valor: 25, unidad: '%', tendencia: 'negativa', descripcion: 'de cambios documentados' },
      tiempoRespuesta: { valor: 48, unidad: 'hrs', tendencia: 'negativa', descripcion: 'tiempo promedio de respuesta' },
      costoReproceso: { valor: 62500000, unidad: 'COP', tendencia: 'negativa', descripcion: 'costo mensual en reprocesos' }
    },
    despues: {
      reprocesos: { valor: 21, unidad: '%', tendencia: 'positiva', descripcion: 'de las órdenes (reducción -30%)' },
      retrasos: { valor: 18, unidad: '%', tendencia: 'positiva', descripcion: 'de proyectos (mejora 55%)' },
      satisfaccion: { valor: 87, unidad: '%', tendencia: 'positiva', descripcion: 'satisfacción del cliente (+24%)' },
      trazabilidad: { valor: 100, unidad: '%', tendencia: 'positiva', descripcion: 'de cambios documentados' },
      tiempoRespuesta: { valor: 12, unidad: 'hrs', tendencia: 'positiva', descripcion: 'tiempo promedio (75% más rápido)' },
      costoReproceso: { valor: 21875000, unidad: 'COP', tendencia: 'positiva', descripcion: 'ahorro del 65%' }
    }
  };

  const metricasOperativas = [
    {
      nombre: 'Proyectos Gestionados',
      antes: 45,
      despues: 62,
      unidad: 'proyectos/mes',
      mejora: '+38%',
      icon: <Target className="h-5 w-5" />
    },
    {
      nombre: 'Tiempo Ciclo Cambios',
      antes: 5.2,
      despues: 2.1,
      unidad: 'días',
      mejora: '-60%',
      icon: <Clock className="h-5 w-5" />
    },
    {
      nombre: 'Aprobaciones Pendientes',
      antes: 23,
      despues: 7,
      unidad: 'promedio',
      mejora: '-70%',
      icon: <CheckCircle2 className="h-5 w-5" />
    },
    {
      nombre: 'Reuniones Coordinación',
      antes: 18,
      despues: 9,
      unidad: 'hrs/semana',
      mejora: '-50%',
      icon: <Users className="h-5 w-5" />
    },
    {
      nombre: 'Errores Comunicación',
      antes: 34,
      despues: 8,
      unidad: 'incidentes/mes',
      mejora: '-76%',
      icon: <AlertCircle className="h-5 w-5" />
    },
    {
      nombre: 'Productividad Equipo',
      antes: 72,
      despues: 91,
      unidad: '%',
      mejora: '+26%',
      icon: <Zap className="h-5 w-5" />
    }
  ];

  const evolucionMensual = [
    { mes: 'Nov 2025', satisfaccion: 70, reprocesos: 30, retrasos: 40 },
    { mes: 'Dic 2025', satisfaccion: 77, reprocesos: 25, retrasos: 29 },
    { mes: 'Ene 2026', satisfaccion: 87, reprocesos: 21, retrasos: 18 }
  ];

  const beneficiosCuantitativos = [
    {
      categoria: 'Ahorro de Tiempo',
      items: [
        { concepto: 'Reducción en reprocesos', valor: '120 hrs/mes', impacto: 'Alto' },
        { concepto: 'Menos reuniones de coordinación', valor: '36 hrs/mes', impacto: 'Medio' },
        { concepto: 'Automatización de notificaciones', valor: '24 hrs/mes', impacto: 'Medio' }
      ],
      total: '180 hrs/mes',
      color: 'text-blue-700 bg-blue-50'
    },
    {
      categoria: 'Ahorro Económico',
      items: [
        { concepto: 'Reducción costos reproceso', valor: '$40.6M COP/mes', impacto: 'Alto' },
        { concepto: 'Prevención de penalizaciones', valor: '$20.8M COP/mes', impacto: 'Alto' },
        { concepto: 'Optimización recursos', valor: '$13.3M COP/mes', impacto: 'Medio' }
      ],
      total: '$74.7M COP/mes',
      color: 'text-green-700 bg-green-50'
    },
    {
      categoria: 'Mejora en Calidad',
      items: [
        { concepto: 'Incremento satisfacción cliente', valor: '+24%', impacto: 'Alto' },
        { concepto: 'Reducción errores comunicación', valor: '-76%', impacto: 'Alto' },
        { concepto: 'Mejor trazabilidad', valor: '+300%', impacto: 'Alto' }
      ],
      total: '100% mejora',
      color: 'text-purple-700 bg-purple-50'
    }
  ];

  const kpisCriticos = [
    {
      nombre: 'NPS (Net Promoter Score)',
      antes: 32,
      despues: 68,
      objetivo: 70,
      formato: 'puntos',
      estado: 'En objetivo',
      descripcion: 'Probabilidad de recomendación'
    },
    {
      nombre: 'Cumplimiento de Plazos',
      antes: 60,
      despues: 82,
      objetivo: 85,
      formato: '%',
      estado: 'Cerca del objetivo',
      descripcion: 'Proyectos entregados a tiempo'
    },
    {
      nombre: 'Tasa de Retención Clientes',
      antes: 78,
      despues: 94,
      objetivo: 90,
      formato: '%',
      estado: 'Superado',
      descripcion: 'Clientes que renuevan contratos'
    },
    {
      nombre: 'Tiempo Resolución Cambios',
      antes: 5.2,
      despues: 2.1,
      objetivo: 2.5,
      formato: 'días',
      estado: 'Superado',
      descripcion: 'Desde solicitud hasta implementación'
    }
  ];

  return (
    <>
      <Layout userEmail={user.email} onLogout={handleLogout}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <BarChart3 className="h-10 w-10 text-indigo-600" />
            Indicadores y Métricas
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Impacto de la Transformación Digital en InnovaTech S.A.S.
          </p>
          <div className="flex gap-3 justify-center">
            <Badge 
              variant={selectedPeriod === 'antes' ? 'default' : 'outline'} 
              className="cursor-pointer text-base px-4 py-2"
              onClick={() => setSelectedPeriod('antes')}
            >
              Antes (Nov 2025)
            </Badge>
            <Badge 
              variant={selectedPeriod === 'despues' ? 'default' : 'outline'} 
              className="cursor-pointer text-base px-4 py-2"
              onClick={() => setSelectedPeriod('despues')}
            >
              Después (Ene 2026)
            </Badge>
          </div>
        </div>

        {/* Indicadores Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(indicadoresPrincipales[selectedPeriod]).map(([key, data]) => (
            <Card key={key} className="border-2 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </CardTitle>
                    <CardDescription className="text-xs mt-1">
                      {data.descripcion}
                    </CardDescription>
                  </div>
                  {data.tendencia === 'positiva' && (
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  )}
                  {data.tendencia === 'negativa' && (
                    <TrendingDown className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl font-bold ${
                    data.tendencia === 'positiva' ? 'text-green-700' :
                    data.tendencia === 'negativa' ? 'text-red-700' :
                    'text-slate-700'
                  }`}>
                    {typeof data.valor === 'number' && data.valor > 1000 
                      ? data.valor.toLocaleString() 
                      : data.valor}
                  </span>
                  <span className="text-xl text-slate-600">{data.unidad}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparativa Antes vs Después */}
        <Card className="border-2 border-indigo-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6" />
              Comparativa: Impacto de la Transformación Digital
            </CardTitle>
            <CardDescription className="text-indigo-50">
              Métricas operativas antes y después de implementar Trello
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {metricasOperativas.map((metric, index) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-100 rounded-lg text-indigo-700">
                        {metric.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{metric.nombre}</h4>
                        <p className="text-xs text-slate-600">{metric.unidad}</p>
                      </div>
                    </div>
                    <Badge 
                      variant={metric.mejora.startsWith('+') ? 'default' : 'secondary'}
                      className={metric.mejora.startsWith('-') ? 'bg-green-600' : ''}
                    >
                      {metric.mejora}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                      <p className="text-xs text-red-700 font-medium mb-1">Antes</p>
                      <p className="text-2xl font-bold text-red-900">{metric.antes}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                      <p className="text-xs text-green-700 font-medium mb-1">Después</p>
                      <p className="text-2xl font-bold text-green-900">{metric.despues}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Evolución Mensual */}
        <Card className="border-2 border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Evolución Mensual de Indicadores Clave
            </CardTitle>
            <CardDescription className="text-purple-50">
              Tendencias de Nov 2025 a Ene 2026
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Satisfacción del Cliente */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-green-600" />
                    Satisfacción del Cliente
                  </h4>
                  <Badge className="bg-green-600">+24%</Badge>
                </div>
                <div className="space-y-2">
                  {evolucionMensual.map((dato, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-xs text-slate-600 w-20">{dato.mes}</span>
                      <div className="flex-1 bg-slate-200 rounded-full h-6 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-green-400 to-green-600 h-6 flex items-center justify-end pr-2 transition-all"
                          style={{ width: `${dato.satisfaccion}%` }}
                        >
                          <span className="text-xs font-bold text-white">{dato.satisfaccion}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reducción de Reprocesos */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                    <TrendingDown className="h-4 w-4 text-blue-600" />
                    Reducción de Reprocesos
                  </h4>
                  <Badge className="bg-blue-600">-30%</Badge>
                </div>
                <div className="space-y-2">
                  {evolucionMensual.map((dato, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-xs text-slate-600 w-20">{dato.mes}</span>
                      <div className="flex-1 bg-slate-200 rounded-full h-6 overflow-hidden">
                        <div 
                          className="bg-gradient-to-r from-blue-400 to-blue-600 h-6 flex items-center justify-end pr-2 transition-all"
                          style={{ width: `${dato.reprocesos}%` }}
                        >
                          <span className="text-xs font-bold text-white">{dato.reprocesos}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Beneficios Cuantitativos */}
        <div className="grid md:grid-cols-3 gap-6">
          {beneficiosCuantitativos.map((beneficio, index) => (
            <Card key={index} className="border-2 shadow-lg">
              <CardHeader className={`${beneficio.color} border-b`}>
                <CardTitle className="text-lg">{beneficio.categoria}</CardTitle>
                <CardDescription className="font-bold text-2xl mt-2">
                  {beneficio.total}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {beneficio.items.map((item, idx) => (
                    <div key={idx} className="border-l-4 border-slate-300 pl-3">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-slate-900">{item.concepto}</p>
                        <Badge variant="outline" className="text-xs">
                          {item.impacto}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{item.valor}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* KPIs Críticos */}
        <Card className="border-2 border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              KPIs Críticos del Negocio
            </CardTitle>
            <CardDescription className="text-orange-50">
              Indicadores estratégicos vs objetivos establecidos
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {kpisCriticos.map((kpi, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-slate-900 text-lg">{kpi.nombre}</h4>
                      <p className="text-sm text-slate-600">{kpi.descripcion}</p>
                    </div>
                    <Badge 
                      variant={kpi.estado === 'Superado' ? 'default' : 'secondary'}
                      className={kpi.estado === 'Superado' ? 'bg-green-600' : ''}
                    >
                      {kpi.estado}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-xs text-red-700 font-medium">Antes</p>
                      <p className="text-2xl font-bold text-red-900">{kpi.antes}{kpi.formato === '%' ? '%' : ''}</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-xs text-green-700 font-medium">Después</p>
                      <p className="text-2xl font-bold text-green-900">{kpi.despues}{kpi.formato === '%' ? '%' : ''}</p>
                    </div>
                    <div className="text-center p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                      <p className="text-xs text-indigo-700 font-medium">Objetivo</p>
                      <p className="text-2xl font-bold text-indigo-900">{kpi.objetivo}{kpi.formato === '%' ? '%' : ''}</p>
                    </div>
                  </div>
                  {/* Barra de progreso hacia objetivo */}
                  <div className="relative bg-slate-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="absolute bg-gradient-to-r from-green-400 to-green-600 h-3"
                      style={{ width: `${Math.min((kpi.despues / kpi.objetivo) * 100, 100)}%` }}
                    ></div>
                    <div 
                      className="absolute w-0.5 h-3 bg-indigo-600"
                      style={{ left: '100%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ROI y Conclusiones */}
        <Card className="border-2 border-green-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              Retorno de Inversión (ROI)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 text-lg">Inversión Inicial</h4>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-700">Licencias Trello (anual)</span>
                    <span className="font-semibold">$5.0M COP</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-700">Capacitación</span>
                    <span className="font-semibold">$14.6M COP</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-700">Configuración e implementación</span>
                    <span className="font-semibold">$11.7M COP</span>
                  </div>
                  <div className="flex justify-between pt-2 bg-slate-100 p-3 rounded-lg">
                    <span className="font-bold text-slate-900">Total Inversión</span>
                    <span className="font-bold text-lg text-slate-900">$31.3M COP</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 text-lg">Beneficios Anuales</h4>
                <div className="space-y-2">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-700">Ahorro en reprocesos</span>
                    <span className="font-semibold text-green-700">$487.5M COP</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-700">Prevención penalizaciones</span>
                    <span className="font-semibold text-green-700">$250.0M COP</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-slate-700">Nuevos contratos (retención)</span>
                    <span className="font-semibold text-green-700">$160.0M COP</span>
                  </div>
                  <div className="flex justify-between pt-2 bg-green-100 p-3 rounded-lg">
                    <span className="font-bold text-green-900">Total Beneficios</span>
                    <span className="font-bold text-lg text-green-900">$897.5M COP</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-2 border-indigo-200">
              <div className="text-center">
                <p className="text-sm text-slate-700 mb-2">ROI Anual</p>
                <p className="text-5xl font-bold text-indigo-700 mb-2">2,767%</p>
                <p className="text-sm text-slate-600">Retorno en <strong>2 semanas</strong> de implementación</p>
                <div className="mt-4 flex items-center justify-center gap-6">
                  <div className="text-center">
                    <p className="text-xs text-slate-600">Beneficio Neto</p>
                    <p className="text-2xl font-bold text-green-700">$866.2M COP</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-600">Ahorro Mensual</p>
                    <p className="text-2xl font-bold text-green-700">$74.7M COP</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conclusiones */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader className="bg-slate-900 text-white">
            <CardTitle>Conclusiones del Análisis de Indicadores</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">
                  La transformación digital ha generado una <strong>mejora del 30% en reprocesos</strong> y una 
                  <strong> reducción del 55% en retrasos</strong>, superando las expectativas iniciales del proyecto.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">
                  La satisfacción del cliente aumentó de 70% a <strong>87%</strong>, cumpliendo el objetivo de superar el 85% 
                  y fortaleciendo la retención de clientes en un 16%.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">
                  El <strong>ROI de 2,767%</strong> demuestra que la inversión en Trello se recuperó en solo 2 semanas, 
                  generando ahorros sostenibles de $74.7M COP mensuales.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700">
                  La trazabilidad mejoró de 25% a <strong>100%</strong>, eliminando completamente la pérdida de información 
                  y malentendidos en la gestión de cambios.
                </p>
              </div>
              <div className="mt-6 p-4 bg-indigo-50 border-l-4 border-indigo-600 rounded">
                <p className="font-semibold text-indigo-900">
                  ✓ Recomendación: Continuar el monitoreo mensual de estos indicadores y expandir la transformación digital 
                  a otras áreas de InnovaTech para maximizar los beneficios organizacionales.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
      </Layout>
      <Toaster />
    </>
  );
}
