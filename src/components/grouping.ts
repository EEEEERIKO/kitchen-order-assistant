import type { ListItem, CategoryId } from '../app/domain/types'
import { getAllCategories } from '../app/domain/classification'

/**
 * GroupedByCategory: Estructura de datos para productos agrupados
 * Cada categoría contiene un array de items en orden de entrada
 */
export interface GroupedByCategory {
  [categoryId: string]: ListItem[]
}

/**
 * groupProductsByCategory: Agrupa items de lista por su categoryId
 *
 * @param items Array plano de ListItem
 * @returns Objeto con structure { [categoryId]: [items] }
 *
 * Propiedades:
 * - Preserva orden de entrada dentro de cada categoría
 * - Asegura que ningún producto se pierda
 * - Maneja productos desconocidos (van a "otros")
 */
export function groupProductsByCategory(items: ListItem[]): GroupedByCategory {
  return items.reduce((grouped, item) => {
    const categoryId = item.categoryId
    if (!grouped[categoryId]) {
      grouped[categoryId] = []
    }
    grouped[categoryId].push(item)
    return grouped
  }, {} as GroupedByCategory)
}

/**
 * getCategoriesInOrder: Obtiene todas las categorías en orden predefinido
 *
 * @returns Array de CategoryIds en orden operativo (carnes, pescados, verduras...)
 *
 * Orden: basado en frecuencia y lógica de cocina
 * - Carnes, Pescados (proteínas)
 * - Verduras, Frutas (frescos)
 * - Lácteos (refrigerado)
 * - Secos, Condimentos, Aceites (almacén)
 * - Otros (desconocidos)
 */
export function getCategoriesInOrder(): string[] {
  const categories = getAllCategories()

  // Orden mantenido del diccionario (ver dictionary.ts)
  // Corresponde al orden operativo en cocina
  return categories.map((cat) => cat.id)
}

/**
 * getGroupedAndOrderedProducts: Agrupa y ordena productos de forma útil para el chef
 *
 * @param items Array plano de ListItem
 * @param highlightedProductId ID del producto a destacar (se pone primero)
 * @returns Array de [categoryId, items, highlightedProductId] en orden de categoría
 *
 * Garantías:
 * - Todas las categorías presentes en items aparecen
 * - Si hay producto destacado: su categoría va primero
 * - Dentro de cada categoría: producto destacado primero, luego orden alfabético
 * - Si una categoría está vacía: no aparece
 * - Orden entre categorías: predefinido y consistente (excepto la destacada que va primero)
 */
export function getGroupedAndOrderedProducts(
  items: ListItem[],
  highlightedProductId?: string
): [string, ListItem[], string | null][] {
  const grouped = groupProductsByCategory(items)
  const categoryOrder = getCategoriesInOrder()

  // Encontrar la categoría del producto destacado
  let highlightedCategoryId: string | null = null
  if (highlightedProductId) {
    const highlightedProduct = items.find((item) => item.id === highlightedProductId)
    if (highlightedProduct) {
      highlightedCategoryId = highlightedProduct.categoryId
    }
  }

  // Procesar cada categoría: ordenar alfabéticamente pero con producto destacado primero
  Object.keys(grouped).forEach((categoryId) => {
    const categoryItems = grouped[categoryId]
    
    // Separar el producto destacado del resto
    let highlightedItem: ListItem | null = null
    let otherItems: ListItem[] = []
    
    if (highlightedProductId) {
      categoryItems.forEach((item) => {
        if (item.id === highlightedProductId) {
          highlightedItem = item
        } else {
          otherItems.push(item)
        }
      })
    } else {
      otherItems = categoryItems
    }
    
    // Ordenar alfabéticamente (por nombre en español)
    otherItems.sort((a, b) => 
      a.productNameEs.localeCompare(b.productNameEs, 'es', { sensitivity: 'base' })
    )
    
    // Reconstruir: producto destacado primero, luego los ordenados
    if (highlightedItem) {
      grouped[categoryId] = [highlightedItem, ...otherItems]
    } else {
      grouped[categoryId] = otherItems
    }
  })

  // Crear array de categorías: la destacada primero, luego el resto en orden
  let categoriesInFinalOrder: string[]
  if (highlightedCategoryId) {
    const otherCategories = categoryOrder.filter((cat) => cat !== highlightedCategoryId)
    categoriesInFinalOrder = [highlightedCategoryId, ...otherCategories]
  } else {
    categoriesInFinalOrder = categoryOrder
  }

  // Filtrar solo categorías que existen en grouped
  // Mantener el orden final
  return categoriesInFinalOrder
    .filter((categoryId) => grouped[categoryId]?.length > 0)
    .map((categoryId) => [categoryId, grouped[categoryId], highlightedProductId || null])
}
