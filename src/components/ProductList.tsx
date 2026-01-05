import type { ListItem } from '../app/domain/types'
import styles from './ProductList.module.css'

interface ProductListProps {
  items: ListItem[]
  onRemoveItem: (id: string) => void
  onUpdateQuantity: (id: string, quantity: number) => void
}

/**
 * ProductList: Display all items in the restocking list
 * 
 * Shows:
 * - Product name in Spanish and French
 * - Category (Spanish and French)
 * - Quantity with increment/decrement controls
 * - Unit
 * - Visual indicator for unknown products
 * - Remove button
 */
export function ProductList({
  items,
  onRemoveItem,
  onUpdateQuantity,
}: ProductListProps) {
  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No hay productos en la lista</p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Lista de reposición ({items.length})
      </h2>
      <div className={styles.list}>
        {items.map((item) => (
          <div
            key={item.id}
            className={`${styles.item} ${
              !item.isKnown ? styles.unknownItem : ''
            }`}
          >
            <div className={styles.productInfo}>
              <div className={styles.productNames}>
                <span className={styles.nameEs}>
                  {item.productNameEs}
                </span>
                <span className={styles.nameFr}>
                  {item.productNameFr}
                </span>
              </div>
              <div className={styles.categoryInfo}>
                <span className={styles.categoryEs}>
                  {item.categoryNameEs}
                </span>
                <span className={styles.categoryFr}>
                  {item.categoryNameFr}
                </span>
              </div>
              {!item.isKnown && (
                <span className={styles.unknownBadge}>
                  Producto no reconocido
                </span>
              )}
            </div>

            <div className={styles.quantityControl}>
              <button
                onClick={() =>
                  onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                className={styles.quantityButton}
                aria-label={`Disminuir cantidad de ${item.productNameEs}`}
              >
                −
              </button>
              <span className={styles.quantityValue}>
                {item.quantity} {item.unit}
              </span>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className={styles.quantityButton}
                aria-label={`Aumentar cantidad de ${item.productNameEs}`}
              >
                +
              </button>
            </div>

            <button
              onClick={() => onRemoveItem(item.id)}
              className={styles.removeButton}
              aria-label={`Eliminar ${item.productNameEs}`}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
