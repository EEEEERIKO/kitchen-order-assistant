/**
 * Servicio de Traducción Automática
 * Soporta traducción automática sin dependencias externas
 * Usa un diccionario local + estrategia de similitud para productos desconocidos
 */

import { PRODUCTS } from './dictionary'

/**
 * Intenta traducir un texto español a francés
 * Primero busca en el diccionario, luego usa estrategias alternativas
 * 
 * @param textEs Texto en español
 * @returns Texto traducido al francés
 */
export async function translateText(textEs: string): Promise<string> {
  // 1. Si está exactamente en el diccionario, devolver traducción conocida
  const knownProduct = Object.values(PRODUCTS).find(
    (p) => p.nameEs.toLowerCase() === textEs.toLowerCase()
  )
  if (knownProduct) {
    return knownProduct.nameFr
  }

  // 2. Si la librería de traducción está disponible (instalada posteriormente), usarla
  try {
    const translated = await tryGoogleTranslate(textEs)
    if (translated) return translated
  } catch (error) {
    console.warn('Google Translate unavailable, using fallback', error)
  }

  // 3. Fallback: Buscar palabras individuales en el diccionario
  return translateUsingDictionary(textEs)
}

/**
 * Intenta usar Google Translate API si está disponible
 * @internal
 */
async function tryGoogleTranslate(text: string): Promise<string | null> {
  try {
    // Intenta importar la librería dinámicamente
    // Si no está instalada, falla gracefully
    // Usando require para evitar que Vite intente resolver en build time
    const moduleName = 'google-translate-api-x'
    let translate: any = null
    
    try {
      // Usando función indirecta para que Vite no lo detecte
      const dynamicImport = new Function('moduleName', 'return import(moduleName)')
      const module = await dynamicImport(moduleName)
      translate = module.translate
    } catch {
      // Módulo no disponible, usaremos diccionario local
      return null
    }
    
    if (!translate) return null
    const result = await translate({
      text,
      from: 'es',
      to: 'fr',
    })
    return result.text
  } catch (error) {
    // Google Translate API no disponible
    return null
  }
}

/**
 * Estrategia de traducción usando diccionario local
 * Traduce palabras individuales y clave
 * @internal
 */
