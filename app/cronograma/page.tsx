'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'
import LoginForm from '@/components/LoginForm'
import { Layout } from '@/components/Layout'
import { Toaster } from '@/components/ui/toaster'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle2, Clock, Users, Target } from 'lucide-react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';

export default function CronogramaGantt() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<ViewMode>(ViewMode.Week);

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

  // Definición de tareas del cronograma (2025)
  const tasks: Task[] = [
    {
      start: new Date(2025, 10, 12),
      end: new Date(2025, 10, 18),
      name: 'S1: Documentación',
      id: 'semana1',
      type: 'task',
      progress: 100,
      isDisabled: false,
      styles: { 
        progressColor: '#10b981', 
        progressSelectedColor: '#059669',
        backgroundColor: '#d1fae5',
        backgroundSelectedColor: '#a7f3d0'
      },
    },
    {
      start: new Date(2025, 10, 19),
      end: new Date(2025, 10, 25),
      name: 'S2: Config. Trello',
      id: 'semana2',
      type: 'task',
      progress: 100,
      isDisabled: false,
      styles: { 
        progressColor: '#3b82f6', 
        progressSelectedColor: '#2563eb',
        backgroundColor: '#dbeafe',
        backgroundSelectedColor: '#bfdbfe'
      },
    },
    {
      start: new Date(2025, 10, 26),
      end: new Date(2025, 11, 2),
      name: 'S3: Pruebas Internas',
      id: 'semana3',
      type: 'task',
      progress: 75,
      isDisabled: false,
      styles: { 
        progressColor: '#8b5cf6', 
        progressSelectedColor: '#7c3aed',
        backgroundColor: '#ede9fe',
        backgroundSelectedColor: '#ddd6fe'
      },
    },
    {
      start: new Date(2025, 11, 3),
      end: new Date(2025, 11, 9),
      name: 'S4: Capacitación',
      id: 'semana4',
      type: 'task',
      progress: 50,
      isDisabled: false,
      styles: { 
        progressColor: '#f59e0b', 
        progressSelectedColor: '#d97706',
        backgroundColor: '#fef3c7',
        backgroundSelectedColor: '#fde68a'
      },
    },
    {
      start: new Date(2025, 11, 10),
      end: new Date(2025, 11, 16),
      name: 'S5: Piloto Clientes',
      id: 'semana5',
      type: 'task',
      progress: 0,
      isDisabled: false,
      styles: { 
        progressColor: '#06b6d4', 
        progressSelectedColor: '#0891b2',
        backgroundColor: '#cffafe',
        backgroundSelectedColor: '#a5f3fc'
      },
    },
    {
      start: new Date(2025, 11, 17),
      end: new Date(2025, 11, 23),
      name: 'S6: Puesta en Marcha',
      id: 'semana6',
      type: 'task',
      progress: 0,
      isDisabled: false,
      styles: { 
        progressColor: '#ef4444', 
        progressSelectedColor: '#dc2626',
        backgroundColor: '#fee2e2',
        backgroundSelectedColor: '#fecaca'
      },
    },
  ];

  const cronogramaDetallado = [
    {
      semana: 'Semana 1',
      actividad: 'Documentación del flujo actual',
      descripcion: 'Levantamiento del proceso vigente de gestión de cambios (mapa de proceso AS-IS), identificando responsables, herramientas usadas y tiempos promedios.',
      entregables: ['Mapa de proceso AS-IS', 'Métricas base', 'Socialización del plan'],
      responsable: 'Líder de Proyecto',
      estado: 'Completado',
      color: 'bg-green-100 border-green-500',
      icon: <CheckCircle2 className="h-5 w-5 text-green-600" />
    },
    {
      semana: 'Semana 2',
      actividad: 'Configuración de la Plataforma Trello',
      descripcion: 'Creación del tablero oficial de InnovaTech en Trello, con sus listas, tarjetas modelo y automatizaciones (reglas de negocio con Butler).',
      entregables: ['Tablero Trello configurado', 'Automatizaciones activas', 'Plantillas de tarjetas'],
      responsable: 'Admin de TI',
      estado: 'Completado',
      color: 'bg-blue-100 border-blue-500',
      icon: <CheckCircle2 className="h-5 w-5 text-blue-600" />
    },
    {
      semana: 'Semana 3',
      actividad: 'Pruebas Internas',
      descripcion: 'Simulacro de uso del tablero con el equipo interno. Pruebas de punta a punta desde registrar un cambio hasta su cierre.',
      entregables: ['Casos de prueba ejecutados', 'Ajustes de configuración', 'Feedback del equipo'],
      responsable: 'Equipo de Desarrollo',
      estado: 'En Progreso',
      color: 'bg-purple-100 border-purple-500',
      icon: <Clock className="h-5 w-5 text-purple-600" />
    },
    {
      semana: 'Semana 4',
      actividad: 'Capacitación del Equipo',
      descripcion: 'Talleres y sesiones de entrenamiento para todos los involucrados internos en el uso de Trello y en las nuevas políticas de gestión de cambios.',
      entregables: ['Manuales de usuario', 'Sesiones de capacitación', 'Certificación del equipo'],
      responsable: 'Jefe de Proyecto',
      estado: 'Pendiente',
      color: 'bg-yellow-100 border-yellow-500',
      icon: <Clock className="h-5 w-5 text-yellow-600" />
    },
    {
      semana: 'Semana 5',
      actividad: 'Prueba Piloto con Clientes',
      descripcion: 'Se invita a 2-3 clientes seleccionados a utilizar el nuevo sistema para proyectos reales. Se monitorea su interacción y se obtiene retroalimentación.',
      entregables: ['Clientes onboarded', 'Feedback de clientes', 'Casos de uso reales'],
      responsable: 'Gerente de Cuenta',
      estado: 'Pendiente',
      color: 'bg-cyan-100 border-cyan-500',
      icon: <Users className="h-5 w-5 text-cyan-600" />
    },
    {
      semana: 'Semana 6',
      actividad: 'Ajustes Finales y Puesta en Marcha',
      descripcion: 'Con base en la experiencia del piloto, se realizan ajustes finales. Despliegue oficial del uso de Trello para todos los proyectos.',
      entregables: ['Ajustes implementados', 'Sistema en producción', 'Plan de monitoreo post-implementación'],
      responsable: 'Dirección General',
      estado: 'Pendiente',
      color: 'bg-red-100 border-red-500',
      icon: <Target className="h-5 w-5 text-red-600" />
    },
  ];

  return (
    <>
      <Layout userEmail={user.email} onLogout={handleLogout}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold text-slate-900 flex items-center justify-center gap-3">
            <Calendar className="h-10 w-10 text-indigo-600" />
            Cronograma de Implementación
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Proyecto de Transformación Digital - Gestión de Cambios en Requerimientos
          </p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            InnovaTech S.A.S. - 6 Semanas
          </Badge>
        </div>

        {/* Resumen del Proyecto */}
        <Card className="border-2 border-indigo-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              Objetivo del Cronograma
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-slate-700 leading-relaxed">
              Este cronograma detalla la implementación de la plataforma Trello como herramienta central 
              de gestión de requerimientos y cambios en un periodo de <strong>6 semanas</strong>. 
              El plan incluye documentación, configuración técnica, pruebas, capacitación y despliegue gradual 
              para asegurar una adopción exitosa por parte del equipo y los clientes.
            </p>
          </CardContent>
        </Card>

        {/* Diagrama de Gantt */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader className="bg-slate-900 text-white">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="h-6 w-6" />
                Diagrama de Gantt
              </span>
              <div className="flex gap-2">
                <Badge 
                  variant={view === ViewMode.Day ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => setView(ViewMode.Day)}
                >
                  Día
                </Badge>
                <Badge 
                  variant={view === ViewMode.Week ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => setView(ViewMode.Week)}
                >
                  Semana
                </Badge>
                <Badge 
                  variant={view === ViewMode.Month ? 'default' : 'outline'} 
                  className="cursor-pointer"
                  onClick={() => setView(ViewMode.Month)}
                >
                  Mes
                </Badge>
              </div>
            </CardTitle>
            <CardDescription className="text-slate-300">
              Visualización temporal de las actividades del proyecto
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 overflow-x-auto">
            <div className="bg-white rounded-lg p-4">
              <style jsx global>{`
                .gantt-task-list-header-text,
                .gantt-task-list-item-value,
                .gantt-header-text,
                .gantt-task-text {
                  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
                  font-size: 12px !important;
                }
                .gantt-task-text {
                  font-weight: 500;
                }
              `}</style>
              <Gantt
                tasks={tasks}
                viewMode={view}
                locale="es"
                listCellWidth=""
                columnWidth={view === ViewMode.Month ? 300 : view === ViewMode.Week ? 200 : 50}
                fontSize="12px"
                fontFamily="ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
              />
            </div>
          </CardContent>
        </Card>

        {/* Detalle de Actividades por Semana */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="h-7 w-7 text-indigo-600" />
            Detalle de Actividades por Semana
          </h2>
          
          {cronogramaDetallado.map((item, index) => (
            <Card key={index} className={`border-l-4 ${item.color} shadow-md hover:shadow-lg transition-shadow`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <div>
                      <CardTitle className="text-lg">{item.semana}: {item.actividad}</CardTitle>
                      <CardDescription className="mt-1">{item.descripcion}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={item.estado === 'Completado' ? 'default' : item.estado === 'En Progreso' ? 'secondary' : 'outline'}>
                    {item.estado}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                      Entregables
                    </h4>
                    <ul className="space-y-1">
                      {item.entregables.map((entregable, idx) => (
                        <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                          {entregable}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      Responsable
                    </h4>
                    <p className="text-sm text-slate-600 bg-slate-50 px-3 py-2 rounded-md inline-block">
                      {item.responsable}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Hitos Clave */}
        <Card className="border-2 border-green-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              Hitos Clave del Proyecto
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <h4 className="font-semibold text-green-900">Semana 2</h4>
                </div>
                <p className="text-sm text-slate-700">Tablero Trello configurado y listo para uso</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <h4 className="font-semibold text-yellow-900">Semana 4</h4>
                </div>
                <p className="text-sm text-slate-700">100% del equipo capacitado en uso de la plataforma</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-indigo-600" />
                  <h4 className="font-semibold text-indigo-900">Semana 6</h4>
                </div>
                <p className="text-sm text-slate-700">Sistema en producción para todos los proyectos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Métricas de Progreso */}
        <Card className="border-2 border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardTitle>Estado General del Proyecto</CardTitle>
            <CardDescription className="text-purple-50">
              Progreso general de las 6 semanas de implementación
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Progreso Total</span>
                  <span className="text-sm font-bold text-purple-700">54%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full transition-all duration-500" style={{ width: '54%' }}></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-3xl font-bold text-green-700">2</p>
                  <p className="text-sm text-slate-600">Semanas Completadas</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p className="text-3xl font-bold text-yellow-700">1</p>
                  <p className="text-sm text-slate-600">En Progreso</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-3xl font-bold text-slate-700">3</p>
                  <p className="text-sm text-slate-600">Pendientes</p>
                </div>
                <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <p className="text-3xl font-bold text-indigo-700">6</p>
                  <p className="text-sm text-slate-600">Total Semanas</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notas Importantes */}
        <Card className="border-2 border-orange-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardTitle>Notas Importantes</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-slate-700">
                <span className="text-orange-600 font-bold">•</span>
                <span>Cada actividad tiene <strong>responsables asignados</strong> (líder de proyecto, admin TI, etc.) y <strong>criterios de finalización claros</strong>.</span>
              </li>
              <li className="flex gap-3 text-sm text-slate-700">
                <span className="text-orange-600 font-bold">•</span>
                <span>El cronograma se enfoca en la <strong>gestión del cambio organizacional</strong> más que en instalación técnica (Trello es cloud-based).</span>
              </li>
              <li className="flex gap-3 text-sm text-slate-700">
                <span className="text-orange-600 font-bold">•</span>
                <span>Tras la semana 6, se continuará con una <strong>fase post-implementación de monitoreo y soporte continuo</strong> para consolidar el cambio.</span>
              </li>
              <li className="flex gap-3 text-sm text-slate-700">
                <span className="text-orange-600 font-bold">•</span>
                <span>El éxito se medirá comparando las <strong>métricas antes/después</strong>: reducción de reprocesos del 30%, mejora en puntualidad, y aumento de satisfacción del cliente a +85%.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
          </div>
        </div>
      </Layout>
      <Toaster />
    </>
  );
}
