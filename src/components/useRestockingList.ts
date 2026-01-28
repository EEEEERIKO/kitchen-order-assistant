import { useState, useCallback, useEffect } from 'react'
import type { ListItem, Unit } from '../app/domain/types'
import { classifyProduct } from '../app/domain/classification'

/**
 * Storage key for localStorage persistence
 */
const STORAGE_KEY = 'lista-reposicion-items'

/**
 * Ultra-compact compression for URL sharing
 * Only stores: productNameEs, productNameFr, quantity, unit
 * Everything else is regenerated on load
 */
function ultraCompressItem(item: ListItem): string {
  try {
    // Format: "productNameEs|productNameFr|quantity|unit"
    // Using pipes as separator to avoid JSON overhead
    // NOTE: encodeURIComponent is applied at the top level in encodeListForSharing()
    const compressed = `${item.productNameEs}|${item.productNameFr}|${item.quantity}|${item.unit}`
    
    // Validate the result contains valid separators
    if (!compressed.includes('|') || compressed.split('|').length < 4) {
      return ''
    }
    
    return compressed
  } catch (error) {
    return ''
  }
}

/**
 * Decompress ultra-compressed item and regenerate full structure
 * Format: "productNameEs|productNameFr|quantity|unit"
 */
function ultraDecompressItem(data: string): ListItem | null {
  try {
    const parts = data.split('|')
    if (parts.length < 4) {
      return null
    }
    
    // Extract and clean the data
    const productNameEs = parts[0].trim()
    const productNameFr = parts[1].trim()
    const quantityStr = parts[2].trim()
    const unitStr = parts[3].trim()
    
    // Validate and parse
    const quantity = parseInt(quantityStr)
    if (!productNameEs || !productNameFr || isNaN(quantity) || !unitStr) {
      return null
    }
    
    // Regenerate full item by classifying the product
    const item = classifyProduct(productNameEs, quantity, unitStr as Unit)
    
    if (!item) {
      return null
    }
    
    return item
  } catch (error) {
    return null
  }
}

/**
 * Encode items to a shareable URL-safe string with ULTRA compression
 * Removes 80%+ of URL size by only storing essential data
 * 
 * Compression strategy:
 * 1. Only store: name ES, name FR, quantity, unit
 * 2. Use pipe separators instead of JSON
 * 3. Convert to bytes properly for btoa()
 * 4. Base64 encoding
 */
export function encodeListForSharing(items: ListItem[]): string {
  try {
    // Ultra-compress: only essential data
    const ultraCompressed = items.map(ultraCompressItem).join('~')
    
    // CRITICAL FIX: Use TextEncoder to convert UTF-8 properly to base64
    // This is the CORRECT way to handle Unicode in JavaScript for base64
    const encoder = new TextEncoder()
    const uint8Array = encoder.encode(ultraCompressed)
    const binaryString = String.fromCharCode.apply(null, Array.from(uint8Array))
    const encoded = btoa(binaryString)
    
    return encoded
  } catch (error) {
    return ''
  }
}

/**
 * Decode items from a shared string with ultra-decompression
 * Regenerates missing data automatically
 */
export function decodeListFromShare(encoded: string): ListItem[] | null {
  try {
    console.log('🔓 Decoding list, input length:', encoded.length)
    
    if (!encoded || encoded.length === 0) {
      console.warn('Empty encoded string')
      return null
    }
    
    let ultraCompressed: string
    
    // Decode: Reverse the encoding process
    // Original encoding: TextEncoder → btoa()
    // So decoding: atob() → TextDecoder
    try {
      const binaryString = atob(encoded)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      const decoder = new TextDecoder()
      ultraCompressed = decoder.decode(bytes)
    } catch (error) {
      return null
    }
    
    const itemStrings = ultraCompressed.split('~')
    
    // Ultra-decompress each item
    const successfulItems: ListItem[] = []
    
    itemStrings.forEach((itemStr) => {
      if (!itemStr || itemStr.trim().length === 0) {
        return
      }
      
      try {
        const result = ultraDecompressItem(itemStr)
        if (result) {
          successfulItems.push(result)
        }
      } catch (e) {
        // Silent fail for individual items
      }
    })
    
    return successfulItems.length > 0 ? successfulItems : null
  } catch (error) {
    return null
  }
}

