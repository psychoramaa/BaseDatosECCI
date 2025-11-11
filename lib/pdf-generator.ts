import jsPDF from 'jspdf'

export interface FacturaData {
  numero: string
  cliente: string
  monto: number
  fecha: string
  concepto: string
}

export function generarPDFFactura(factura: FacturaData) {
  const doc = new jsPDF()
  
  // Configuración
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 20
  const maxWidth = pageWidth - margin * 2
  let yPosition = margin

  // Título
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.text('FACTURA', margin, yPosition)
  yPosition += 15

  // Línea separadora
  doc.setLineWidth(0.5)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 15

  // Información de la factura
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  
  // Número de factura
  doc.setFont('helvetica', 'bold')
  doc.text('Número de Factura:', margin, yPosition)
  doc.setFont('helvetica', 'normal')
  doc.text(`#${factura.numero}`, margin + 60, yPosition)
  yPosition += 10

  // Fecha
  doc.setFont('helvetica', 'bold')
  doc.text('Fecha:', margin, yPosition)
  doc.setFont('helvetica', 'normal')
  const fechaFormateada = new Date(factura.fecha).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  doc.text(fechaFormateada, margin + 60, yPosition)
  yPosition += 15

  // Cliente
  doc.setFont('helvetica', 'bold')
  doc.text('Cliente:', margin, yPosition)
  doc.setFont('helvetica', 'normal')
  doc.text(factura.cliente, margin + 60, yPosition)
  yPosition += 15

  // Concepto
  doc.setFont('helvetica', 'bold')
  doc.text('Concepto:', margin, yPosition)
  yPosition += 7
  doc.setFont('helvetica', 'normal')
  const conceptoLines = doc.splitTextToSize(factura.concepto, maxWidth - 60)
  doc.text(conceptoLines, margin + 60, yPosition)
  yPosition += conceptoLines.length * 7 + 10

  // Línea separadora
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 10

  // Monto
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('Total:', margin, yPosition)
  doc.setFontSize(20)
  doc.text(`$${factura.monto.toFixed(2)}`, pageWidth - margin - 40, yPosition, {
    align: 'right'
  })
  yPosition += 15

  // Línea final
  doc.setLineWidth(0.5)
  doc.line(margin, yPosition, pageWidth - margin, yPosition)
  yPosition += 20

  // Pie de página
  doc.setFontSize(10)
  doc.setFont('helvetica', 'italic')
  doc.setTextColor(128, 128, 128)
  doc.text('Gracias por su preferencia', pageWidth / 2, yPosition, {
    align: 'center'
  })

  // Generar nombre del archivo
  const fileName = `Factura-${factura.numero}-${new Date().getTime()}.pdf`
  
  // Descargar PDF
  doc.save(fileName)
}
