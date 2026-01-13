/**
 * Servicio de clasificación de productos
 * Recibe un nombre en español y devuelve información completa del producto
 * Maneja productos conocidos y desconocidos sin romper la aplicación
 */

import type {
  Product,
  Category,
  ListItem,
  CategoryId,
  ProductId,
  Unit,
} from './types'
import { createProductId, UNKNOWN_CATEGORY_ID } from './types'
import { CATEGORIES, PRODUCTS, PRODUCT_SEARCH_INDEX } from './dictionary'
import { normalizeSearchString, calculateSimilarity } from './normalize'
import { translateTextSync } from './translate'

/**
 * Genera un UUID simple sin dependencias externas
 */
function generateUUID(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Busca un producto en el diccionario por nombre en español
 * Intenta coincidencias exactas, luego parciales, luego similares
 *
 * @param productNameEs Nombre del producto en español
 * @returns Producto si existe, undefined si no
 */
export function findProductByName(productNameEs: string): Product | undefined {
  const normalized = normalizeSearchString(productNameEs)

  // 1. Búsqueda exacta normalizada en el índice
  if (PRODUCT_SEARCH_INDEX[normalized]) {
    const key = PRODUCT_SEARCH_INDEX[normalized]
    return PRODUCTS[key]
  }

  // 2. Búsqueda de coincidencia al inicio (más restrictiva)
  let bestMatch: Product | undefined = undefined
  let bestStartMatchLength = 0

  for (const [, product] of Object.entries(PRODUCTS)) {
    const productNormalized = normalizeSearchString(product.nameEs)
    if (productNormalized.startsWith(normalized) && normalized.length > bestStartMatchLength) {
      bestMatch = product
      bestStartMatchLength = normalized.length
    }
  }

  if (bestMatch) return bestMatch

  // 3. Búsqueda de similitud (evita falsos positivos como "sal" -> "salmon")
  // Requiere al menos 70% de similitud
  let bestSimilarityMatch: Product | undefined = undefined
  let bestSimilarity = 0.7

  for (const [, product] of Object.entries(PRODUCTS)) {
    const productNormalized = normalizeSearchString(product.nameEs)
    const similarity = calculateSimilarity(normalized, productNormalized)

    // Solo considerar si la similitud es muy alta (>85%)
    // Y solo si el input tiene al menos 3 caracteres (evita falsos positivos cortos)
    if (similarity > 0.85 && normalized.length >= 3 && similarity > bestSimilarity) {
      bestSimilarityMatch = product
      bestSimilarity = similarity
    }
  }

  return bestSimilarityMatch
}

/**
 * Obtiene la categoría por su ID
 *
 * @param categoryId ID de la categoría
 * @returns Categoría si existe
 */
export function getCategoryById(categoryId: CategoryId): Category | undefined {
  return Object.values(CATEGORIES).find((cat) => cat.id === categoryId)
}

/**
 * Crea un item de lista a partir de entrada del usuario
 * Esta es la función principal del flujo de clasificación
 *
 * @param productNameEs Nombre del producto como lo escribió el chef
 * @param quantity Cantidad
 * @param unit Unidad de medida
 * @returns ListItem completamente tipado y clasificado
 */
export function classifyProduct(
  productNameEs: string,
  quantity: number,
  unit?: Unit
): ListItem {
  // Validar entrada básica
  if (!productNameEs || productNameEs.trim().length === 0) {
    throw new Error('El nombre del producto no puede estar vacío')
  }

  if (quantity <= 0) {
    throw new Error('La cantidad debe ser mayor a 0')
  }

  // Intentar encontrar el producto en el diccionario
  const knownProduct = findProductByName(productNameEs)

  if (knownProduct) {
    // Producto conocido: usar información del diccionario
    const category = getCategoryById(knownProduct.categoryId)!
    return {
      id: generateUUID(),
      productId: knownProduct.id,
      productNameEs: knownProduct.nameEs,
      categoryId: knownProduct.categoryId,
      categoryNameEs: category.nameEs,
      categoryNameFr: category.nameFr,
      quantity,
      unit,
      productNameFr: knownProduct.nameFr,
      isKnown: true,
      isOrderMarked: false,
    }
  }

  // Producto desconocido: asignar a categoría "Otros"
  // Usar traducción automática para productos nuevos
  const unknownCategory = CATEGORIES.otros
  const productNameFr = translateTextSync(productNameEs)

  return {
    id: generateUUID(),
    productId: createProductId(`unknown-${Date.now()}-${Math.random()}`),
    productNameEs: productNameEs.trim(),
    categoryId: unknownCategory.id,
    categoryNameEs: unknownCategory.nameEs,
    categoryNameFr: unknownCategory.nameFr,
    quantity,
    unit,
    productNameFr, // Usando traducción automática
    isKnown: false,
    isOrderMarked: false,
  }
}

/**
 * Traduce un nombre de producto
 * Busca el producto en el diccionario y devuelve su nombre en francés
 *
 * @param productNameEs Nombre del producto en español
 * @returns Nombre en francés si existe, sino el mismo nombre
 */
export function translateProductName(productNameEs: string): string {
  const product = findProductByName(productNameEs)
  if (product) {
    return product.nameFr
  }
  // Si no existe, devolver el mismo nombre (pendiente de traducción)
  return productNameEs
}

/**
 * Traduce un nombre de categoría
 *
 * @param categoryId ID de la categoría
 * @returns Nombre en francés
 */
export function translateCategoryName(categoryId: CategoryId): string {
  const category = getCategoryById(categoryId)
  return category?.nameFr || categoryId
}

/**
 * Obtiene todas las categorías disponibles
 *
 * @returns Array de categorías
 */
export function getAllCategories(): Category[] {
  return Object.values(CATEGORIES)
}

/**
 * Obtiene todos los productos de una categoría
 *
 * @param categoryId ID de la categoría
 * @returns Array de productos en esa categoría
 */
export function getProductsByCategory(categoryId: CategoryId): Product[] {
  return Object.values(PRODUCTS).filter((p) => p.categoryId === categoryId)
}

/**
 * Valida si una unidad es permitida
 *
 * @param unit Unidad a validar
 * @returns true si es válida
 */
export function isValidUnit(unit: string): unit is Unit {
  const validUnits: Unit[] = [
    'kg',
    'g',
    'L',
    'ml',
    'unidad',
    'caja',
    'paquete',
    'bote',
    'lata',
    'docena',
  ]
  return validUnits.includes(unit as Unit)
}
