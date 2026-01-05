/**
 * Utilidades de normalización de texto
 * Maneja acentos, mayúsculas, espacios
 * Usado por búsqueda y clasificación de productos
 */

/**
 * Normaliza un string para búsqueda
 * Convierte a minúsculas, elimina acentos, espacios extras
 * Permite buscar "pollo" y encontrar "Pollo", "POLLO", "póllo"
 * 
 * @param text Texto a normalizar
 * @returns Texto normalizado
 */
export function normalizeSearchString(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
    // Normalizar Unicode: NFD = descompone caracteres acentuados
    // Luego eliminar marcas diacríticas (acentos)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Calcula similitud entre dos strings (algoritmo Levenshtein simplificado)
 * Usa distancia de edición para evitar falsos positivos
 * @param s1 Primer string
 * @param s2 Segundo string
 * @returns Similitud de 0 a 1 (1 = idéntico)
 */
export function calculateSimilarity(s1: string, s2: string): number {
  const longer = s1.length > s2.length ? s1 : s2
  const shorter = s1.length > s2.length ? s2 : s1

  if (longer.length === 0) return 1.0

  const editDistance = getEditDistance(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

/**
 * Calcula distancia de edición entre dos strings
 * @internal
 */
function getEditDistance(longer: string, shorter: string): number {
  const costs: number[] = []
  for (let i = 0; i <= shorter.length; i++) {
    let lastValue = i
    for (let j = 0; j <= longer.length; j++) {
      if (i === 0) {
        costs[j] = j
      } else if (j > 0) {
        let newValue = costs[j - 1]
        if (longer.charAt(j - 1) !== shorter.charAt(i - 1)) {
          newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
        }
        costs[j - 1] = lastValue
        lastValue = newValue
      }
    }
    if (i > 0) costs[shorter.length] = lastValue
  }
  return costs[shorter.length]
}
