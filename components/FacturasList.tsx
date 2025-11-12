'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { Trash2, Edit, Plus, Eye, Download } from 'lucide-react'
import DetalleFactura from '@/components/DetalleFactura'
import { generarPDFFactura } from '@/lib/pdf-generator'

interface Factura {
  id: string
  numero: string
  cliente: string
  monto: number
  fecha: string
  concepto: string
  user_id: string
}

interface FacturasListProps {
  userId: string
}

export default function FacturasList({ userId }: FacturasListProps) {
  const [facturas, setFacturas] = useState<Factura[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFactura, setEditingFactura] = useState<Factura | null>(null)
  const [detalleFactura, setDetalleFactura] = useState<Factura | null>(null)
  const [isDetalleOpen, setIsDetalleOpen] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    numero: '',
    cliente: '',
    monto: '',
    fecha: '',
    concepto: '',
  })

  // Limites
  const MAX_NUMERO = 20
  const MAX_CLIENTE = 50
  const MAX_CONCEPTO = 100

  useEffect(() => {
    loadFacturas()
  }, [userId])

  const loadFacturas = async () => {
    try {
      const { data, error } = await supabase
        .from('facturas')
        .select('*')
        .eq('user_id', userId)
        .order('fecha', { ascending: false })

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

  // Validaciones básicas antes de enviar
  function validateForm() {
    if (formData.numero.length > MAX_NUMERO) return 'El número de factura es demasiado largo.'
    if (formData.cliente.length > MAX_CLIENTE) return 'El nombre del cliente es demasiado largo.'
    if (formData.concepto.length > MAX_CONCEPTO) return 'El concepto es demasiado largo.'
    if (formData.numero.trim() === '' || formData.cliente.trim() === '' || formData.concepto.trim() === '') return 'Todos los campos son obligatorios.'
    if (isNaN(parseFloat(formData.monto)) || parseFloat(formData.monto) <= 0) return 'El monto debe ser un número mayor a 0.'
    if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.fecha)) return 'La fecha debe estar en formato YYYY-MM-DD.'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errorMsg = validateForm()
    if (errorMsg) {
      toast({
        title: 'Error de validación',
        description: errorMsg,
        variant: 'destructive',
      })
      return
    }
    try {
      if (editingFactura) {
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

  const openNewDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const handleVerDetalle = (factura: Factura) => {
    setDetalleFactura(factura)
    setIsDetalleOpen(true)
  }

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

  if (loading) {
    return <div className="text-center py-8">Cargando facturas...</div>
  }

  return (
    <div>
      <DetalleFactura
        factura={detalleFactura}
        isOpen={isDetalleOpen}
        onClose={() => {
          setIsDetalleOpen(false)
          setDetalleFactura(null)
        }}
      />

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
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="numero">Número de Factura</Label>
                  <Input
                    id="numero"
                    value={formData.numero}
                    onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                    required
                    maxLength={MAX_NUMERO}
                  />
                  <span className="text-xs text-muted-foreground">
                    Máx. {MAX_NUMERO} caracteres
                  </span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Input
                    id="cliente"
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })}
                    required
                    maxLength={MAX_CLIENTE}
                  />
                  <span className="text-xs text-muted-foreground">
                    Máx. {MAX_CLIENTE} caracteres
                  </span>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="monto">Monto</Label>
                  <Input
                    id="monto"
                    type="number"
                    step="0.01"
                    value={formData.monto}
                    onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
                    required
                    min="0.01"
                  />
                </div>
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
                <div className="grid gap-2">
                  <Label htmlFor="concepto">Concepto</Label>
                  <Input
                    id="concepto"
                    value={formData.concepto}
                    onChange={(e) => setFormData({ ...formData, concepto: e.target.value })}
                    required
                    maxLength={MAX_CONCEPTO}
                  />
                  <span className="text-xs text-muted-foreground">
                    Máx. {MAX_CONCEPTO} caracteres
                  </span>
                </div>
              </div>
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {facturas.map((factura) => (
            <Card key={factura.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>Factura #{factura.numero}</span>
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
