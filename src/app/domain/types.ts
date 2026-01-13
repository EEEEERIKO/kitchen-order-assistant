/**
 * Modelos de Dominio para Lista de Productos Chef
 * Defines the core business entities
 */

/**
 * Identificador único para una categoría
 * Ej: "carnes", "pescados", "verduras"
 */
export type CategoryId = string & { readonly brand: 'CategoryId' }

/**
 * Identificador único para un producto
 * Ej: "pollo", "salmon-fresco", "tomate"
 */
export type ProductId = string & { readonly brand: 'ProductId' }

/**
 * Categoría de producto
 * Agrupa productos relacionados (carnes, verduras, etc.)
 */
export interface Category {
  id: CategoryId
  nameEs: string      // "Carnes"
  nameFr: string      // "Viandes"
  description?: string
}

/**
 * Producto en el diccionario
 * Representa un artículo conocido del sistema
 */
export interface Product {
  id: ProductId
  categoryId: CategoryId
  nameEs: string      // "Pecho de pollo"
  nameFr: string      // "Poitrine de poulet"
  unit: Unit
}

/**
 * Unidad de medida permitida
 * Se usa para especificar cantidad: kg, unidad, litro, etc.
 */
export type Unit = 'kg' | 'g' | 'L' | 'ml' | 'unidad' | 'caja' | 'paquete' | 'bote' | 'lata' | 'docena'

/**
 * Item agregado a una lista de reposición
 * Representa una línea de la lista que el chef quiere reponer
 */
export interface ListItem {
  id: string                    // UUID o identificador único
  productId: ProductId          // Referencia al producto (si existe)
  productNameEs: string         // Nombre como lo ingresó el chef
  categoryId: CategoryId        // Categoría asignada (puede ser "otros")
  categoryNameEs: string        // Nombre de categoría en español
  categoryNameFr: string        // Nombre de categoría en francés
  quantity: number              // 2, 10, 5.5, etc. (cantidad observada)
  unit?: Unit                   // kg, unidad, litro, etc. (opcional para validación)
  productNameFr: string         // Traducción al francés
  isKnown: boolean              // true si existe en diccionario, false si es desconocido
  // Phase 5: Campos de pedido
  isOrderMarked: boolean        // ¿Está marcado para pedir?
  orderQuantity?: number        // Cantidad a pedir (puede ser distinta de quantity)
}

/**
 * Estados de error posibles
 */
export type DomainErrorType =
  | 'PRODUCT_NOT_FOUND'
  | 'CATEGORY_NOT_FOUND'
  | 'INVALID_UNIT'
  | 'INVALID_QUANTITY'

/**
 * Resultado de una operación de dominio
 * Puede ser éxito o fallo con error específico
 */
export type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: DomainErrorType; message: string }

/**
 * Categoría especial para productos no clasificados
 * Se usa cuando el producto no existe en el diccionario
 */
export const UNKNOWN_CATEGORY_ID: CategoryId = 'otros' as CategoryId

/**
 * Utilities para crear identificadores tipados
 */
export function createCategoryId(id: string): CategoryId {
  return id.toLowerCase() as CategoryId
}

export function createProductId(id: string): ProductId {
  return id.toLowerCase() as ProductId
}
