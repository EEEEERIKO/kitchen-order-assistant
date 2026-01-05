/**
 * Punto de entrada (barrel export) para el dominio
 * Centraliza todas las exportaciones de la lógica de negocio
 */

// Tipos de dominio
export * from './types'

// Diccionario
export { CATEGORIES, PRODUCTS, PRODUCT_SEARCH_INDEX } from './dictionary'

// Servicios y funciones - Clasificación
export {
  classifyProduct,
  findProductByName,
  translateProductName,
  translateCategoryName,
  getAllCategories,
  getProductsByCategory,
  isValidUnit,
} from './classification'

// Servicios y funciones - Normalización
export {
  normalizeSearchString,
  calculateSimilarity,
} from './normalize'

// Servicios y funciones - Traducción automática
export {
  translateText,
  translateProductName as translateProductNameAuto,
  translateTextSync,
} from './translate'
