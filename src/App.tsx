import './App.css'
import { useState, useEffect, useMemo, useRef } from 'react'
import { ProductForm } from './components/ProductForm'
import { CategorizedProductList } from './components/CategorizedProductList'
import { LanguageModal } from './components/LanguageModal'
import { generatePDF } from './components/PDFGenerator'
import { useRestockingList, encodeListForSharing, decodeListFromShare } from './components/useRestockingList'
import { classifyProduct } from './app/domain/classification'
import { CATEGORIES } from './app/domain/dictionary'
import type { Unit } from './app/domain/types'

function App() {
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [lastAddedCategory, setLastAddedCategory] = useState<string | null>(null)
  const [lastAddedProductId, setLastAddedProductId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showCredits, setShowCredits] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [shareMessage, setShareMessage] = useState<string | null>(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [shareUrl, setShareUrl] = useState<string>('')
  const mainContentRef = useRef<HTMLDivElement>(null)
  const categoryRefsMap = useRef<Record<string, HTMLDivElement | null>>({})
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Detectar si hay items compartidos en la URL al cargar
  const [sharedItems, setSharedItems] = useState<any[] | null>(() => {
    const params = new URLSearchParams(window.location.search)
    const sharedList = params.get('list')
    
    if (sharedList) {
      try {
        // El parámetro ya viene decodificado por URLSearchParams
        const decoded = decodeListFromShare(sharedList)
        
        if (decoded && Array.isArray(decoded) && decoded.length > 0) {
          // Limpiar el parámetro de la URL para que no interfiera en futuras cargas
          // Usar replaceState para no agregar entrada al historial
          window.history.replaceState({}, document.title, window.location.pathname)
          return decoded
        }
      } catch (error) {
        // Silent fail - return null to start with empty list
      }
    }
    return null
  })

  const {
    items,
    addProduct,
    removeItem,
    updateQuantity,
    toggleOrderMarked,
    updateOrderQuantity,
    getOrderedItems,
    isOrderValid,
    itemCount,
    totalItems,
    clearList,
  } = useRestockingList(sharedItems || undefined)

  // Limpiar el highlight después de 2.5 segundos
  useEffect(() => {
    if (lastAddedCategory) {
      const timer = setTimeout(() => {
        setLastAddedCategory(null)
        setLastAddedProductId(null)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [lastAddedCategory])

  // Scroll al top cuando carga la página
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Cerrar créditos al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (showCredits && !target.closest('[data-credits-container]')) {
        setShowCredits(false)
      }
    }

    if (showCredits) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showCredits])

  // Scroll a la categoría seleccionada con animación
  useEffect(() => {
    if (selectedCategory !== 'all' && categoryRefsMap.current[selectedCategory]) {
      const element = categoryRefsMap.current[selectedCategory]
      if (element) {
        // Esperar a que el DOM se actualice y hacer scroll con offset
        const timer = setTimeout(() => {
          const headerOffset = 120 // altura del navbar
          const elementPosition = element.getBoundingClientRect().top + window.scrollY
          const offsetPosition = elementPosition - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }, 100)
        return () => clearTimeout(timer)
      }
    }
  }, [selectedCategory])

  const handleProductAdded = (productName: string, productId: string) => {
    try {
      const classified = classifyProduct(productName, 1, 'u' as Unit)
      if (classified && 'categoryId' in classified) {
        setLastAddedCategory(classified.categoryId)
        setLastAddedProductId(productId)
      }
    } catch {
      // Producto no clasificable, dejar sin categoría especial
    }
  }

  // Calcular categorías con conteos
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    items.forEach(item => {
      if (!counts[item.categoryId]) counts[item.categoryId] = 0
      counts[item.categoryId]++
    })
    return counts
  }, [items])

  // Filtrar items por búsqueda (pero NO por categoría - mostrar todas si está en grid)
  const filteredItems = useMemo(() => {
    let filtered = items
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(item => 
        item.productNameEs.toLowerCase().includes(query) ||
        item.productNameFr.toLowerCase().includes(query)
      )
    }
    
    return filtered
  }, [items, searchQuery])

  const getCategoryColor = (categoryId: string): string => {
    const colorMap: Record<string, string> = {
      'carnes': 'bg-primary',
      'pescados': 'bg-blue-500',
      'verduras': 'bg-success-green',
      'frutas': 'bg-orange-400',
      'lacteos': 'bg-yellow-500',
      'especias': 'bg-orange-600',
      'bebidas': 'bg-blue-400',
      'otros': 'bg-gray-500',
    }
    return colorMap[categoryId] || 'bg-gray-500'
  }

  // Función para hacer scroll a una categoría
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId)
    
    // Si es "all", no hacer scroll
    if (categoryId === 'all') return
    
    // Hacer scroll inmediatamente sin depender del useEffect
    setTimeout(() => {
      const element = categoryRefsMap.current[categoryId]
      if (element) {
        const headerOffset = 120
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }, 50)
  }

  // Función para compartir la lista
  const handleShareList = async () => {
    if (items.length === 0) {
      setShareMessage('La lista está vacía, agrega productos para compartir')
      setTimeout(() => setShareMessage(null), 3000)
      return
    }

    try {
      const encoded = encodeListForSharing(items)
      // Usar window.location para construir la URL completa dinámicamente
      // Esto funciona tanto en localhost como en producción
      const baseUrl = window.location.origin + window.location.pathname.split('?')[0]
      // CRITICAL: URL-encode the parameter so special characters are properly handled
      const longUrl = `${baseUrl}?list=${encodeURIComponent(encoded)}`
      
      // Acortar URL con TinyURL API
      try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`)
        const shortUrl = await response.text()
        
        if (shortUrl && !shortUrl.includes('error')) {
          setShareUrl(shortUrl)
        } else {
          // Si falla, usar la URL larga como fallback
          setShareUrl(longUrl)
        }
      } catch {
        // Si falla la API de acortamiento, usar URL larga
        setShareUrl(longUrl)
      }
      
      setShowShareModal(true)
    } catch (error) {
      setShareMessage('Error al generar el enlace')
      setTimeout(() => setShareMessage(null), 3000)
    }
  }

  // Copiar URL al portapapeles
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setShareMessage('¡Enlace acortado copiado!')
      setTimeout(() => setShareMessage(null), 2000)
    } catch (err) {
      setShareMessage('Error al copiar el enlace')
      setTimeout(() => setShareMessage(null), 2000)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark w-screen">
      {/* Navbar - Full Width */}
      <nav className="sticky top-0 z-50 bg-white/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-border-light dark:border-border-dark shadow-sm w-full">
        <div className="w-full px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 sm:h-20 items-center">
            <div className="flex items-center space-x-4 sm:space-x-8">
              <a className="flex items-center space-x-3 group" href="#">
                <img src="/images/descarga.png" alt="Le Rendez-Vous" className="h-14 sm:h-20 group-hover:opacity-80 transition-opacity" />
              </a>
              <div className="hidden md:flex space-x-8 pl-8 border-l border-gray-200 dark:border-gray-700 ml-4 h-8 items-center">
                <a className="text-primary dark:text-white font-medium hover:opacity-70 transition-opacity border-b-2 border-primary dark:border-white" href="#">Panel</a>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              {/* Menu button (mobile only) */}
              <button 
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                title="Menú"
              >
                <span className="material-symbols-outlined font-light">menu</span>
              </button>
              
              {/* Search button */}
              <button 
                onClick={() => searchInputRef.current?.focus()}
                className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors"
                title="Buscar productos"
              >
                <span className="material-symbols-outlined font-light">search</span>
              </button>
              
              {/* Credits button */}
              <div className="relative" data-credits-container>
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowCredits(!showCredits)
                  }}
                  className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors relative"
                  title="Información del desarrollador"
                >
                  <span className="material-symbols-outlined font-light">info</span>
                </button>
                
                {/* Credits dropdown */}
                {showCredits && (
                  <div 
                    className="absolute right-0 mt-2 w-80 bg-white dark:bg-surface-dark rounded-lg shadow-lg border border-border-light dark:border-border-dark p-6 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="font-display text-lg font-bold text-primary dark:text-white mb-3">Creado Por</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <span className="font-semibold">Erik Valencia Cardona</span>
                    </p>
                    <div className="flex gap-4">
                      <a 
                        href="https://www.linkedin.com/in/erikodev/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors text-sm"
                      >
                        <span className="material-symbols-outlined text-lg">open_in_new</span>
                        LinkedIn
                      </a>
                      <a 
                        href="https://www.instagram.com/eriko_vc/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded font-medium transition-colors text-sm"
                      >
                        <span className="material-symbols-outlined text-lg">open_in_new</span>
                        Instagram
                      </a>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Share button */}
              <button 
                onClick={handleShareList}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors ml-1 sm:ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-surface-dark"
                title="Compartir lista"
              >
                <span className="material-symbols-outlined text-lg font-light">share</span>
                <span className="text-xs sm:text-sm font-medium hidden sm:inline">Compartir Lista</span>
              </button>

              {/* Share message toast */}
              {shareMessage && (
                <div className="absolute right-4 top-24 bg-success-green text-white px-4 py-2 rounded-md shadow-lg text-sm animate-pulse">
                  {shareMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <LanguageModal
        isOpen={showLanguageModal}
        onSelectLanguage={(language) => {
          setShowLanguageModal(false)
          generatePDF(items, language, lastAddedProductId || undefined)
        }}
        onClose={() => setShowLanguageModal(false)}
      />

      {/* Mobile Menu Drawer */}
      {showMobileMenu && (
        <div className="fixed inset-0 top-16 z-40 md:hidden bg-black/50" onClick={() => setShowMobileMenu(false)}>
          <div 
            className="absolute inset-y-0 left-0 w-72 bg-white dark:bg-background-dark shadow-xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 space-y-6">
              <div>
                <h2 className="font-display text-lg font-bold mb-3 text-primary dark:text-white">Categorías</h2>
                <nav className="space-y-1">
                  <button 
                    onClick={() => {
                      handleCategoryClick('all')
                      setShowMobileMenu(false)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                      selectedCategory === 'all' 
                        ? 'bg-primary/5 text-primary dark:bg-white/10 dark:text-white' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                    }`}
                  >
                    <span>Todos / Tous</span>
                    <span className={`${selectedCategory === 'all' ? 'bg-primary/10 dark:bg-white/20 text-primary dark:text-white' : 'bg-gray-100 dark:bg-gray-700/50 text-gray-400'} py-0.5 px-2 rounded-full text-xs transition-colors`}>{itemCount}</span>
                  </button>
                  {Object.values(CATEGORIES).map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        handleCategoryClick(cat.id)
                        setShowMobileMenu(false)
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                        selectedCategory === cat.id
                          ? 'bg-primary/5 text-primary dark:bg-white/10 dark:text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                      }`}
                    >
                      <span>{cat.nameEs}</span>
                      <span className={`${selectedCategory === cat.id ? 'bg-primary/10 dark:bg-white/20 text-primary dark:text-white' : 'bg-gray-100 dark:bg-gray-700/50 text-gray-400'} py-0.5 px-2 rounded-full text-xs transition-colors`}>
                        {categoriesWithCounts[cat.id] || 0}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content with Sidebar - Full Width */}
      <main className="flex-grow w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col md:flex-row gap-6 md:gap-8 pb-32">
        {/* Sidebar */}
        <aside className="hidden md:block w-full md:w-64 flex-shrink-0">
          <div className="sticky top-24 max-h-[calc(100vh-120px-120px)] overflow-y-auto space-y-8">
            {/* Categories */}
            <div>
              <h2 className="font-display text-xl font-bold mb-4 text-primary dark:text-white">Categorías</h2>
              <nav className="space-y-1">
                <button 
                  onClick={() => handleCategoryClick('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                    selectedCategory === 'all' 
                      ? 'bg-primary/5 text-primary dark:bg-white/10 dark:text-white' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                  }`}
                >
                  <span>Todos / Tous</span>
                  <span className={`${selectedCategory === 'all' ? 'bg-primary/10 dark:bg-white/20 text-primary dark:text-white' : 'bg-gray-100 dark:bg-gray-700/50 text-gray-400'} py-0.5 px-2 rounded-full text-xs transition-colors`}>{itemCount}</span>
                </button>
                {Object.values(CATEGORIES).map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-primary/5 text-primary dark:bg-white/10 dark:text-white'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                    }`}
                  >
                    <span>{cat.nameEs}</span>
                    <span className={`${selectedCategory === cat.id ? 'bg-primary/10 dark:bg-white/20 text-primary dark:text-white' : 'bg-gray-100 dark:bg-gray-700/50 text-gray-400'} py-0.5 px-2 rounded-full text-xs transition-colors`}>
                      {categoriesWithCounts[cat.id] || 0}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Add - Search */}
            <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg border border-border-light dark:border-border-dark shadow-sm">
              <h3 className="font-display font-bold text-lg mb-3 text-primary dark:text-white">Búsqueda Rápida</h3>
              <div className="flex flex-col gap-3">
                <input 
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar productos..."
                  className="block w-full text-sm border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-background-dark dark:text-white py-2 px-3"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-grow space-y-6" ref={mainContentRef}>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2 text-primary dark:text-white">Lista de Reposición</h1>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-xs tracking-wide uppercase font-medium">Panel del Chef Ejecutivo</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <span className="text-xs text-gray-400 uppercase tracking-wider block">Fecha</span>
              <div className="text-sm font-medium dark:text-white">{new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
            </div>
          </div>

          {/* Quick Add Form */}
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-sm border border-border-light dark:border-border-dark">
            <ProductForm 
              onAddProduct={addProduct}
              onProductAdded={handleProductAdded}
            />
          </div>

          {/* Title Section */}
          {filteredItems.length > 0 && (
            <div className="flex items-center justify-between pt-2">
              <h2 className="font-display text-2xl font-bold text-primary dark:text-white">
                Lista Actual <span className="text-lg font-normal text-gray-400 ml-2">({filteredItems.length} productos)</span>
              </h2>
              <button 
                onClick={() => {
                  if (confirm('¿Estás seguro de que deseas limpiar toda la lista? Esta acción no se puede deshacer.')) {
                    clearList()
                  }
                }}
                className="text-xs font-medium text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors uppercase tracking-wider flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">delete_sweep</span>
                Limpiar Todo
              </button>
            </div>
          )}

          {/* Categories Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              <CategoryGridAll 
                items={filteredItems}
                onRemoveItem={removeItem}
                highlightedCategory={lastAddedCategory}
                highlightedProductId={lastAddedProductId}
                categoryRefsMap={categoryRefsMap}
                selectedCategory={selectedCategory}
              />
            </div>
          ) : (
            <div className="bg-surface-light dark:bg-surface-dark p-12 rounded-lg border border-border-light dark:border-border-dark text-center">
              <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mx-auto block mb-4">inbox</span>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
                {searchQuery ? 'No se encontraron productos' : 'No hay productos aún'}
              </p>
              <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm mt-2">
                {searchQuery ? 'Intenta con otros términos de búsqueda' : 'Comienza agregando productos a tu lista'}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer Button - Full Width */}
      {items.length > 0 && (
        <div className="sticky bottom-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur border-t border-border-light dark:border-border-dark py-3 sm:py-4 px-3 sm:px-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40 w-full">
          <div className="w-full px-3 sm:px-6 lg:px-8 flex justify-end">
            <button 
              onClick={() => setShowLanguageModal(true)}
              className="w-full sm:w-auto bg-success-green hover:bg-[#244a44] text-white font-medium py-3 px-6 sm:px-8 rounded shadow-md transition-colors flex items-center justify-center space-x-2 sm:space-x-3 uppercase tracking-wide text-xs sm:text-sm"
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">print</span>
              <span className="hidden sm:inline">Descargar Lista de Reposición</span>
              <span className="sm:hidden">Descargar PDF</span>
            </button>
          </div>
        </div>
      )}

      {/* Footer - Full Width */}
      <footer className="py-8 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-background-dark w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-text-secondary-light dark:text-text-secondary-dark">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <span className="font-display font-bold text-base text-primary dark:text-white tracking-widest">LE RENDEZ-VOUS</span>
            <span className="mx-2 text-gray-300">|</span>
            <span>© 2026 Aplicación de Gestión Culinaria</span>
          </div>
          <div className="flex space-x-6">
            <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Privacidad</a>
            <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Términos</a>
            <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Soporte</a>
          </div>
        </div>
      </footer>

      {/* Share Modal */}
      {showShareModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4"
          onClick={() => setShowShareModal(false)}
        >
          <div 
            className="bg-white dark:bg-surface-dark rounded-lg shadow-2xl max-w-md w-full p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">share</span>
              <h3 className="text-lg font-bold text-primary dark:text-white">Compartir Lista</h3>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              Copia este enlace y comparte con otros para que puedan ver tu lista:
            </p>

            {/* URL Display Box */}
            <div className="bg-gray-100 dark:bg-background-dark border border-gray-300 dark:border-border-dark rounded p-3 mb-4">
              <p 
                className="text-xs text-gray-700 dark:text-gray-300 font-mono leading-relaxed overflow-y-auto max-h-24 break-all cursor-text select-all"
                onClick={(e) => {
                  const selection = window.getSelection()
                  const range = document.createRange()
                  range.selectNodeContents(e.currentTarget)
                  selection?.removeAllRanges()
                  selection?.addRange(range)
                }}
                title="Haz clic para seleccionar todo"
              >
                {shareUrl}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-primary hover:bg-primary/90 text-white rounded font-medium transition-colors text-sm"
              >
                <span className="material-symbols-outlined text-lg">content_copy</span>
                <span className="hidden sm:inline">Copiar</span>
                <span className="sm:hidden">Copiar Enlace</span>
              </button>
              <button
                onClick={() => {
                  if (shareUrl) {
                    window.open(shareUrl, '_blank')
                  }
                }}
                className="flex-1 sm:flex-none px-4 py-3 sm:py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-medium transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <span className="material-symbols-outlined text-lg">open_in_new</span>
                <span className="hidden sm:inline">Abrir</span>
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="flex-1 sm:flex-none px-4 py-3 sm:py-2 bg-gray-200 dark:bg-surface-dark hover:bg-gray-300 dark:hover:bg-background-dark text-gray-700 dark:text-gray-300 rounded font-medium transition-colors text-sm"
              >
                Cerrar
              </button>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              📱 La otra persona solo necesita abrir el enlace para cargar tu lista en su dispositivo.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper component para renderizar categorías en grid
function CategoryGridAll({ 
  items, 
  onRemoveItem, 
  highlightedCategory, 
  highlightedProductId,
  categoryRefsMap,
  selectedCategory
}: any) {
  const { groupedByCategory } = useMemo(() => {
    const grouped: Record<string, any[]> = {}
    items.forEach((item: any) => {
      if (!grouped[item.categoryId]) grouped[item.categoryId] = []
      grouped[item.categoryId].push(item)
    })
    return { groupedByCategory: grouped }
  }, [items])

  return (
    <>
      {Object.entries(groupedByCategory).map(([catId, catItems]: [string, any[]]) => (
        <div 
          key={catId}
          ref={(el) => { if (el) categoryRefsMap.current[catId] = el }}
          className={`animate-in fade-in slide-in-from-bottom-4 duration-300 ${
            selectedCategory === catId ? 'ring-2 ring-primary dark:ring-white' : ''
          }`}
        >
          <CategorySection
            categoryId={catId}
            items={catItems}
            onRemoveItem={onRemoveItem}
            isHighlighted={highlightedCategory === catId || selectedCategory === catId}
            highlightedProductId={highlightedProductId}
          />
        </div>
      ))}
    </>
  )
}

function CategorySection({ categoryId, items, onRemoveItem, isHighlighted, highlightedProductId }: any) {
  const colorMap: Record<string, string> = {
    'carnes': 'bg-primary',
    'pescados': 'bg-blue-500',
    'verduras': 'bg-success-green',
    'frutas': 'bg-orange-400',
    'lacteos': 'bg-yellow-500',
    'especias': 'bg-orange-600',
    'bebidas': 'bg-blue-400',
    'otros': 'bg-gray-500',
  }
  const dotColor = colorMap[categoryId] || 'bg-gray-500'

  const category = Object.values(CATEGORIES).find(c => c.id === categoryId)
  if (!category) return null

  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark overflow-hidden h-fit">
      <div className="bg-gray-50 dark:bg-[#252525] border-b border-gray-200 dark:border-gray-700 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full ${dotColor} mr-3`}></div>
          <span className="font-bold text-gray-900 dark:text-white mr-3 text-sm uppercase tracking-wide">{category.nameEs}</span>
          <span className="text-gray-400 italic text-xs font-serif">{category.nameFr}</span>
        </div>
        <span className="text-xs font-medium text-gray-400 bg-white dark:bg-white/10 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-600">
          {items.length} items
        </span>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {items.map((item: any) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group ${
              item.id === highlightedProductId ? 'bg-green-50 dark:bg-green-900/10 border-l-4 border-success-green' : ''
            }`}
          >
            <div className="flex flex-col flex-grow">
              <span className="font-medium text-gray-900 dark:text-white text-sm">{item.productNameEs}</span>
              <span className="text-gray-400 dark:text-gray-500 italic text-xs font-serif mt-0.5">{item.productNameFr}</span>
            </div>

            <div className="flex items-center gap-2 ml-4">
              {item.id === highlightedProductId && (
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
              className="w-6 h-6 flex items-center justify-center text-gray-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded transition-all opacity-0 group-hover:opacity-100 ml-2"
            >
              <span className="material-symbols-outlined" style={{fontSize: '18px'}}>close</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

