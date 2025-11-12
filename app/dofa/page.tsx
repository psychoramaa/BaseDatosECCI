'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import LoginForm from '@/components/LoginForm'
import { Layout } from '@/components/Layout'
import { Toaster } from '@/components/ui/toaster'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function DOFAPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

  return (
    <>
      <Layout userEmail={user.email} onLogout={handleLogout}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-white">DOFA</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Análisis DOFA
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Propuesta de Transformación Digital - InnovaTech S.A.S.
          </p>
          <p className="text-lg text-slate-500">
            Gestión de Cambios en Requerimientos
          </p>
        </div>

        {/* Vista Circular Principal DOFA */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Fortalezas - Superior Izquierda */}
            <Card className="relative overflow-hidden border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl rounded-3xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-300 rounded-full -ml-12 -mb-12 opacity-20"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">F</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-green-800">Fortalezas</CardTitle>
                    <CardDescription className="text-green-700">
                      Aspectos internos positivos
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 space-y-3">
                {[
                  { text: "Equipo con amplia experiencia técnica y enfoque en la calidad." },
                  { text: "Trato cercano y personalizado con los clientes, lo cual genera confianza." },
                  { text: "Capacidad de adaptación a nuevas metodologías y tecnologías cuando se identifican oportunidades de mejora." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-sm font-bold text-white">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed pt-1">
                      <strong className="text-green-800">{item.text.split(' ').slice(0, 4).join(' ')}</strong> {item.text.split(' ').slice(4).join(' ')}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Oportunidades - Superior Derecha */}
            <Card className="relative overflow-hidden border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-xl rounded-3xl">
              <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 rounded-full -ml-16 -mt-16 opacity-20"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-blue-300 rounded-full -mr-12 -mb-12 opacity-20"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">O</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-blue-800">Oportunidades</CardTitle>
                    <CardDescription className="text-blue-700">
                      Factores externos favorables
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 space-y-3">
                {[
                  { text: "Plataformas digitales accesibles y económicas (herramientas SaaS) que pueden adaptarse al tamaño y necesidades de la empresa." },
                  { text: "Clientes cada vez más familiarizados con herramientas digitales, dispuestos a interactuar a través de plataformas en pro de mayor transparencia y eficiencia." },
                  { text: "Posibilidad de integrar la gestión de requerimientos con otras soluciones existentes (correo, gestores de proyecto) mediante APIs o integraciones, potenciando la eficiencia." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-sm font-bold text-white">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed pt-1">
                      <strong className="text-blue-800">{item.text.split(' ').slice(0, 4).join(' ')}</strong> {item.text.split(' ').slice(4).join(' ')}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Debilidades - Inferior Izquierda */}
            <Card className="relative overflow-hidden border-2 border-red-300 bg-gradient-to-br from-red-50 to-rose-50 shadow-xl rounded-3xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-300 rounded-full -ml-12 -mb-12 opacity-20"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">D</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-red-800">Debilidades</CardTitle>
                    <CardDescription className="text-red-700">
                      Aspectos internos a mejorar
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 space-y-3">
                {[
                  { text: "Ausencia de registro formal de las solicitudes de cambio; la información suele dispersarse en correos o mensajes, dificultando la trazabilidad." },
                  { text: "Comunicación informal (vía WhatsApp, llamadas telefónicas) para coordinar cambios, lo que puede llevar a malentendidos y falta de documentación." },
                  { text: "Reprocesos constantes debido a requisitos mal comunicados o implementados sin la debida aprobación, afectando la productividad." },
                  { text: "Resistencia al cambio en ciertos miembros del equipo, acostumbrados a los procesos actuales manuales." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-red-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-sm font-bold text-white">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed pt-1">
                      <strong className="text-red-800">{item.text.split(' ').slice(0, 3).join(' ')}</strong> {item.text.split(' ').slice(3).join(' ')}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Amenazas - Inferior Derecha */}
            <Card className="relative overflow-hidden border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-amber-50 shadow-xl rounded-3xl">
              <div className="absolute top-0 left-0 w-32 h-32 bg-orange-200 rounded-full -ml-16 -mt-16 opacity-20"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-orange-300 rounded-full -mr-12 -mb-12 opacity-20"></div>
              <CardHeader className="relative z-10">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">A</span>
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-orange-800">Amenazas</CardTitle>
                    <CardDescription className="text-orange-700">
                      Factores externos negativos
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 space-y-3">
                {[
                  { text: "Competidores digitalizados que ya han digitalizado sus procesos de gestión de proyectos y cambios, ofreciendo mayor agilidad y visibilidad a los clientes." },
                  { text: "Pérdida de clientes por incumplimientos o retrasos derivados de la mala gestión de cambios; en el entorno actual los clientes exigen flexibilidad, pero también cumplimiento en tiempos." },
                  { text: "Rápida evolución tecnológica: la empresa podría quedarse atrás si no incorpora la transformación digital, dadas las crecientes expectativas en cuanto a colaboración en línea y comunicación en tiempo real." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-sm font-bold text-white">{idx + 1}</span>
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed pt-1">
                      <strong className="text-orange-800">{item.text.split(' ').slice(0, 3).join(' ')}</strong> {item.text.split(' ').slice(3).join(' ')}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resumen Estratégico */}
        <Card className="border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-white shadow-xl rounded-3xl overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full -mr-20 -mt-20 opacity-30"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-2xl">Resumen Estratégico</CardTitle>
                <CardDescription>
                  Diagnóstico y recomendaciones basadas en el análisis DOFA
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 space-y-6">
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 leading-relaxed text-base">
                Este diagnóstico evidencia la necesidad de <strong>fortalecer los procesos internos</strong> de InnovaTech 
                aprovechando sus <strong className="text-green-600">fortalezas</strong> (equipo, relación con clientes) y 
                <strong className="text-blue-600"> oportunidades</strong> tecnológicas, para mitigar sus 
                <strong className="text-red-600"> debilidades</strong> actuales en control de cambios y evitar 
                <strong className="text-orange-600"> amenazas</strong> de competitividad y satisfacción de clientes.
              </p>
              <div className="mt-6 p-6 bg-gradient-to-br from-blue-100 to-cyan-100 border-l-4 border-blue-500 rounded-2xl shadow-md">
                <p className="text-base font-semibold text-blue-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Estrategia Recomendada:
                </p>
                <ul className="text-sm text-blue-900 space-y-3 list-none">
                  {[
                    "Aprovechar la experiencia técnica del equipo y la confianza de los clientes para facilitar la adopción de nuevas herramientas",
                    "Utilizar plataformas digitales accesibles (como Trello) para transformar las debilidades en fortalezas",
                    "Implementar procesos estructurados que mitiguen los riesgos de pérdida de clientes y competencia",
                    "Capacitar al equipo para superar la resistencia al cambio y aprovechar las oportunidades tecnológicas"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-white">{idx + 1}</span>
                      </div>
                      <span className="pt-0.5">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Matriz DOFA Visual */}
        <Card className="border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-white shadow-xl rounded-3xl overflow-hidden">
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full -ml-20 -mb-20 opacity-30"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-2xl">Matriz DOFA</CardTitle>
                <CardDescription>
                  Vista estratégica de las relaciones entre factores internos y externos
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">FO</span>
                    </div>
                    <h4 className="font-semibold text-green-800 text-lg">Estrategias FO</h4>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Aprovechar fortalezas para maximizar oportunidades: Usar la experiencia del equipo y la confianza de los clientes para implementar herramientas digitales modernas.
                  </p>
                </div>
                <div className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">FA</span>
                    </div>
                    <h4 className="font-semibold text-orange-800 text-lg">Estrategias FA</h4>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Usar fortalezas para contrarrestar amenazas: Aprovechar la relación cercana con clientes para competir contra empresas más digitalizadas.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">DO</span>
                    </div>
                    <h4 className="font-semibold text-blue-800 text-lg">Estrategias DO</h4>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Minimizar debilidades aprovechando oportunidades: Implementar plataformas digitales para eliminar la falta de registro formal y comunicación informal.
                  </p>
                </div>
                <div className="p-5 bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">DA</span>
                    </div>
                    <h4 className="font-semibold text-red-800 text-lg">Estrategias DA</h4>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    Reducir debilidades y evitar amenazas: Estructurar procesos de gestión de cambios para prevenir pérdida de clientes y mantenerse competitivo.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
      </Layout>
      <Toaster />
    </>
  )
}
