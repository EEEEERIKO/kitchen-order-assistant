/**
 * Utilidades para obtener nombres de productos con traducciones controladas
 * Fase 1.3 - Sistema de fallback seguro
 */

import type { LanguageCode } from '../i18n/translations'
import { translateCulinaryTerm, hasCulinaryTranslation } from './culinary-translations'

/**
 * Interfaz para representar un producto con información de traducción
 */
export interface ProductNameInfo {
  nameKey?: string
  nameEs: string
  nameFr: string
}

/**
 * Obtiene el nombre traducido de un producto según el idioma
 * 
 * Estrategia de fallback:
 * 1. Si existe nameKey y tiene traducción → usar diccionario culinario
 * 2. Si no, intentar con nameEs/nameFr según idioma
 * 3. Como último recurso, usar nameEs
 * 
 * @param product - Información del producto
 * @param language - Idioma objetivo
 * @returns Nombre traducido del producto
 * 
 * @example
 * // Producto con nameKey
 * getProductName({ nameKey: 'chicken_breast', nameEs: 'Pecho de pollo', nameFr: '...' }, 'de')
 * // → "Hähnchenbrust" (del diccionario culinario)
 * 
 * // Producto sin nameKey
 * getProductName({ nameEs: 'Producto especial', nameFr: 'Produit spécial' }, 'fr')
 * // → "Produit spécial" (fallback a nombre existente)
 */
export function getProductName(product: ProductNameInfo, language: LanguageCode): string {
  // 1. Si tiene nameKey y existe en el diccionario culinario, usarlo
  if (product.nameKey && hasCulinaryTranslation(product.nameKey)) {
    return translateCulinaryTerm(product.nameKey, language)
  }
  
  // 2. Fallback a nombres legacy según idioma
  if (language === 'fr' && product.nameFr) {
    return product.nameFr
  }
  
  // 3. Fallback final a español
  return product.nameEs
}

/**
 * Valida si un producto tiene traducciones completas
 * 
 * @param product - Información del producto
 * @returns true si tiene nameKey con traducción o ambos nombres legacy
 */
export function hasCompleteTranslations(product: ProductNameInfo): boolean {
  if (product.nameKey && hasCulinaryTranslation(product.nameKey)) {
    return true
  }
  
  return !!(product.nameEs && product.nameFr)
}

/**
 * Obtiene información de debug sobre las traducciones disponibles
 * 
 * @param product - Información del producto
 * @returns Objeto con detalles de traducción
 */
export function getTranslationInfo(product: ProductNameInfo) {
  return {
    hasNameKey: !!product.nameKey,
    nameKeyExists: product.nameKey ? hasCulinaryTranslation(product.nameKey) : false,
    hasLegacyNames: !!(product.nameEs && product.nameFr),
    nameKey: product.nameKey,
  }
}
