import type { ListItem, CategoryId } from '../app/domain/types'
import { CategorySection } from './CategorySection'
import { getGroupedAndOrderedProducts } from './grouping'
import { getCategoryById } from '../app/domain/classification'

interface CategorizedProductListProps {
  items: ListItem[]
  onRemoveItem: (id: string) => void
  onUpdateQuantity: (id: string, quantity: number) => void
  onToggleOrderMarked?: (id: string) => void
  onUpdateOrderQuantity?: (id: string, quantity: number) => void
  highlightedCategory?: string | null
  highlightedProductId?: string | null
}

export function CategorizedProductList({
  items,
  onRemoveItem,
  highlightedCategory,
  highlightedProductId,
}: CategorizedProductListProps) {
  if (items.length === 0) {
    return null
  }

  // Obtener productos agrupados y ordenados por categoría
  const groupedAndOrdered = getGroupedAndOrderedProducts(items, highlightedProductId || undefined)

  // Renderizar categorías en el grid (se manejan en el padre como grid)
  return (
    <>
      {groupedAndOrdered.map(([categoryId, categoryItems, newProductId]) => {
        const category = getCategoryById(categoryId as CategoryId)
        if (!category) {
          return null
        }

        const isHighlighted = highlightedCategory === categoryId

        return (
          <CategorySection
            key={categoryId}
            categoryNameEs={category.nameEs}
            categoryNameFr={category.nameFr}
            items={categoryItems}
            onRemoveItem={onRemoveItem}
            onUpdateQuantity={() => {}}
            isHighlighted={isHighlighted}
            categoryId={categoryId as CategoryId}
            newProductId={newProductId}
          />
        )
      })}
    </>
  )
}
