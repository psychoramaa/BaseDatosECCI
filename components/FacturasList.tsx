'use client' // Indica que este componente se ejecuta en el cliente (Next.js con React Server Components)

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase' // Conexión al backend Supabase
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast' // Hook para mostrar notificaciones
import { Trash2, Edit, Plus, Eye, Download } from 'lucide-react' // Iconos
import DetalleFactura from '@/components/DetalleFactura' // Componente para mostrar el detalle de una factura
import { generarPDFFactura } from '@/lib/pdf-generator' // Función para generar el PDF de una factura

// Interfaz que define la estructura de una factura
interface Factura {
  id: string
  numero: string
  cliente: string
  monto: number
  fecha: string
  concepto: string
  user_id: string
}

// Propiedades que recibe el componente principal
interface FacturasListProps {
  userId: string
}

// Componente principal que muestra la lista de facturas
export default function FacturasList({ userId }: FacturasListProps) {
  // Estados locales
  const [facturas, setFacturas] = useState<Factura[]>([]) // Lista de facturas
  const [loading, setLoading] = useState(true) // Indicador de carga
  const [isDialogOpen, setIsDialogOpen] = useState(false) // Control del modal de creación/edición
  const [editingFactura, setEditingFactura] = useState<Factura | null>(null) // Factura en edición
  const [detalleFactura, setDetalleFactura] = useState<Factura | null>(null) // Factura a mostrar en detalle
  const [isDetalleOpen, setIsDetalleOpen] = useState(false) // Control del modal de detalle
  const { toast } = useToast() // Hook para mostrar mensajes toast

  // Estado para el formulario
  const [formData, setFormData] = useState({
    numero: '',
    cliente: '',
    monto: '',
    fecha: '',
    concepto: '',
  })

  // Carga las facturas cuando cambia el usuario
  useEffect(() => {
    loadFacturas()
  }, [userId])

  // Función para cargar facturas desde Supabase
  const loadFacturas = async () => {
    try {
      const { data, error } = await supabase
        .from('facturas')
        .select('*')
        .eq('user_id', userId) // Filtra por usuario
        .order('fecha', { ascending: false }) // Ordena por fecha descendente

      if (error) throw error
      setFacturas(data || [])
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Error al cargar facturas',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  // Maneja el envío del formulario (crear o actualizar factura)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingFactura) {
        // Si estamos editando, actualiza la factura
        const { error } = await supabase
          .from('facturas')
          .update({
            numero: formData.numero,
            cliente: formData.cliente,
            monto: parseFloat(formData.monto),
            fecha: formData.fecha,
            concepto: formData.concepto,
          })
          .eq('id', editingFactura.id)

        if (error) throw error
        toast({
          title: 'Éxito',
          description: 'Factura actualizada correctamente',
        })
      } else {
        // Si no hay factura en edición, crea una nueva
        const { error } = await supabase
          .from('facturas')
          .insert({
            numero: formData.numero,
            cliente: formData.cliente,
            monto: parseFloat(formData.monto),
            fecha: formData.fecha,
            concepto: formData.concepto,
            user_id: userId,
          })

        if (error) throw error
        toast({
          title: 'Éxito',
          description: 'Factura creada correctamente',
        })
      }

      // Cierra el modal, limpia el formulario y recarga la lista
      setIsDialogOpen(false)
      resetForm()
      loadFacturas()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Error al guardar factura',
        variant: 'destructive',
      })
    }
  }

  // Carga los datos de una factura seleccionada para edición
  const handleEdit = (factura: Factura) => {
    setEditingFactura(factura)
    setFormData({
      numero: factura.numero,
      cliente: factura.cliente,
      monto: factura.monto.toString(),
      fecha: factura.fecha,
      concepto: factura.concepto,
    })
    setIsDialogOpen(true)
  }

  // Elimina una factura
  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta factura?')) return

    try {
      const { error } = await supabase
        .from('facturas')
        .delete()
        .eq('id', id)

      if (error) throw error
      toast({
        title: 'Éxito',
        description: 'Factura eliminada correctamente',
      })
      loadFacturas()
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Error al eliminar factura',
        variant: 'destructive',
      })
    }
  }

  // Reinicia el formulario
  const resetForm = () => {
    setFormData({
      numero: '',
      cliente: '',
      monto: '',
      fecha: '',
      concepto: '',
    })
    setEditingFactura(null)
  }

  // Abre el diálogo para crear una nueva factura
  const openNewDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  // Abre el detalle de una factura
  const handleVerDetalle = (factura: Factura) => {
    setDetalleFactura(factura)
    setIsDetalleOpen(true)
  }

  // Genera y descarga el PDF de una factura
  const handleDownloadPDF = (factura: Factura) => {
    try {
      generarPDFFactura({
        numero: factura.numero,
        cliente: factura.cliente,
        monto: factura.monto,
        fecha: factura.fecha,
        concepto: factura.concepto,
      })
      toast({
        title: 'Éxito',
        description: 'PDF descargado correctamente',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Error al generar PDF',
        variant: 'destructive',
      })
    }
  }

  // Muestra un texto de carga mientras se obtienen las facturas
  if (loading) {
    return <div className="text-center py-8">Cargando facturas...</div>
  }

  // Renderizado principal del componente
  return (
    <div>
      {/* Modal de detalle de factura */}
      <DetalleFactura
        factura={detalleFactura}
        isOpen={isDetalleOpen}
        onClose={() => {
          setIsDetalleOpen(false)
          setDetalleFactura(null)
        }}
      />

      {/* Botón para crear nueva factura */}
      <div className="mb-6">
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button onClick={openNewDialog}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Factura
            </Button>
          </DialogTrigger>

          {/* Contenido del modal de creación/edición */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingFactura ? 'Editar Factura' : 'Nueva Factura'}
              </DialogTitle>
              <DialogDescription>
                {editingFactura
                  ? 'Modifica los datos de la factura'
                  : 'Completa los datos para crear una nueva factura'}
              </DialogDescription>
            </DialogHeader>

            {/* Formulario de factura */}
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                {/* Campo número */}
                <div className="grid gap-2">
                  <Label htmlFor="numero">Número de Factura</Label>
                  <Input
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    required
                  />
                </div>

                {/* Campo cliente */}
                <div className="grid gap-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input
                    id="cliente"
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    required
                  />
                </div>

                {/* Campo monto */}
                <div className="grid gap-2">
                  <Label htmlFor="monto">Monto</Label>
                  <Input
                    id="monto"
                    type="number"
                    step="0.01"
                    value={formData.monto}
                    onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                    required
                  />
                </div>

                {/* Campo fecha */}
                <div className="grid gap-2">
                  <Label htmlFor="fecha">Fecha</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    required
                  />
                </div>

                {/* Campo concepto */}
                <div className="grid gap-2">
                  <Label htmlFor="concepto">Concepto</Label>
                  <Input
                    id="concepto"
                    value={formData.concepto}
                    onChange={(e) => setFormData({ ...formData, concepto: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Botones del modal */}
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingFactura ? 'Actualizar' : 'Crear'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Si no hay facturas, muestra un mensaje */}
      {facturas.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">No hay facturas registradas</p>
            <p className="text-sm text-muted-foreground mt-2">
              Crea tu primera factura haciendo clic en "Nueva Factura"
            </p>
          </CardContent>
        </Card>
      ) : (
        // Si hay facturas, las muestra en tarjetas
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {facturas.map((factura) => (
            <Card key={factura.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>Factura #{factura.numero}</span>
                  {/* Botones de acción */}
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleVerDetalle(factura)} title="Ver detalle">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDownloadPDF(factura)} title="Descargar PDF">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(factura)} title="Editar">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(factura.id)} title="Eliminar">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription>{factura.cliente}</CardDescription>
              </CardHeader>

              {/* Información de la factura */}
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Monto:</span> ${factura.monto.toFixed(2)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Fecha:</span>{' '}
                    {new Date(factura.fecha).toLocaleDateString('es-ES')}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Concepto:</span> {factura.concepto}
                  </p>
                </div>

                {/* Botones secundarios */}
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleVerDetalle(factura)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Detalle
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDownloadPDF(factura)}>
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
