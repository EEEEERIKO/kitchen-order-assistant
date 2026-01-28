import { useEffect } from 'react'
import type { ListItem } from '../app/domain/types'
import { generatePDF } from './PDFGenerator'
import { getTranslations, type LanguageCode } from '../app/i18n/translations'
import './PrintViewNew.css'

interface PrintViewProps {
  items: ListItem[]
  language: 'es' | 'fr'
}

/**
 * Genera un nombre único para el PDF con fecha y hora
 */
function generatePdfFileName(lang: 'es' | 'fr'): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const langSuffix = lang === 'es' ? 'es' : 'fr'

  return `lista-reposicion-${year}-${month}-${day}-${hours}${minutes}${seconds}-${langSuffix}.pdf`
}

/**
 * PrintView: Genera el PDF automáticamente al recibir el idioma
 * 
 * Flujo:
 * 1. Usuario presiona "Imprimir"
 * 2. Selecciona idioma en modal
 * 3. PrintView recibe idioma y genera PDF automáticamente
 * 4. Usuario ve botón para volver a lista
 */
export function PrintView({ items, language }: PrintViewProps) {
  const t = getTranslations(language as LanguageCode)
  
  useEffect(() => {
    // Generar PDF automáticamente cuando el componente se monta
    // o cuando cambia el idioma
    generatePDF(items, language)
  }, [items, language])

  return (
    <div className="printView printView--optimized">
      <div className="printView__info">
        <p>📄 PDF generando...</p>
        <p className="printView__subtext">
          {t.print.autoDownloadMessage}
        </p>
      </div>
    </div>
  )
}