function translateUsingDictionary(textEs: string): string {
  const lowerText = textEs.toLowerCase()

  // Diccionario de palabras comunes para traducción manual
  const commonWords: Record<string, string> = {
    // Artículos
    'el': 'le',
    'la': 'la',
    'los': 'les',
    'las': 'les',
    'un': 'un',
    'una': 'une',
    'unos': 'uns',
    'unas': 'unes',

    // Preposiciones
    'de': 'de',
    'con': 'avec',
    'sin': 'sans',
    'por': 'par',
    'para': 'pour',
    'en': 'en',
    'entre': 'entre',
    'desde': 'depuis',
    'hasta': 'jusqu\'à',

    // Adjetivos comunes
    'fresco': 'frais',
    'fresca': 'fraîche',
    'frescos': 'frais',
    'frescas': 'fraîches',
    'molido': 'moulu',
    'molida': 'moulue',
    'molidos': 'moulus',
    'molidas': 'moulues',
    'entero': 'entier',
    'entera': 'entière',
    'enteros': 'entiers',
    'enteras': 'entières',
    'blanco': 'blanc',
    'blanca': 'blanche',
    'blancos': 'blancs',
    'blancas': 'blanches',
    'negro': 'noir',
    'negra': 'noire',
    'negros': 'noirs',
    'negras': 'noires',
    'virgen': 'vierge',
    'extra': 'extra',

    // Verbos
    'triturado': 'concassé',
    'deshidratada': 'déshydratée',
    'marinado': 'mariné',
    'ahumado': 'fumé',

    // Alimentos específicos
    'pollo': 'poulet',
    'res': 'bœuf',
    'cerdo': 'porc',
    'pavo': 'dinde',
    'pato': 'canard',
    'cordero': 'agneau',
    'ternera': 'veau',
    'carne': 'viande',

    'pescado': 'poisson',
    'salmon': 'saumon',
    'salmón': 'saumon',
    'bacalao': 'morue',
    'trucha': 'truite',
    'lubina': 'bar',
    'camarones': 'crevettes',
    'camarón': 'crevette',

    'verdura': 'légume',
    'verduras': 'légumes',
    'cebolla': 'oignon',
    'cebollas': 'oignons',
    'ajo': 'ail',
    'tomate': 'tomate',
    'tomates': 'tomates',
    'papa': 'pomme de terre',
    'papas': 'pommes de terre',
    'zanahoria': 'carotte',
    'zanahorias': 'carottes',
    'lechuga': 'laitue',
    'brocoli': 'brocoli',
    'espinaca': 'épinards',
    'perejil': 'persil',

    'fruta': 'fruit',
    'frutas': 'fruits',
    'manzana': 'pomme',
    'platano': 'banane',
    'plátano': 'banane',
    'limon': 'citron',
    'limón': 'citron',
    'naranja': 'orange',
    'fresa': 'fraise',
    'fresas': 'fraises',
    'uva': 'raisin',
    'uvas': 'raisins',
    'melocoton': 'pêche',
    'melocotón': 'pêche',
    'durazno': 'pêche',

    'lacteo': 'produit laitier',
    'lacteos': 'produits laitiers',
    'leche': 'lait',
    'queso': 'fromage',
    'quesos': 'fromages',
    'mantequilla': 'beurre',
    'crema': 'crème',
    'yogur': 'yaourt',
    'huevo': 'œuf',
    'huevos': 'œufs',

    'pasta': 'pâtes',
    'arroz': 'riz',
    'pan': 'pain',
    'harina': 'farine',
    'trigo': 'blé',
    'legumbre': 'légumineuse',
    'lenteja': 'lentille',
    'lentejas': 'lentilles',
    'garbanzo': 'pois chiche',
    'garbanzos': 'pois chiches',

    'aceite': 'huile',
    'aceites': 'huiles',
    'oliva': 'olive',
    'vegetal': 'végétal',
    'manteca': 'saindoux',

    'sal': 'sel',
    'pimienta': 'poivre',
    'especia': 'épice',
    'especias': 'épices',
    'condimento': 'assaisonnement',

    'vinagre': 'vinaigre',
    'mostaza': 'moutarde',
    'mayonesa': 'mayonnaise',
    'salsa': 'sauce',
    'salsas': 'sauces',
    'caldo': 'bouillon',
    'caldos': 'bouillons',

    'unidad': 'unité',
    'unidades': 'unités',
    'kilogramo': 'kilogramme',
    'kilogramos': 'kilogrammes',
    'kg': 'kg',
    'gramo': 'gramme',
    'gramos': 'grammes',
    'g': 'g',
    'litro': 'litre',
    'litros': 'litres',
    'l': 'l',
    'mililitro': 'millilitre',
    'mililitros': 'millilitres',
    'ml': 'ml',
    'caja': 'boîte',
    'cajas': 'boîtes',
    'paquete': 'paquet',
    'paquetes': 'paquets',
    'lata': 'boîte',
    'latas': 'boîtes',
    'bote': 'pot',
    'botes': 'pots',
    'docena': 'douzaine',
    'docenas': 'douzaines',
  }

  // Buscar palabras en el diccionario y traducir
  const words = lowerText.split(/\s+/)
  const translatedWords = words.map((word) => {
    // Limpiar puntuación
    const cleanWord = word.replace(/[.,!?;:]/g, '')
    return commonWords[cleanWord] || word
  })

  // Reconstituir el texto traducido
  return translatedWords.join(' ')
}

/**
 * Traduce un nombre de producto automáticamente
 * Intenta primero el diccionario conocido, luego traducción automática
 * 
 * @param productNameEs Nombre del producto en español
 * @returns Promesa que resuelve con nombre traducido
 */
export async function translateProductName(
  productNameEs: string
): Promise<string> {
  return translateText(productNameEs)
}

/**
 * Versión sincrónica para uso en componentes sin async
 * Usa solo el diccionario local
 */
export function translateTextSync(textEs: string): string {
  // 1. Si está exactamente en el diccionario, devolver traducción conocida
  const knownProduct = Object.values(PRODUCTS).find(
    (p) => p.nameEs.toLowerCase() === textEs.toLowerCase()
  )
  if (knownProduct) {
    return knownProduct.nameFr
  }

  // 2. Usar estrategia de diccionario local
  return translateUsingDictionary(textEs)
}
