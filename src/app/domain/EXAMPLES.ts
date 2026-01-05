/**
 * EJEMPLOS DE USO DE LA LÓGICA FASE 2
 * 
 * Este archivo documenta cómo usar la lógica de clasificación
 * en futuras fases de la aplicación.
 * 
 * NOTA: Este archivo es SOLO para documentación.
 * No se compila ni se usa en la app. Los ejemplos están en pseudocódigo
 * para que sea fácil de leer.
 */

// ============================================
// EJEMPLO 1: Clasificar un producto conocido
// ============================================

// const pollo = classifyProduct('Pecho de pollo', 2, 'kg')
// Resultado:
// {
//   id: "1704-abcd",
//   productId: "pecho-de-pollo",
//   productNameEs: "Pecho de pollo",
//   productNameFr: "Poitrine de poulet",
//   categoryId: "carnes",
//   categoryNameEs: "Carnes",
//   categoryNameFr: "Viandes",
//   quantity: 2,
//   unit: "kg",
//   isKnown: true
// }

// ============================================
// EJEMPLO 2: Clasificar un producto desconocido
// ============================================

// const desconocido = classifyProduct(
//   'Ingrediente especial del proveedor X',
//   5,
//   'bote'
// )
// Resultado:
// {
//   id: "1704-efgh",
//   productId: "unknown-1704-...",
//   productNameEs: "Ingrediente especial del proveedor X",
//   productNameFr: "Ingrediente especial del proveedor X",  // SIN traducción
//   categoryId: "otros",
//   categoryNameEs: "Otros",
//   categoryNameFr: "Autres",
//   quantity: 5,
//   unit: "bote",
//   isKnown: false  // ← Marca como pendiente
// }

// ============================================
// EJEMPLO 3: Crear una lista de productos
// ============================================

// function crearListaDeReposicion(entradas: Array<{
//   nombre: string
//   cantidad: number
//   unidad: Unit
// }>): ListItem[] {
//   return entradas.map(({ nombre, cantidad, unidad }) =>
//     classifyProduct(nombre, cantidad, unidad)
//   )
// }
//
// const listaChef = crearListaDeReposicion([
//   { nombre: 'Pecho de pollo', cantidad: 2, unidad: 'kg' },
//   { nombre: 'Salmón fresco', cantidad: 3, unidad: 'kg' },
//   { nombre: 'Tomates maduros', cantidad: 5, unidad: 'kg' },
//   { nombre: 'Producto misterioso', cantidad: 1, unidad: 'unidad' },
// ])

// ============================================
// EJEMPLO 4: Agrupar por categoría
// ============================================

// function agruparPorCategoria(items: ListItem[]): Record<string, ListItem[]> {
//   return items.reduce(
//     (acc, item) => {
//       const key = item.categoryNameEs
//       if (!acc[key]) acc[key] = []
//       acc[key].push(item)
//       return acc
//     },
//     {} as Record<string, ListItem[]>
//   )
// }
//
// const porCategoria = agruparPorCategoria(listaChef)
// Resultado:
// {
//   "Carnes": [{ ... pollo ... }],
//   "Pescados y Mariscos": [{ ... salmón ... }],
//   "Verduras": [{ ... tomates ... }],
//   "Otros": [{ ... desconocido ... }]
// }

// ============================================
// EJEMPLO 5: Generar lista en FRANCÉS (para enviar a proveedor)
// ============================================

// function generarListaEnFrances(items: ListItem[]): string {
//   return items
//     .map(
//       (item) =>
//         `${item.quantity} ${item.unit} - ${item.productNameFr} (${item.categoryNameFr})`
//     )
//     .join('\n')
// }
//
// const listaPara = generarListaEnFrances(listaChef)
// Salida:
// 2 kg - Poitrine de poulet (Viandes)
// 3 kg - Saumon frais (Poissons et Fruits de Mer)
// 5 kg - Tomates mûres (Légumes)
// 1 unidad - Producto misterioso (Autres)

// ============================================
// EJEMPLO 6: Marcar pendientes (productos desconocidos)
// ============================================

// function obtenerPendientes(items: ListItem[]): ListItem[] {
//   return items.filter((item) => !item.isKnown)
// }
//
// const pendientesDeTraduccion = obtenerPendientes(listaChef)
// Resultado:
// [{ ... solo el producto misterioso ... }]

// ============================================
// EJEMPLO 7: Validar antes de guardar (IndexedDB Fase 3)
// ============================================

// function esValida(lista: ListItem[]): boolean {
//   // Todas las cantidades deben ser > 0
//   if (!lista.every((item) => item.quantity > 0)) {
//     return false
//   }
//
//   // Debe haber al menos un producto conocido
//   // (opcional: solo si quieres asegurar calidad)
//   const hayConocidos = lista.some((item) => item.isKnown)
//   return hayConocidos
// }
//
// console.log(esValida(listaChef)) // true

// ============================================
// EJEMPLO 8: Exportar como JSON (para backend Fase 4+)
// ============================================

// const listaJSON = JSON.stringify(listaChef, null, 2)
// Salida:
// {
//   "id": "1704-...",
//   "productId": "pecho-de-pollo",
//   "productNameEs": "Pecho de pollo",
//   ...
// }

// ============================================
// EJEMPLO 9: Usar en un hook React (Fase 3)
// ============================================

/**
 * Hook personalizado para manejar lista de reposición
 * Este será el puente entre dominio y UI
 * 
 * Pseudocódigo - usar como referencia en Fase 3
 */
/*
function useListaReposicion() {
  const [lista, setLista] = useState<ListItem[]>([])

  const agregarProducto = (
    nombre: string,
    cantidad: number,
    unidad: Unit
  ) => {
    try {
      const nuevoItem = classifyProduct(nombre, cantidad, unidad)
      setLista([...lista, nuevoItem])
    } catch (error) {
      // Si hay error de validación, mostrar al usuario
      console.error('Error:', error)
    }
  }

  const remover = (itemId: string) => {
    setLista(lista.filter((item) => item.id !== itemId))
  }

  const porCategoria = agruparPorCategoria(lista)

  return {
    lista,
    agregarProducto,
    remover,
    porCategoria,
    pendientes: obtenerPendientes(lista),
    esValida: esValida(lista),
  }
}

// Uso en componente:
// const { lista, agregarProducto, porCategoria } = useListaReposicion()
// <button onClick={() => agregarProducto('Pollo', 2, 'kg')}>
//   Agregar Pollo
// </button>
// {lista.map(item => <ListItemRow key={item.id} item={item} />)}
*/

// ============================================
// RESUMEN
// ============================================

/**
 * La lógica de Fase 2 permite a Fase 3 (UI):
 * 
 * 1. Recibir entrada del usuario (nombre, cantidad, unidad)
 * 2. Clasificar automáticamente (producto conocido vs desconocido)
 * 3. Obtener traducción automática al francés
 * 4. Generar lista lista para visualización/exportación
 * 5. Validar sin romper la app
 * 
 * TODO ESTO SIN TOCAR EL CÓDIGO DE DOMINIO
 */
