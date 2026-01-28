import type { ListItem } from '../app/domain/types'
import { getGroupedAndOrderedProducts } from './grouping'
import { getAllCategories } from '../app/domain/classification'
import { RESTAURANT_CONFIG } from '../config/restaurant'

interface PDFGeneratorProps {
  items: ListItem[]
  language: 'es' | 'fr'
}

function generatePDFHTML(items: ListItem[], language: 'es' | 'fr', lastAddedProductId?: string, enableQuantityMode: boolean = false): { html: string; filename: string } {
  const groupedAndOrdered = getGroupedAndOrderedProducts(items, lastAddedProductId)
  const allCategories = getAllCategories()
  const categoryMap = new Map(allCategories.map((cat) => [cat.id, cat]))

  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  
  const dateStr = language === 'es'
    ? now.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    : now.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })
  const timeStr = `${hours}:${minutes}`
  const dateLabel = language === 'es' ? 'Fecha:' : 'Date:'
  const timeLabel = language === 'es' ? 'Hora:' : 'Heure:'
  const title = language === 'es' ? 'Lista de Reposición' : 'Liste de Réapprovisionnement'
  const cantLabel = language === 'es' ? 'Cant:' : 'Qte:'
  const unitLabel = language === 'es' ? 'Unidad:' : 'Unité:'
  const subtitle = RESTAURANT_CONFIG.name
  const companyName = RESTAURANT_CONFIG.name
  const docId = `${RESTAURANT_CONFIG.address}`
  const pdfFilename = `Lista_Reposicion_${day}-${month}-${year}_${hours}-${minutes}-${seconds}`

  let html = `<!DOCTYPE html>
<html lang="${language}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${pdfFilename}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    @page { size: A4; margin: 15mm 20mm; }
    @page :first { margin-top: 15mm; }
    @page :last { margin-bottom: 50mm; }
    body { font-family: 'Inter', sans-serif; font-size: 11px; line-height: 1.4; color: #000; background: white; }
    .print-wrapper { background: white; width: 100%; }
    header { border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: flex-end; page-break-after: avoid; }
    header:not(:first-of-type) { display: none; }
    @page :not(:first) header { display: none; }
    .header-left h1 { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 3px; }
    .header-left h2 { font-size: 12px; font-weight: 400; color: #333; }
    .header-right { display: flex; flex-direction: column; gap: 6px; }
    .logo-circle { width: 40px; height: 40px; background: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-family: 'Playfair Display', serif; font-weight: 700; font-size: 12px; letter-spacing: 1px; }
    .header-info { display: flex; gap: 15px; font-size: 9px; font-family: 'Courier New', monospace; }
    .header-info div { display: flex; flex-direction: column; gap: 1px; }
    .header-info strong { text-transform: uppercase; font-weight: 600; font-size: 8px; }
    .content { display: flex; flex-direction: column; gap: 3px; }
    .category-section { break-inside: auto; page-break-inside: auto; margin-bottom: 2px; }
    .category-section.large { break-inside: avoid; page-break-inside: avoid; }
    .category-title { font-family: 'Playfair Display', serif; font-size: 12px; font-weight: 700; color: #999; border-bottom: 1px solid #ccc; padding-bottom: 2px; margin-bottom: 3px; }
    .products-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; }
    .product-item { border: 1px solid #999; padding: 3px; display: flex; align-items: center; gap: 3px; font-size: 8px; background: white; }
    .checkbox { width: 11px; height: 11px; border: 1.5px solid #999; border-radius: 1px; flex-shrink: 0; }
    .product-name { font-weight: 600; flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .product-fields { display: flex; align-items: center; gap: 1px; font-size: 6.5px; flex-shrink: 0; }
    .field-label { color: #666; font-weight: 400; white-space: nowrap; }
    .field-box { border: 1px solid #999; width: 16px; height: 9px; background: #f8f8f8; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 6px; font-weight: 500; }
    footer { border-top: 2px solid #000; padding-top: 6px; margin-top: 10px; display: flex; justify-content: space-between; align-items: center; font-size: 8px; font-family: 'Courier New', monospace; color: #666; page-break-before: avoid; }
    footer:not(:last-of-type) { display: none; }
    @page :not(:last) footer { display: none; }
    .watermark { position: fixed; bottom: 35mm; right: 30mm; font-size: 140px; color: rgba(200, 200, 200, 0.06); font-family: 'Playfair Display', serif; font-weight: 700; transform: rotate(-45deg); pointer-events: none; z-index: 0; line-height: 1; }
    @page :not(:last) .watermark { display: none; }
  </style>
</head>
<body>
  <div class="print-wrapper">
    <header>
      <div class="header-left">
        <h1>${title}</h1>
        <h2>${subtitle}</h2>
      </div>
      <div class="header-right">
        <div class="logo-circle">LR</div>
        <div class="header-info">
          <div>
            <strong>${dateLabel}</strong>
            <span>${dateStr}</span>
          </div>
          <div>
            <strong>${timeLabel}</strong>
            <span>${timeStr}</span>
          </div>
        </div>
      </div>
    </header>
    
    <div class="content">`

  groupedAndOrdered.forEach(([categoryId, categoryItems]: any) => {
    if (!categoryItems || categoryItems.length === 0) return
    const category = categoryMap.get(categoryId)
    if (!category) return
    
    const categoryName = language === 'es' ? category.nameEs : category.nameFr
    const isLarge = categoryItems.length > 8
    const largeClass = isLarge ? ' large' : ''

    html += `
      <div class="category-section${largeClass}">
        <div class="category-title">${categoryName}</div>
        <div class="products-grid">`

    categoryItems.forEach((item: ListItem) => {
      const productName = language === 'es' ? item.productNameEs : item.productNameFr
      // Solo mostrar valores si enableQuantityMode está activo
      const quantityValue = enableQuantityMode && item.quantity && item.unit && item.unit !== 'unidad' ? item.quantity : ''
      const unitValue = enableQuantityMode && item.unit && item.unit !== 'unidad' ? item.unit : ''
      
      html += `
          <div class="product-item">
            <div class="checkbox"></div>
            <span class="product-name">${productName}</span>
            <div class="product-fields">
              <span class="field-label">${cantLabel}</span>
              <div class="field-box">${quantityValue}</div>
              <span class="field-label">${unitLabel}</span>
              <div class="field-box">${unitValue}</div>
            </div>
          </div>`
    })

    html += `
        </div>
      </div>`
  })

  html += `
    </div>
    
    <div class="watermark">✓</div>
    
    <footer>
      <span>${companyName}</span>
      <span>${RESTAURANT_CONFIG.address}</span>
      <span>${RESTAURANT_CONFIG.phone} | ${RESTAURANT_CONFIG.email}</span>
    </footer>
  </div>
</body>
</html>`

  return { html, filename: pdfFilename }
}

