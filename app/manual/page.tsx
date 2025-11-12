'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import LoginForm from '@/components/LoginForm'
import { Layout } from '@/components/Layout'
import { Toaster } from '@/components/ui/toaster'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ManualPage() {
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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Manual de Usuario
          </h1>
          <p className="text-xl text-slate-600 font-medium">
            Guía Rápida - Gestión de Cambios en Requerimientos
          </p>
          <p className="text-lg text-slate-500">
            InnovaTech S.A.S. - Plataforma Trello
          </p>
        </div>

        {/* Sección: Acceso al Tablero */}
        <Card className="relative overflow-hidden border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-xl rounded-3xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-300 rounded-full -ml-12 -mb-12 opacity-20"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-2xl text-indigo-800">1. Acceso al Tablero</CardTitle>
                <CardDescription className="text-indigo-700">
                  Cómo ingresar a la plataforma Trello
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">1</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-indigo-800">Recibirás una invitación por correo electrónico</strong> de InnovaTech con un enlace para acceder al tablero de Trello.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">2</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-indigo-800">Haz clic en el enlace</strong> o copia y pega la URL en tu navegador web.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">3</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-indigo-800">Si no tienes cuenta de Trello:</strong> Crea una cuenta gratuita con tu correo electrónico. Si ya tienes cuenta, simplemente inicia sesión.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">4</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-indigo-800">Una vez dentro,</strong> verás el tablero "Gestión de Cambios - InnovaTech" con diferentes columnas (listas) que representan las etapas del proceso.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Crear Solicitud de Cambio */}
        <Card className="relative overflow-hidden border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-xl rounded-3xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200 rounded-full -ml-16 -mt-16 opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-cyan-300 rounded-full -mr-12 -mb-12 opacity-20"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-2xl text-blue-800">2. Crear una Solicitud de Cambio</CardTitle>
                <CardDescription className="text-blue-700">
                  Registrar una nueva modificación o requerimiento
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">1</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-blue-800">Ubica la lista "Solicitudes Nuevas"</strong> en el tablero (primera columna a la izquierda).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">2</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-blue-800">Haz clic en el botón "+ Agregar una tarjeta"</strong> que aparece en la parte inferior de la lista.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">3</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-blue-800">Escribe un título descriptivo</strong> para tu solicitud (ejemplo: "Agregar campo de fecha en formulario de contacto").
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">4</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-blue-800">Presiona Enter</strong> para crear la tarjeta, luego haz clic en ella para abrir los detalles.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">5</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-blue-800">En la descripción de la tarjeta,</strong> proporciona todos los detalles del cambio: qué necesitas, por qué es importante, y cualquier información relevante.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">6</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-blue-800">Opcionalmente,</strong> puedes adjuntar archivos (imágenes, documentos) haciendo clic en el botón "Adjuntar" en el panel lateral de la tarjeta.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Aprobar Cambios */}
        <Card className="relative overflow-hidden border-2 border-green-300 bg-gradient-to-br from-green-50 to-emerald-50 shadow-xl rounded-3xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-300 rounded-full -ml-12 -mb-12 opacity-20"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-2xl text-green-800">3. Aprobar un Cambio</CardTitle>
                <CardDescription className="text-green-700">
                  Confirmar que estás de acuerdo con la implementación
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">1</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-green-800">Recibirás una notificación</strong> cuando el equipo de InnovaTech haya evaluado tu solicitud y la haya movido a la lista "Pendiente Aprobación Cliente".
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">2</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-green-800">Abre la tarjeta</strong> haciendo clic en ella. Revisa la información actualizada, incluyendo el impacto en costo y fecha de entrega (si aplica).
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">3</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-green-800">Busca la sección "Aprobación del Cliente"</strong> en la tarjeta. Verás una casilla de verificación (checkbox) o un botón de aprobación.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">4</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-green-800">Marca la casilla o haz clic en "Aprobar"</strong> si estás de acuerdo con proceder con el cambio. Esto quedará registrado con fecha y hora.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">5</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-green-800">Si necesitas hacer comentarios o preguntas,</strong> puedes escribirlos en la sección de comentarios de la tarjeta antes de aprobar.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md">
                  <span className="text-sm font-bold text-white">6</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-green-800">Una vez aprobado,</strong> el equipo de InnovaTech será notificado automáticamente y procederá con la implementación.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Funciones Principales */}
        <Card className="relative overflow-hidden border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50 shadow-xl rounded-3xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-purple-200 rounded-full -ml-16 -mt-16 opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-300 rounded-full -mr-12 -mb-12 opacity-20"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-2xl text-purple-800">4. Funciones Principales de Trello</CardTitle>
                <CardDescription className="text-purple-700">
                  Herramientas útiles para gestionar tus requerimientos
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Comentarios */}
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-purple-800">Comentarios</h4>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Usa la sección de comentarios en cada tarjeta para hacer preguntas, aclarar dudas o proporcionar información adicional. Todos los comentarios quedan registrados con fecha y autor.
                </p>
              </div>

              {/* Notificaciones */}
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-purple-800">Notificaciones</h4>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Recibirás notificaciones por correo electrónico cuando haya actualizaciones en tus tarjetas: cuando se mueva a una nueva etapa, cuando alguien comente, o cuando requiera tu aprobación.
                </p>
              </div>

              {/* Seguimiento */}
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-purple-800">Seguimiento</h4>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Puedes ver el estado de todas tus solicitudes en el tablero. Las tarjetas se mueven de izquierda a derecha según su progreso: Solicitud → Análisis → Aprobación → Implementación → Completado.
                </p>
              </div>

              {/* Archivos Adjuntos */}
              <div className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-purple-800">Archivos Adjuntos</h4>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Adjunta imágenes, documentos PDF, o archivos de referencia directamente en las tarjetas. Esto ayuda al equipo a entender mejor tus requerimientos.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sección: Flujo del Proceso */}
        <Card className="relative overflow-hidden border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-xl rounded-3xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200 rounded-full -mr-16 -mt-16 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-300 rounded-full -ml-12 -mb-12 opacity-20"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-2xl text-amber-800">5. Flujo del Proceso</CardTitle>
                <CardDescription className="text-amber-700">
                  Cómo se mueven tus solicitudes a través del sistema
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              {[
                { 
                  etapa: "Solicitudes Nuevas", 
                  descripcion: "Aquí creas tus nuevas solicitudes de cambio. El equipo de InnovaTech las revisará.",
                  color: "blue"
                },
                { 
                  etapa: "En Análisis", 
                  descripcion: "El equipo evalúa el impacto del cambio: tiempo, costo y complejidad.",
                  color: "purple"
                },
                { 
                  etapa: "Pendiente Aprobación Cliente", 
                  descripcion: "Aquí debes revisar y aprobar el cambio antes de que se implemente.",
                  color: "amber"
                },
                { 
                  etapa: "En Desarrollo/Implementación", 
                  descripcion: "El equipo está trabajando en tu solicitud. Puedes ver el progreso en los comentarios.",
                  color: "indigo"
                },
                { 
                  etapa: "Completado", 
                  descripcion: "El cambio ha sido implementado y está listo. Puedes verificar y dar feedback.",
                  color: "green"
                }
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-200 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <span className="text-sm font-bold text-white">{idx + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-amber-800 mb-1">{item.etapa}</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">{item.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sección: Consejos y Buenas Prácticas */}
        <Card className="relative overflow-hidden border-2 border-teal-300 bg-gradient-to-br from-teal-50 to-cyan-50 shadow-xl rounded-3xl">
          <div className="absolute top-0 left-0 w-32 h-32 bg-teal-200 rounded-full -ml-16 -mt-16 opacity-20"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-cyan-300 rounded-full -mr-12 -mb-12 opacity-20"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-2xl text-teal-800">6. Consejos y Buenas Prácticas</CardTitle>
                <CardDescription className="text-teal-700">
                  Recomendaciones para un uso eficiente de la plataforma
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Sé específico y claro en tus descripciones de cambio. Mientras más detalles proporciones, más rápido podrá el equipo evaluar e implementar.",
                "Revisa regularmente el tablero para estar al tanto del estado de tus solicitudes. No esperes solo las notificaciones por correo.",
                "Usa los comentarios para comunicarte con el equipo. Evita enviar correos separados; todo queda mejor documentado en Trello.",
                "Si tienes múltiples cambios relacionados, considera agruparlos en una sola solicitud o mencionar la relación entre ellas en los comentarios.",
                "Aprovecha las etiquetas (labels) si el equipo las ha configurado. Te ayudarán a categorizar y filtrar tus solicitudes.",
                "Si necesitas cambiar algo en una solicitud ya aprobada, crea una nueva tarjeta en lugar de modificar la existente para mantener el historial."
              ].map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-teal-200 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed pt-1">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sección: Soporte y Contacto */}
        <Card className="relative overflow-hidden border-2 border-slate-300 bg-gradient-to-br from-slate-50 to-white shadow-xl rounded-3xl">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-slate-200 to-gray-200 rounded-full -mr-20 -mt-20 opacity-30"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <CardTitle className="text-2xl">¿Necesitas Ayuda?</CardTitle>
                <CardDescription>
                  Contacta al equipo de InnovaTech para soporte
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="p-6 bg-gradient-to-br from-blue-100 to-indigo-100 border-l-4 border-blue-500 rounded-2xl shadow-md">
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                Si tienes dudas sobre cómo usar Trello o necesitas asistencia técnica, no dudes en contactarnos:
              </p>
              <ul className="text-sm text-slate-700 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <strong>Correo:</strong> soporte@innovatech.com
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <strong>Teléfono:</strong> +57 3228461338
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <strong>Horario de atención:</strong> Lunes a Viernes, 8:00 AM - 6:00 PM
                </li>
              </ul>
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

