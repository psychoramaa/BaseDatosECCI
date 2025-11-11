declare module 'jspdf' {
  interface jsPDF {
    setFont(family: string, style?: string): jsPDF
    setFontSize(size: number): jsPDF
    text(text: string | string[], x: number, y: number, options?: any): jsPDF
    line(x1: number, y1: number, x2: number, y2: number): jsPDF
    setLineWidth(width: number): jsPDF
    splitTextToSize(text: string, maxWidth: number): string[]
    setTextColor(r: number, g: number, b: number): jsPDF
    save(filename: string): void
  }

  class jsPDF {
    constructor(options?: any)
    internal: {
      pageSize: {
        getWidth(): number
        getHeight(): number
      }
    }
  }

  export default jsPDF
}

