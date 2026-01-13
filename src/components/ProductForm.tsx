import { useState } from 'react'
import type { Unit } from '../app/domain/types'

interface ProductFormProps {
  onAddProduct: (productName: string, quantity?: number, unit?: Unit, onDuplicateDetected?: (existingName: string) => void) => string
  onProductAdded?: (productName: string, productId: string) => void
}

/**
 * ProductForm: Form to add products to the list with optional quantity and unit
 * 
 * Features:
 * - Large text input for product name (chef-friendly)
 * - Toggle to enable/disable quantity and unit input
 * - Optional quantity and unit fields
 * - Clear "Add" button
 * - Keyboard support (Enter to submit)
 * - Input validation and feedback
 * - Duplicate detection with visual feedback
 */
export function ProductForm({ onAddProduct, onProductAdded }: ProductFormProps) {
  const [productName, setProductName] = useState('')
  const [error, setError] = useState('')
  const [duplicateMessage, setDuplicateMessage] = useState('')
  const [enableQuantity, setEnableQuantity] = useState(false)
  const [quantity, setQuantity] = useState<number>(1)
  const [unit, setUnit] = useState<Unit>('unidad')

  const units: Unit[] = ['kg', 'g', 'L', 'ml', 'unidad', 'caja', 'paquete', 'bote', 'lata', 'docena']

  const handleDuplicateDetected = (existingProductName: string) => {
    setDuplicateMessage(`✓ Cantidad aumentada: ${existingProductName}`)
    setTimeout(() => setDuplicateMessage(''), 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setDuplicateMessage('')

    // Validation
    if (!productName.trim()) {
      setError('El nombre del producto no puede estar vacío')
      return
    }

    if (enableQuantity && quantity <= 0) {
      setError('La cantidad debe ser mayor a 0')
      return
    }

    try {
      const productId = onAddProduct(
        productName.trim(),
        enableQuantity ? quantity : undefined,
        enableQuantity ? unit : undefined,
        handleDuplicateDetected
      )
      onProductAdded?.(productName.trim(), productId)
      setProductName('')
      setError('')
      setEnableQuantity(false)
      setQuantity(1)
      setUnit('unidad')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Error al añadir el producto'
      )
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="pt-4 sm:pt-6">
      <label htmlFor="product-name" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">
        Producto / Produit
      </label>
      <div className="flex flex-col sm:flex-row gap-0 shadow-sm rounded-md overflow-hidden border border-gray-300 dark:border-gray-600 focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-shadow">
        <div className="flex-grow relative bg-white dark:bg-background-dark">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-gray-400" style={{fontSize: '20px'}}>edit_note</span>
          </div>
          <input
            id="product-name"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ej: pecho de pollo, tomates..."
            className="block w-full pl-10 pr-4 py-4 sm:py-3 border-none bg-transparent text-gray-900 dark:text-white placeholder-gray-400 text-base sm:text-sm focus:ring-0"
            autoFocus
          />
        </div>
        <button 
          type="submit"
          className="bg-primary hover:bg-[#0f3a44] dark:bg-white dark:text-primary dark:hover:bg-gray-100 text-white font-medium px-6 sm:px-8 py-4 sm:py-3 transition-colors text-sm uppercase tracking-wider whitespace-nowrap"
        >
          Añadir
        </button>
      </div>

      {/* Toggle para cantidad y unidad */}
      <div className="mt-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="enable-quantity"
          checked={enableQuantity}
          onChange={(e) => setEnableQuantity(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
        />
        <label htmlFor="enable-quantity" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
          Agregar cantidad y unidad ahora
        </label>
      </div>

      {/* Campos de cantidad y unidad (visibles solo si están habilitados) */}
      {enableQuantity && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded flex gap-3 items-end">
          <div className="flex-1">
            <label htmlFor="quantity" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
              Cantidad
            </label>
            <input
              id="quantity"
              type="number"
              step="0.1"
              min="0.1"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="unit" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
              Unidad
            </label>
            <select
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value as Unit)}
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary"
            >
              {units.map(u => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded text-red-800 dark:text-red-200 text-sm">
          {error}
        </div>
      )}

      {duplicateMessage && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded text-blue-800 dark:text-blue-200 text-sm animate-pulse">
          {duplicateMessage}
        </div>
      )}
    </form>
  )
}
