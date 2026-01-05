import { useState } from 'react'

interface ProductFormProps {
  onAddProduct: (productName: string, onDuplicateDetected?: (existingName: string) => void) => string
  onProductAdded?: (productName: string, productId: string) => void
}

/**
 * ProductForm: Minimal form to add products to the list
 * 
 * Features:
 * - Large text input for product name (chef-friendly)
 * - Clear "Add" button
 * - Keyboard support (Enter to submit)
 * - Input validation and feedback
 * - Duplicate detection with visual feedback
 */
export function ProductForm({ onAddProduct, onProductAdded }: ProductFormProps) {
  const [productName, setProductName] = useState('')
  const [error, setError] = useState('')
  const [duplicateMessage, setDuplicateMessage] = useState('')

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

    try {
      const productId = onAddProduct(productName.trim(), handleDuplicateDetected)
      onProductAdded?.(productName.trim(), productId)
      setProductName('')
      setError('')
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