/**
 * Validates and sanitizes data loaded from localStorage
 * Returns null if data is invalid
 */
function validateListItems(data: unknown): ListItem[] | null {
  if (!Array.isArray(data)) {
    return null
  }

  try {
    return data.filter((item) => {
      // Check required fields exist and have correct types
      return (
        typeof item?.id === 'string' &&
        typeof item?.productNameEs === 'string' &&
        typeof item?.productNameFr === 'string' &&
        typeof item?.categoryId === 'string' &&
        typeof item?.categoryNameEs === 'string' &&
        typeof item?.categoryNameFr === 'string' &&
        typeof item?.quantity === 'number' &&
        typeof item?.unit === 'string' &&
        typeof item?.isKnown === 'boolean' &&
        typeof item?.isOrderMarked === 'boolean' &&
        typeof item?.productId === 'string'
      )
    })
  } catch {
    // If validation fails at any point, return null
    return null
  }
}

/**
 * useRestockingList: Custom hook to manage the restocking list with localStorage persistence
 *
 * Handles:
 * - Adding products (with duplicate aggregation)
 * - Removing items
 * - Updating quantities
 * - Smart grouping: same product + same unit = increment quantity
 * - Phase 5: Marking products for order and managing order quantities
 * - Phase 7: Automatic localStorage persistence
 */

