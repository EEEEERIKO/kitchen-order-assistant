import type { ListItem, CategoryId } from '../app/domain/types'
import { useLanguage } from '../app/i18n/LanguageProvider'
import { getProductName } from '../app/domain/product-names'

interface CategorySectionProps {
  categoryNameEs: string
  categoryNameFr: string
  items: ListItem[]
  onRemoveItem: (id: string) => void
  onUpdateQuantity: (id: string, quantity: number) => void
  onToggleOrderMarked?: (id: string) => void
  onUpdateOrderQuantity?: (id: string, quantity: number) => void
  isHighlighted?: boolean
  categoryId?: CategoryId
  newProductId?: string | null
}
const getCategoryDotColor = (categoryId?: CategoryId): string => {
  const colorMap: Record<string, string> = {
    'carnes': 'bg-primary',
    'verduras': 'bg-success-green',
    'lacteos': 'bg-yellow-500',
    'especias': 'bg-orange-500',
    'bebidas': 'bg-blue-500',
    'otros': 'bg-gray-500',
  }
  return colorMap[categoryId || 'otros'] || 'bg-gray-500'
}

export function CategorySection({
  categoryNameEs,
  categoryNameFr,
  items,
  onRemoveItem,
  isHighlighted = false,
  categoryId,
  newProductId,
}: CategorySectionProps) {
  const { language } = useLanguage()
  const dotColor = getCategoryDotColor(categoryId)

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark overflow-hidden h-fit">
      <div className="bg-gray-50 dark:bg-[#252525] border-b border-gray-200 dark:border-gray-700 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${dotColor} mr-3`}></div>
          <span className="font-bold text-gray-900 dark:text-white mr-3 text-sm uppercase tracking-wide">{categoryNameEs}</span>
          <span className="text-gray-400 italic text-xs font-serif">{categoryNameFr}</span>
        </div>
        <span className="text-xs font-medium text-gray-400 bg-white dark:bg-white/10 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-600">
          {items.length} items
        </span>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group ${
              item.id === newProductId ? 'bg-green-50 dark:bg-green-900/10' : ''
            }`}
          >
            <div className="flex flex-col flex-grow">
              <span className="font-medium text-gray-900 dark:text-white text-sm">{getProductName(item, language)}</span>
              <span className="text-gray-400 dark:text-gray-500 italic text-xs font-serif mt-0.5">
                {language === 'fr' ? item.productNameFr : item.productNameEs}
              </span>
            </div>

            <div className="flex items-center gap-2 ml-4">
              {item.id === newProductId && (
                <span className="inline-block px-2 py-1 bg-success-green text-white text-xs font-bold rounded whitespace-nowrap animate-pulse">
                  NUEVO
                </span>
              )}
              {!item.isKnown && (
                <span className="inline-block px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded whitespace-nowrap">
                  No reconocido
                </span>
              )}
            </div>

            <button
              onClick={() => onRemoveItem(item.id)}
              className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded transition-all opacity-0 group-hover:opacity-100"
              aria-label={`Eliminar ${getProductName(item, language)}`}
              title={`Eliminar ${getProductName(item, language)}`}
            >
              <span className="material-symbols-outlined" style={{fontSize: '18px'}}>close</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
