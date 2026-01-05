import React, { createContext, useContext, useState, useEffect } from 'react'
import type { LanguageCode, Translations } from './translations'
import { detectBrowserLanguage, getTranslations } from './translations'

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    // Intentar obtener del localStorage primero
    const stored = localStorage.getItem('language') as LanguageCode | null
    if (stored) return stored
    
    // Si no hay preferencia guardada, detectar automáticamente
    return detectBrowserLanguage()
  })

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = getTranslations(language)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

/**
 * Hook para usar traducciones en componentes
 */
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de LanguageProvider')
  }
  return context
}