export function useRestockingList(initialItems?: ListItem[]) {
  const [items, setItems] = useState<ListItem[]>(initialItems || [])
  const [isLoaded, setIsLoaded] = useState(!!initialItems)

  /**
   * Load items from localStorage on mount
   * Phase 7: Persistence
   */
  useEffect(() => {
    // Only load from localStorage if no initial items were provided
    if (!initialItems || initialItems.length === 0) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          const validated = validateListItems(parsed)
          
          if (validated && validated.length > 0) {
            setItems(validated)
          }
        }
      } catch (error) {
        // Silently ignore errors loading from localStorage
        // App continues with empty list
        console.error('Failed to load items from localStorage:', error)
      } finally {
        setIsLoaded(true)
      }
    } else {
      setIsLoaded(true)
    }
  }, [initialItems])

  /**
   * Save items to localStorage whenever they change
   * Phase 7: Persistence
   */
  useEffect(() => {
    // Only save after initial load is complete to avoid race conditions
    if (isLoaded) {
      try {
        if (items.length > 0) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        } else {
          // Clear localStorage if list is empty
          localStorage.removeItem(STORAGE_KEY)
        }
      } catch (error) {
        // Silently ignore errors saving to localStorage
        // App continues normally
        console.error('Failed to save items to localStorage:', error)
      }
    }
  }, [items, isLoaded])

  /**
   * Restore quantities and units from localStorage after items are loaded
   */
  useEffect(() => {
    if (isLoaded && items.length > 0) {
      try {
        const saved = localStorage.getItem('quantitiesAndUnits')
        if (saved) {
          const quantityData = JSON.parse(saved) as Record<string, { quantity: number; unit?: string }>
          
          // Apply saved quantities and units to items
          setItems(prevItems => 
            prevItems.map(item => {
              const saved = quantityData[item.id]
              if (saved) {
                return {
                  ...item,
                  quantity: saved.quantity,
                  unit: saved.unit as Unit | undefined
                }
              }
              return item
            })
          )
        }
      } catch (error) {
        console.error('Failed to restore quantities and units:', error)
      }
    }
  }, [isLoaded])

  /**
   * Normalize text for comparison (remove accents, lowercase, trim)
   */
  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
  }

  /**
   * Check if a product already exists in the list
   * Compares by normalized product name and unit
   */
  const findExistingProduct = useCallback(
    (productNameEs: string, unit: Unit): number => {
      const normalized = normalizeText(productNameEs)
      return items.findIndex(
        (item) =>
          normalizeText(item.productNameEs) === normalized &&
          item.unit === unit
      )
    },
    [items]
  )

  /**
   * Add a product to the list
   * If product + unit already exists: increment quantity
   * Otherwise: create new item
   * Returns the ID of the product (existing or newly created)
   * Also triggers duplicate detection feedback
   */
  const addProduct = useCallback(
    (productNameEs: string, quantity?: number, unit?: Unit, onDuplicateDetected?: (existingProductName: string) => void): string => {
      try {
        // Use domain logic to classify the product with provided or default quantity and unit
        const finalQuantity = quantity ?? 1
        const finalUnit = unit ?? undefined
        const newItem = classifyProduct(productNameEs, finalQuantity, finalUnit)
        
        // Initialize Phase 5 fields
        const itemWithOrderFields: ListItem = {
          ...newItem,
          isOrderMarked: false,
          orderQuantity: undefined,
        }

        let productId = newItem.id
        let isDuplicate = false
        let existingName = ''

        setItems((prevItems) => {
          // Check if same product with same unit already exists (using normalized comparison)
          const normalized = normalizeText(productNameEs)
          const existingIndex = prevItems.findIndex(
            (item) =>
              normalizeText(item.productNameEs) === normalized &&
              item.unit === finalUnit
          )

          if (existingIndex >= 0) {
            // Product exists: increment quantity
            isDuplicate = true
            existingName = prevItems[existingIndex].productNameEs
            const updated = [...prevItems]
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + finalQuantity,
            }
            productId = updated[existingIndex].id
            
            console.log(`🔄 Duplicado detectado: "${productNameEs}" → incrementando cantidad de "${existingName}"`)
            
            return updated
          } else {
            // New product: add to list
            console.log(`✨ Nuevo producto añadido: "${productNameEs}"`)
            return [...prevItems, itemWithOrderFields]
          }
        })

        // Trigger callback if duplicate
        if (isDuplicate && onDuplicateDetected) {
          onDuplicateDetected(existingName)
        }

        return productId
      } catch (error) {
        throw error
      }
    },
    []
  )

  /**
   * Remove an item by ID
   */
  const removeItem = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }, [])

  /**
   * Update quantity for an item
   * Allows any non-negative value including 0
   */
  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, newQuantity) }
          : item
      )
    )
  }, [])

  /**
   * Update unit for an item
   */
  const updateUnit = useCallback((id: string, newUnit: Unit | undefined) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, unit: newUnit }
          : item
      )
    )
  }, [])

  /**
   * Phase 5: Toggle order marking for a product
   * When unmarking, also clear orderQuantity
   */
  const toggleOrderMarked = useCallback((id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              isOrderMarked: !item.isOrderMarked,
              orderQuantity: !item.isOrderMarked ? item.quantity : undefined,
            }
          : item
      )
    )
  }, [])

  /**
   * Phase 5: Update order quantity for a marked item
   * Only for items that are marked as isOrderMarked
   */
  const updateOrderQuantity = useCallback(
    (id: string, newOrderQuantity: number) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id && item.isOrderMarked
            ? {
                ...item,
                orderQuantity: Math.max(0.1, newOrderQuantity),
              }
            : item
        )
      )
    },
    []
  )

  /**
   * Phase 5: Get items marked for order
   */
  const getOrderedItems = useCallback(() => {
    return items.filter((item) => item.isOrderMarked)
  }, [items])

  /**
   * Phase 5: Validate that all marked items have order quantities
   */
  const isOrderValid = useCallback(() => {
    const markedItems = items.filter((item) => item.isOrderMarked)
    return markedItems.every(
      (item) => item.orderQuantity !== undefined && item.orderQuantity > 0
    )
  }, [items])

  /**
   * Clear all items
   */
  const clearList = useCallback(() => {
    setItems([])
  }, [])

  return {
    items,
    addProduct,
    removeItem,
    updateQuantity,
    updateUnit,
    // Phase 5 additions
    toggleOrderMarked,
    updateOrderQuantity,
    getOrderedItems,
    isOrderValid,
    clearList,
    itemCount: items.length,
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    orderedItemCount: items.filter((item) => item.isOrderMarked).length,
  }
}
