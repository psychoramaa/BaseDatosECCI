'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FileText, Download, Calendar, User, DollarSign, Tag } from 'lucide-react'
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

interface DetalleFacturaProps {
  factura: Factura | null
  isOpen: boolean
  onClose: () => void
}

export default function DetalleFactura({ factura, isOpen, onClose }: DetalleFacturaProps) {
  if (!factura) return null

  const handleDownloadPDF = () => {
    generarPDFFactura({
      numero: factura.numero,
      cliente: factura.cliente,
      monto: factura.monto,
      fecha: factura.fecha,
      concepto: factura.concepto,
    })
  }

  const fechaFormateada = new Date(factura.fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">Detalle de Factura</DialogTitle>
              <DialogDescription className="mt-2">
                Información completa de la factura #{factura.numero}
              </DialogDescription>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              #{factura.numero}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Información Principal */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Fecha de Emisión</span>
              </div>
              <p className="text-base font-medium">{fechaFormateada}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>Cliente</span>
              </div>
              <p className="text-base font-medium">{factura.cliente}</p>
            </div>
          </div>

          <Separator />

          {/* Concepto */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="h-4 w-4" />
              <span>Concepto</span>
            </div>
            <p className="text-base">{factura.concepto}</p>
          </div>

          <Separator />

          {/* Monto */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">Monto Total</span>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-primary">
                  ${factura.monto.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {factura.monto.toLocaleString('es-ES', {
                    style: 'currency',
                    currency: 'USD'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Información Adicional */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <FileText className="h-4 w-4" />
              <span>Información Adicional</span>
            </div>
            <div className="text-xs space-y-1">
              <p><span className="font-medium">ID:</span> {factura.id}</p>
              <p><span className="font-medium">Creada:</span> {new Date(factura.fecha).toLocaleString('es-ES')}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleDownloadPDF}
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            Descargar PDF
          </Button>
          <Button
            onClick={onClose}
            className="flex-1"
          >
            Cerrar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