// Flag global para prevenir llamadas concurrentes
let isPrinting = false

export function generatePDF(items: ListItem[], language: 'es' | 'fr' | 'en', lastAddedProductId?: string, enableQuantityMode: boolean = false): void {
  // Prevenir múltiples llamadas simultáneas
  if (isPrinting) {
    console.log('Ya hay una impresión en proceso, esperando...')
    setTimeout(() => generatePDF(items, language, lastAddedProductId, enableQuantityMode), 500)
    return
  }
  
  isPrinting = true
  
  const { html, filename } = generatePDFHTML(items, language, lastAddedProductId, enableQuantityMode)
  
  // Detectar si es iOS (iPhone, iPad, iPod)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
  
  if (isIOS) {
    // Para iOS: usar window.open y mejorar CSS para evitar cortes
    try {
      // Mejorar CSS para iOS: agregar protección contra cortes de items
      let htmlForIOS = html
      
      // Reemplazar el watermark para ocultarlo
      htmlForIOS = htmlForIOS.replace(
        /<div class="watermark">[\s\S]*?<\/div>/,
        '<div class="watermark" style="display: none;"></div>'
      )
      
      // Agregar CSS mejorado para iOS con márgenes más grandes y protección contra cortes
      htmlForIOS = htmlForIOS.replace(
        /<\/style>/,
        `    /* iOS optimizations para evitar cortes de items */
    @page { margin: 20mm 25mm; }
    .print-wrapper { padding-bottom: 20mm; }
    .content { padding-bottom: 15mm; margin-bottom: 10mm; }
    .product-item { page-break-inside: avoid !important; break-inside: avoid !important; min-height: 13px; }
    .category-section { orphans: 2; widows: 2; page-break-inside: auto; }
    .products-grid { orphans: 2; widows: 2; }
    footer { margin-top: 20mm; }
  </style>`
      )
      
      // Crear nueva ventana
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        // Escribir el HTML mejorado en la nueva ventana
        printWindow.document.write(htmlForIOS)
        printWindow.document.close()
        
        // Usar un timeout para asegurar que el contenido se ha renderizado
        setTimeout(() => {
          try {
            const originalTitle = printWindow.document.title
            printWindow.document.title = filename
            
            // Iniciar impresión
            printWindow.print()
            
            // Cerrar la ventana después de iniciar la impresión
            setTimeout(() => {
              printWindow.document.title = originalTitle
              printWindow.close()
            }, 500)
          } catch (error) {
            console.error('Error printing on iOS:', error)
            try { printWindow.close() } catch { }
          }
        }, 800)
      }
    } catch (error) {
      console.error('Error generating PDF on iOS:', error)
    }
  } else {
    // Para Desktop (PC): usar iframe - mantiene el diseño perfecto SIN cambios
    // Pero ocultamos el watermark para PC
    let htmlForPC = html.replace(
      /<\/style>/,
      `    /* Hide watermark on desktop */
    .watermark { display: none !important; }
  </style>`
    )
    
    // Limpiar TODOS los iframes previos de impresión
    const cleanup = () => {
      const oldIframes = document.querySelectorAll('iframe[data-pdf-print="true"]')
      oldIframes.forEach(old => {
        try {
          old.remove()
        } catch (e) {
          console.log('Error limpiando iframe:', e)
        }
      })
    }
    
    cleanup()
    
    // Esperar un poco después de limpiar
    setTimeout(() => {
      const iframe = document.createElement('iframe')
      iframe.style.position = 'absolute'
      iframe.style.width = '0'
      iframe.style.height = '0'
      iframe.style.border = 'none'
      iframe.setAttribute('data-pdf-print', 'true')
      document.body.appendChild(iframe)
      
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
      if (!iframeDoc) {
        isPrinting = false
        return
      }
      
      iframeDoc.open()
      iframeDoc.write(htmlForPC)
      iframeDoc.close()
      
      // Esperar a que el iframe esté completamente cargado
      const attemptPrint = () => {
        try {
          const originalTitle = document.title
          document.title = filename
          
          const win = iframe.contentWindow
          if (win) {
            // Forzar focus
            win.focus()
            
            // Ejecutar print
            win.print()
            
            // Limpiar después
            setTimeout(() => {
              document.title = originalTitle
              cleanup()
              isPrinting = false
            }, 2000)
          } else {
            cleanup()
            isPrinting = false
          }
        } catch (error) {
          console.error('Error al imprimir:', error)
          cleanup()
          isPrinting = false
        }
      }
      
      // Esperar a que el contenido esté listo
      setTimeout(attemptPrint, 500)
    }, 100)
  }
}

export function PDFGenerator({ items, language }: PDFGeneratorProps) {
  const handleDownloadPDF = () => {
    generatePDF(items, language)
  }

  return (
    <button onClick={handleDownloadPDF} className="pdfGenerator__button">
      📥 Descargar PDF
    </button>
  )
}
