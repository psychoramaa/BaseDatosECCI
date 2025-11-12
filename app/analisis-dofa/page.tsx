'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  TrendingUp, 
  TrendingDown, 
  Lightbulb, 
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Target,
  Users,
  Info
} from 'lucide-react';

export default function AnalisisDOFA() {
  const [selectedQuadrant, setSelectedQuadrant] = useState<string | null>(null);
  const fortalezas = [
    {
      titulo: 'Experiencia técnica sólida',
      descripcion: 'Equipo con amplia experiencia técnica y enfoque en la calidad de desarrollo.',
      icono: <CheckCircle2 className="h-5 w-5 text-green-600" />
    },
    {
      titulo: 'Relación cercana con clientes',
      descripcion: 'Trato personalizado y cercano que genera confianza y fidelización.',
      icono: <Users className="h-5 w-5 text-green-600" />
    },
    {
      titulo: 'Capacidad de adaptación',
      descripcion: 'Apertura a nuevas metodologías y tecnologías cuando se identifican oportunidades de mejora.',
      icono: <Target className="h-5 w-5 text-green-600" />
    }
  ];

  const debilidades = [
    {
      titulo: 'Falta de registro formal',
      descripcion: 'Ausencia de sistema estructurado para registrar solicitudes de cambio, causando dispersión de información.',
      icono: <XCircle className="h-5 w-5 text-red-600" />,
      impacto: 'Alto'
    },
    {
      titulo: 'Comunicación informal',
      descripcion: 'Coordinación vía WhatsApp y llamadas sin documentación adecuada, generando malentendidos.',
      icono: <XCircle className="h-5 w-5 text-red-600" />,
      impacto: 'Alto'
    },
    {
      titulo: 'Reprocesos constantes',
      descripcion: 'Retrabajos frecuentes por requisitos mal comunicados o implementados sin aprobación (30% de órdenes).',
      icono: <XCircle className="h-5 w-5 text-red-600" />,
      impacto: 'Crítico'
    },
    {
      titulo: 'Resistencia al cambio',
      descripcion: 'Ciertos miembros del equipo prefieren mantener procesos manuales tradicionales.',
      icono: <XCircle className="h-5 w-5 text-red-600" />,
      impacto: 'Medio'
    }
  ];

  const oportunidades = [
    {
      titulo: 'Plataformas digitales accesibles',
      descripcion: 'Disponibilidad de herramientas SaaS económicas (como Trello) adaptables al tamaño de la empresa.',
      icono: <Lightbulb className="h-5 w-5 text-blue-600" />,
      potencial: 'Alto'
    },
    {
      titulo: 'Clientes digitalizados',
      descripcion: 'Clientes familiarizados con herramientas digitales, dispuestos a mayor transparencia y eficiencia.',
      icono: <Lightbulb className="h-5 w-5 text-blue-600" />,
      potencial: 'Alto'
    },
    {
      titulo: 'Posibilidad de integración',
      descripcion: 'Capacidad de integrar gestión de requerimientos con sistemas existentes mediante APIs.',
      icono: <Lightbulb className="h-5 w-5 text-blue-600" />,
      potencial: 'Medio'
    }
  ];

  const amenazas = [
    {
      titulo: 'Competencia digitalizada',
      descripcion: 'Competidores con procesos digitalizados ofrecen mayor agilidad y visibilidad.',
      icono: <AlertTriangle className="h-5 w-5 text-orange-600" />,
      severidad: 'Alta'
    },
    {
      titulo: 'Pérdida de clientes',
      descripcion: 'Riesgo de perder clientes por incumplimientos y retrasos en las entregas (40% de proyectos con demoras).',
      icono: <AlertTriangle className="h-5 w-5 text-orange-600" />,
      severidad: 'Crítica'
    },
    {
      titulo: 'Evolución tecnológica acelerada',
      descripcion: 'La empresa podría quedar rezagada ante expectativas crecientes de colaboración en línea.',
      icono: <AlertTriangle className="h-5 w-5 text-orange-600" />,
      severidad: 'Alta'
    }
  ];

  const estrategias = {
    fortalezasOportunidades: [
      'Aprovechar la experiencia técnica del equipo para liderar la adopción de Trello y convertirlos en embajadores del cambio',
      'Utilizar la relación cercana con clientes para facilitar su participación activa en la plataforma digital',
      'Capitalizar la capacidad de adaptación para implementar integraciones futuras con otras herramientas'
    ],
    fortalezasAmenazas: [
      'Usar la expertise técnica para implementar rápidamente la solución y no perder competitividad',
      'Fortalecer la confianza del cliente mediante transparencia digital para prevenir su pérdida'
    ],
    debilidadesOportunidades: [
      'Implementar Trello como sistema de registro formal centralizado y accesible',
      'Transformar la comunicación informal en flujos digitales estructurados con trazabilidad completa',
      'Reducir reprocesos mediante aprobaciones explícitas documentadas en la plataforma'
    ],
    debilidadesAmenazas: [
      'Urgente: Digitalizar antes de perder más clientes por incumplimientos',
      'Capacitar intensivamente al equipo para vencer la resistencia al cambio y alcanzar a la competencia',
      'Establecer métricas de calidad en el registro para evitar errores que generen más retrasos'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Análisis DOFA
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Proyecto de Transformación Digital para la Gestión de Cambios en Requerimientos
          </p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            InnovaTech S.A.S.
          </Badge>
        </div>

        {/* Resumen Ejecutivo */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader className="bg-slate-900 text-white">
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              Contexto del Proyecto
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-slate-700 leading-relaxed">
              InnovaTech S.A.S. enfrenta desafíos significativos en la gestión de cambios de requerimientos, 
              con un <strong>40% de proyectos con retrasos</strong> y <strong>30% de reprocesos</strong>. 
              La transformación digital mediante Trello busca mejorar la trazabilidad, reducir costos operativos 
              y aumentar la satisfacción del cliente de 70% a más de 85%.
            </p>
          </CardContent>
        </Card>

        {/* Matriz DOFA Circular Completa */}
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="relative w-full aspect-square max-w-4xl mx-auto">
            {/* Círculo contenedor con clip-path */}
            <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl">
              
              {/* Cuadrante Superior Izquierdo - FORTALEZAS */}
              <div className="absolute top-0 left-0 w-1/2 h-1/2" style={{ clipPath: 'polygon(100% 100%, 0% 100%, 0% 0%)' }}>
                <div className="relative w-full h-full bg-gradient-to-br from-green-500 to-green-600 p-4 md:p-8">
                  <div className="max-w-[85%] space-y-1.5 md:space-y-2">
                    <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                      <div className="bg-white rounded-full p-1 md:p-1.5 shadow-lg">
                        <TrendingUp className="h-3 w-3 md:h-5 md:w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xs md:text-lg drop-shadow-lg leading-tight">FORTALEZAS</h3>
                        <p className="text-green-100 text-[8px] md:text-xs drop-shadow leading-tight">Factores internos +</p>
                      </div>
                    </div>
                    {fortalezas.map((item, index) => (
                      <div key={index} className="bg-white/20 backdrop-blur-sm rounded-md p-1.5 md:p-2.5 border border-white/30">
                        <h4 className="text-white font-semibold text-[9px] md:text-xs drop-shadow flex items-start gap-1 leading-tight">
                          <CheckCircle2 className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 mt-0.5 flex-shrink-0" />
                          <span>{item.titulo}</span>
                        </h4>
                        <p className="text-green-50 text-[8px] md:text-[10px] mt-0.5 md:mt-1 ml-3 md:ml-4 drop-shadow leading-tight">
                          {item.descripcion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cuadrante Superior Derecho - OPORTUNIDADES */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2" style={{ clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%)' }}>
                <div className="relative w-full h-full bg-gradient-to-bl from-blue-500 to-blue-600 p-4 md:p-8 flex justify-end">
                  <div className="max-w-[85%] space-y-1.5 md:space-y-2 text-right">
                    <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3 justify-end">
                      <div>
                        <h3 className="text-white font-bold text-xs md:text-lg drop-shadow-lg leading-tight">OPORTUNIDADES</h3>
                        <p className="text-blue-100 text-[8px] md:text-xs drop-shadow leading-tight">Factores externos +</p>
                      </div>
                      <div className="bg-white rounded-full p-1 md:p-1.5 shadow-lg">
                        <Lightbulb className="h-3 w-3 md:h-5 md:w-5 text-blue-600" />
                      </div>
                    </div>
                    {oportunidades.map((item, index) => (
                      <div key={index} className="bg-white/20 backdrop-blur-sm rounded-md p-1.5 md:p-2.5 border border-white/30">
                        <h4 className="text-white font-semibold text-[9px] md:text-xs drop-shadow flex items-start gap-1 justify-end leading-tight">
                          <span className="text-right">{item.titulo}</span>
                          <Lightbulb className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 mt-0.5 flex-shrink-0" />
                        </h4>
                        <p className="text-blue-50 text-[8px] md:text-[10px] mt-0.5 md:mt-1 mr-3 md:mr-4 drop-shadow leading-tight">
                          {item.descripcion}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cuadrante Inferior Izquierdo - DEBILIDADES */}
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)' }}>
                <div className="relative w-full h-full bg-gradient-to-tr from-red-500 to-red-600 p-4 md:p-8 flex items-end">
                  <div className="max-w-[85%] space-y-1.5 md:space-y-2">
                    {debilidades.map((item, index) => (
                      <div key={index} className="bg-white/20 backdrop-blur-sm rounded-md p-1.5 md:p-2.5 border border-white/30">
                        <h4 className="text-white font-semibold text-[9px] md:text-xs drop-shadow flex items-start gap-1 leading-tight">
                          <XCircle className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 mt-0.5 flex-shrink-0" />
                          <span className="flex-1">{item.titulo}</span>
                          {item.impacto === 'Crítico' && (
                            <Badge variant="destructive" className="text-[7px] md:text-[9px] h-fit px-1 py-0">
                              {item.impacto}
                            </Badge>
                          )}
                        </h4>
                        <p className="text-red-50 text-[8px] md:text-[10px] mt-0.5 md:mt-1 ml-3 md:ml-4 drop-shadow leading-tight">
                          {item.descripcion}
                        </p>
                      </div>
                    ))}
                    <div className="flex items-center gap-1.5 md:gap-2 mt-2 md:mt-3">
                      <div className="bg-white rounded-full p-1 md:p-1.5 shadow-lg">
                        <TrendingDown className="h-3 w-3 md:h-5 md:w-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-xs md:text-lg drop-shadow-lg leading-tight">DEBILIDADES</h3>
                        <p className="text-red-100 text-[8px] md:text-xs drop-shadow leading-tight">Factores internos -</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cuadrante Inferior Derecho - AMENAZAS */}
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2" style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%)' }}>
                <div className="relative w-full h-full bg-gradient-to-tl from-orange-500 to-orange-600 p-4 md:p-8 flex items-end justify-end">
                  <div className="max-w-[85%] space-y-1.5 md:space-y-2 text-right">
                    {amenazas.map((item, index) => (
                      <div key={index} className="bg-white/20 backdrop-blur-sm rounded-md p-1.5 md:p-2.5 border border-white/30">
                        <h4 className="text-white font-semibold text-[9px] md:text-xs drop-shadow flex items-start gap-1 justify-end leading-tight">
                          <span className="text-right flex-1">{item.titulo}</span>
                          <AlertTriangle className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 mt-0.5 flex-shrink-0" />
                        </h4>
                        <p className="text-orange-50 text-[8px] md:text-[10px] mt-0.5 md:mt-1 mr-3 md:mr-4 drop-shadow leading-tight">
                          {item.descripcion}
                        </p>
                      </div>
                    ))}
                    <div className="flex items-center gap-1.5 md:gap-2 mt-2 md:mt-3 justify-end">
                      <div>
                        <h3 className="text-white font-bold text-xs md:text-lg drop-shadow-lg leading-tight">AMENAZAS</h3>
                        <p className="text-orange-100 text-[8px] md:text-xs drop-shadow leading-tight">Factores externos -</p>
                      </div>
                      <div className="bg-white rounded-full p-1 md:p-1.5 shadow-lg">
                        <AlertTriangle className="h-3 w-3 md:h-5 md:w-5 text-orange-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Líneas divisorias */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 md:h-1 bg-white z-10 -translate-y-1/2 shadow-lg"></div>
              <div className="absolute top-0 left-1/2 w-0.5 md:w-1 h-full bg-white z-10 -translate-x-1/2 shadow-lg"></div>
            </div>

            {/* Centro */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-white shadow-2xl border-2 md:border-4 border-slate-300 flex flex-col items-center justify-center">
                <Target className="h-6 w-6 md:h-12 md:w-12 text-slate-700 mb-1 md:mb-2" />
                <p className="text-[8px] md:text-xs font-bold text-slate-900 text-center">ANÁLISIS</p>
                <p className="text-base md:text-2xl font-bold text-slate-900 text-center">DOFA</p>
                <p className="text-[8px] md:text-xs text-slate-600 text-center mt-0.5 md:mt-1">InnovaTech</p>
              </div>
            </div>
          </div>
        </div>

        {/* Estrategias Cruzadas */}
        <Card className="border-2 border-purple-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
            <CardTitle>Estrategias DOFA Cruzadas</CardTitle>
            <CardDescription className="text-purple-50">
              Acciones estratégicas derivadas del análisis
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* FO - Fortalezas + Oportunidades */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-gradient-to-r from-green-500 to-blue-500">
                  FO - Estrategias Ofensivas
                </Badge>
                <span className="text-sm text-slate-600">Maximizar fortalezas para aprovechar oportunidades</span>
              </div>
              <ul className="space-y-2">
                {estrategias.fortalezasOportunidades.map((estrategia, index) => (
                  <li key={index} className="flex gap-2 text-sm">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">{estrategia}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* FA - Fortalezas + Amenazas */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-gradient-to-r from-green-500 to-orange-500">
                  FA - Estrategias Defensivas
                </Badge>
                <span className="text-sm text-slate-600">Usar fortalezas para minimizar amenazas</span>
              </div>
              <ul className="space-y-2">
                {estrategias.fortalezasAmenazas.map((estrategia, index) => (
                  <li key={index} className="flex gap-2 text-sm">
                    <span className="text-green-600 font-bold">•</span>
                    <span className="text-slate-700">{estrategia}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* DO - Debilidades + Oportunidades */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-gradient-to-r from-red-500 to-blue-500">
                  DO - Estrategias Adaptativas
                </Badge>
                <span className="text-sm text-slate-600">Superar debilidades aprovechando oportunidades</span>
              </div>
              <ul className="space-y-2">
                {estrategias.debilidadesOportunidades.map((estrategia, index) => (
                  <li key={index} className="flex gap-2 text-sm">
                    <span className="text-blue-600 font-bold">•</span>
                    <span className="text-slate-700">{estrategia}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            {/* DA - Debilidades + Amenazas */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-gradient-to-r from-red-500 to-orange-500">
                  DA - Estrategias de Supervivencia
                </Badge>
                <span className="text-sm text-slate-600">Minimizar debilidades y evitar amenazas</span>
              </div>
              <ul className="space-y-2">
                {estrategias.debilidadesAmenazas.map((estrategia, index) => (
                  <li key={index} className="flex gap-2 text-sm">
                    <span className="text-red-600 font-bold">•</span>
                    <span className="text-slate-700">{estrategia}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Indicadores de Éxito */}
        <Card className="border-2 border-indigo-200 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
            <CardTitle>Indicadores Clave de Éxito</CardTitle>
            <CardDescription className="text-indigo-50">
              Métricas antes y después de la transformación digital
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Situación Actual (Antes)
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900">Reprocesos</p>
                    <p className="text-2xl font-bold text-red-600">30%</p>
                    <p className="text-xs text-slate-600">de las órdenes</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900">Proyectos con retrasos</p>
                    <p className="text-2xl font-bold text-red-600">40%</p>
                    <p className="text-xs text-slate-600">demoras por cambios no previstos</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900">Satisfacción del cliente</p>
                    <p className="text-2xl font-bold text-red-600">70%</p>
                    <p className="text-xs text-slate-600">valoración en encuestas</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900">Trazabilidad</p>
                    <p className="text-2xl font-bold text-red-600">Baja</p>
                    <p className="text-xs text-slate-600">sin repositorio único</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Meta Propuesta (Después)
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900">Reprocesos</p>
                    <p className="text-2xl font-bold text-green-600">-30%</p>
                    <p className="text-xs text-slate-600">reducción significativa</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900">Proyectos con retrasos</p>
                    <p className="text-2xl font-bold text-green-600">&lt;20%</p>
                    <p className="text-xs text-slate-600">mejora de puntualidad</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900">Satisfacción del cliente</p>
                    <p className="text-2xl font-bold text-green-600">&gt;85%</p>
                    <p className="text-xs text-slate-600">mayor transparencia</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium text-slate-900">Trazabilidad</p>
                    <p className="text-2xl font-bold text-green-600">100%</p>
                    <p className="text-xs text-slate-600">cambios registrados en Trello</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Conclusión */}
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardHeader className="bg-slate-900 text-white">
            <CardTitle>Conclusión del Análisis DOFA</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <p className="text-slate-700 leading-relaxed">
              El análisis DOFA evidencia que <strong>InnovaTech S.A.S. posee fortalezas sólidas</strong> (equipo técnico 
              experimentado y buena relación con clientes) que pueden aprovecharse para capitalizar las oportunidades 
              tecnológicas disponibles. Sin embargo, las <strong>debilidades críticas en la gestión de cambios</strong> 
              (falta de registro formal, comunicación informal y reprocesos del 30%) representan un riesgo significativo 
              ante las amenazas competitivas.
            </p>
            <p className="text-slate-700 leading-relaxed">
              La implementación de <strong>Trello como plataforma digital centralizada</strong> es la estrategia clave 
              para transformar las debilidades en fortalezas, mitigar las amenazas de pérdida de clientes y competitividad, 
              y posicionar a InnovaTech en un <strong>nivel superior de madurez digital</strong> (de Nivel 2 a Nivel 3+).
            </p>
            <div className="mt-6 p-4 bg-indigo-50 border-l-4 border-indigo-600 rounded">
              <p className="font-semibold text-indigo-900">
                ✓ Urgencia de Acción: La transformación digital no es opcional sino crítica para la supervivencia competitiva
              </p>
              <p className="text-sm text-indigo-700 mt-2">
                El proyecto de 6 semanas permitirá reducir reprocesos, mejorar la satisfacción del cliente de 70% a +85%, 
                y establecer bases sólidas para futuras transformaciones digitales.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
