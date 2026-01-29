/**
 * Sistema de traducciones controladas para términos culinarios
 * Fase 1.3 - Traducciones profesionales, no literales
 * 
 * Arquitectura:
 * - Claves semánticas en inglés (chicken_breast, not "pecho-de-pollo")
 * - Traducciones manuales profesionales
 * - Fallback seguro: si no existe traducción → mostrar clave en inglés
 * - Preparado para escalar a más idiomas
 */

import type { LanguageCode } from '../i18n/translations'

/**
 * Diccionario culinario multiidioma
 * Estructura: { [semanticKey]: { en, fr, de, it, roh } }
 */
export const CULINARY_DICTIONARY: Record<string, Record<LanguageCode, string>> = {
  // CARNES / MEAT
  'chicken_whole': {
    en: 'Whole chicken',
    fr: 'Poulet entier',
    de: 'Ganzes Huhn',
    it: 'Pollo intero',
    roh: 'Giaglina entira',
  },
  'chicken_breast': {
    en: 'Chicken breast',
    fr: 'Poitrine de poulet',
    de: 'Hähnchenbrust',
    it: 'Petto di pollo',
    roh: 'Petg da giaglina',
  },
  'chicken_thigh': {
    en: 'Chicken thigh',
    fr: 'Cuisse de poulet',
    de: 'Hähnchenschenkel',
    it: 'Coscia di pollo',
    roh: 'Cuossa da giaglina',
  },
  'chicken_wing': {
    en: 'Chicken wing',
    fr: 'Aile de poulet',
    de: 'Hähnchenflügel',
    it: 'Ala di pollo',
    roh: 'Ala da giaglina',
  },
  'ground_beef': {
    en: 'Ground beef',
    fr: 'Bœuf haché',
    de: 'Rinderhackfleisch',
    it: 'Carne macinata',
    roh: 'Carn tritgada',
  },
  'beef_steak': {
    en: 'Beef steak',
    fr: 'Bifteck de bœuf',
    de: 'Rindersteak',
    it: 'Bistecca di manzo',
    roh: 'Bistecca da bov',
  },
  'pork_chop': {
    en: 'Pork chop',
    fr: 'Côtelette de porc',
    de: 'Schweinekotelett',
    it: 'Costoletta di maiale',
    roh: 'Costeletta da portg',
  },
  'lamb_leg': {
    en: 'Lamb leg',
    fr: 'Gigot d\'agneau',
    de: 'Lammkeule',
    it: 'Coscia di agnello',
    roh: 'Cuossa d\'umèl',
  },
  'bacon': {
    en: 'Bacon',
    fr: 'Bacon',
    de: 'Speck',
    it: 'Pancetta',
    roh: 'Speck',
  },
  'sausage': {
    en: 'Sausage',
    fr: 'Saucisse',
    de: 'Wurst',
    it: 'Salsiccia',
    roh: 'Salsiz',
  },

  // PESCADOS Y MARISCOS / FISH & SEAFOOD
  'fresh_salmon': {
    en: 'Fresh salmon',
    fr: 'Saumon frais',
    de: 'Frischer Lachs',
    it: 'Salmone fresco',
    roh: 'Salmun fresc',
  },
  'salmon_fillet': {
    en: 'Salmon fillet',
    fr: 'Filet de saumon',
    de: 'Lachsfilet',
    it: 'Filetto di salmone',
    roh: 'Filet da salmun',
  },
  'sea_bass': {
    en: 'Sea bass',
    fr: 'Bar de mer',
    de: 'Wolfsbarsch',
    it: 'Branzino',
    roh: 'Bar da mar',
  },
  'tuna': {
    en: 'Tuna',
    fr: 'Thon',
    de: 'Thunfisch',
    it: 'Tonno',
    roh: 'Tonn',
  },
  'cod': {
    en: 'Cod',
    fr: 'Cabillaud',
    de: 'Kabeljau',
    it: 'Merluzzo',
    roh: 'Gadigl',
  },
  'shrimp': {
    en: 'Shrimp',
    fr: 'Crevettes',
    de: 'Garnelen',
    it: 'Gamberetti',
    roh: 'Garnelis',
  },
  'mussels': {
    en: 'Mussels',
    fr: 'Moules',
    de: 'Muscheln',
    it: 'Cozze',
    roh: 'Musclas',
  },
  'squid': {
    en: 'Squid',
    fr: 'Calmar',
    de: 'Tintenfisch',
    it: 'Calamari',
    roh: 'Calamars',
  },

  // VERDURAS / VEGETABLES
  'tomato': {
    en: 'Tomato',
    fr: 'Tomate',
    de: 'Tomate',
    it: 'Pomodoro',
    roh: 'Tomata',
  },
  'onion': {
    en: 'Onion',
    fr: 'Oignon',
    de: 'Zwiebel',
    it: 'Cipolla',
    roh: 'Tschipolla',
  },
  'garlic': {
    en: 'Garlic',
    fr: 'Ail',
    de: 'Knoblauch',
    it: 'Aglio',
    roh: 'Agl',
  },
  'carrot': {
    en: 'Carrot',
    fr: 'Carotte',
    de: 'Karotte',
    it: 'Carota',
    roh: 'Carotta',
  },
  'potato': {
    en: 'Potato',
    fr: 'Pomme de terre',
    de: 'Kartoffel',
    it: 'Patata',
    roh: 'Tartifla',
  },
  'lettuce': {
    en: 'Lettuce',
    fr: 'Laitue',
    de: 'Kopfsalat',
    it: 'Lattuga',
    roh: 'Lattuga',
  },
  'bell_pepper': {
    en: 'Bell pepper',
    fr: 'Poivron',
    de: 'Paprika',
    it: 'Peperone',
    roh: 'Piperon',
  },
  'zucchini': {
    en: 'Zucchini',
    fr: 'Courgette',
    de: 'Zucchini',
    it: 'Zucchina',
    roh: 'Zucchina',
  },
  'eggplant': {
    en: 'Eggplant',
    fr: 'Aubergine',
    de: 'Aubergine',
    it: 'Melanzana',
    roh: 'Melanzana',
  },
  'broccoli': {
    en: 'Broccoli',
    fr: 'Brocoli',
    de: 'Brokkoli',
    it: 'Broccoli',
    roh: 'Broccoli',
  },
  'spinach': {
    en: 'Spinach',
    fr: 'Épinards',
    de: 'Spinat',
    it: 'Spinaci',
    roh: 'Spinats',
  },
  'mushroom': {
    en: 'Mushroom',
    fr: 'Champignon',
    de: 'Pilz',
    it: 'Fungo',
    roh: 'Fung',
  },

  // FRUTAS / FRUITS
  'apple': {
    en: 'Apple',
    fr: 'Pomme',
    de: 'Apfel',
    it: 'Mela',
    roh: 'Mail',
  },
  'banana': {
    en: 'Banana',
    fr: 'Banane',
    de: 'Banane',
    it: 'Banana',
    roh: 'Banana',
  },
  'orange': {
    en: 'Orange',
    fr: 'Orange',
    de: 'Orange',
    it: 'Arancia',
    roh: 'Arantsch',
  },
  'lemon': {
    en: 'Lemon',
    fr: 'Citron',
    de: 'Zitrone',
    it: 'Limone',
    roh: 'Citrona',
  },
  'strawberry': {
    en: 'Strawberry',
    fr: 'Fraise',
    de: 'Erdbeere',
    it: 'Fragola',
    roh: 'Fragula',
  },
  'grape': {
    en: 'Grape',
    fr: 'Raisin',
    de: 'Traube',
    it: 'Uva',
    roh: 'Iva',
  },
  'watermelon': {
    en: 'Watermelon',
    fr: 'Pastèque',
    de: 'Wassermelone',
    it: 'Anguria',
    roh: 'Meluna d\'aua',
  },

  // LÁCTEOS / DAIRY
  'milk': {
    en: 'Milk',
    fr: 'Lait',
    de: 'Milch',
    it: 'Latte',
    roh: 'Latg',
  },
  'butter': {
    en: 'Butter',
    fr: 'Beurre',
    de: 'Butter',
    it: 'Burro',
    roh: 'Butira',
  },
  'cheese': {
    en: 'Cheese',
    fr: 'Fromage',
    de: 'Käse',
    it: 'Formaggio',
    roh: 'Chaschiel',
  },
  'yogurt': {
    en: 'Yogurt',
    fr: 'Yaourt',
    de: 'Joghurt',
    it: 'Yogurt',
    roh: 'Jogurt',
  },
  'cream': {
    en: 'Cream',
    fr: 'Crème',
    de: 'Sahne',
    it: 'Panna',
    roh: 'Crama',
  },
  'egg': {
    en: 'Egg',
    fr: 'Œuf',
    de: 'Ei',
    it: 'Uovo',
    roh: 'Ov',
  },
  'eggs': {
    en: 'Eggs',
    fr: 'Œufs',
    de: 'Eier',
    it: 'Uova',
    roh: 'Ovs',
  },

  // PRODUCTOS SECOS / DRY PRODUCTS
  'pasta': {
    en: 'Pasta',
    fr: 'Pâtes',
    de: 'Nudeln',
    it: 'Pasta',
    roh: 'Pasta',
  },
  'rice': {
    en: 'Rice',
    fr: 'Riz',
    de: 'Reis',
    it: 'Riso',
    roh: 'Risch',
  },
  'flour': {
    en: 'Flour',
    fr: 'Farine',
    de: 'Mehl',
    it: 'Farina',
    roh: 'Farina',
  },
  'bread': {
    en: 'Bread',
    fr: 'Pain',
    de: 'Brot',
    it: 'Pane',
    roh: 'Paun',
  },
  'sugar': {
    en: 'Sugar',
    fr: 'Sucre',
    de: 'Zucker',
    it: 'Zucchero',
    roh: 'Zuccher',
  },

  // CONDIMENTOS / CONDIMENTS
  'salt': {
    en: 'Salt',
    fr: 'Sel',
    de: 'Salz',
    it: 'Sale',
    roh: 'Sal',
  },
  'pepper': {
    en: 'Pepper',
    fr: 'Poivre',
    de: 'Pfeffer',
    it: 'Pepe',
    roh: 'Paiver',
  },
  'olive_oil': {
    en: 'Olive oil',
    fr: 'Huile d\'olive',
    de: 'Olivenöl',
    it: 'Olio d\'oliva',
    roh: 'Oli d\'uliva',
  },
  'vinegar': {
    en: 'Vinegar',
    fr: 'Vinaigre',
    de: 'Essig',
    it: 'Aceto',
    roh: 'Aschà',
  },
  'basil': {
    en: 'Basil',
    fr: 'Basilic',
    de: 'Basilikum',
    it: 'Basilico',
    roh: 'Basili',
  },
  'parsley': {
    en: 'Parsley',
    fr: 'Persil',
    de: 'Petersilie',
    it: 'Prezzemolo',
    roh: 'Parsla',
  },
  'oregano': {
    en: 'Oregano',
    fr: 'Origan',
    de: 'Oregano',
    it: 'Origano',
    roh: 'Origan',
  },
}

/**
 * Traduce un término culinario al idioma especificado
 * 
 * @param nameKey - Clave semántica en inglés (ej: "chicken_breast")
 * @param language - Código de idioma objetivo
 * @returns Traducción profesional o la clave en inglés si no existe
 * 
 * @example
 * translateCulinaryTerm('chicken_breast', 'fr') // "Poitrine de poulet"
 * translateCulinaryTerm('unknown_product', 'de') // "Unknown product" (fallback)
 */
export function translateCulinaryTerm(nameKey: string, language: LanguageCode): string {
  const translations = CULINARY_DICTIONARY[nameKey]
  
  if (!translations) {
    // Fallback: convertir la clave a formato legible
    // "chicken_breast" → "Chicken breast"
    return nameKey
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }
  
  return translations[language]
}

/**
 * Verifica si existe una traducción para un término
 * 
 * @param nameKey - Clave semántica a verificar
 * @returns true si existe en el diccionario
 */
export function hasCulinaryTranslation(nameKey: string): boolean {
  return nameKey in CULINARY_DICTIONARY
}

/**
 * Obtiene todas las traducciones disponibles para un término
 * 
 * @param nameKey - Clave semántica
 * @returns Objeto con todas las traducciones o undefined
 */
export function getAllTranslations(nameKey: string): Record<LanguageCode, string> | undefined {
  return CULINARY_DICTIONARY[nameKey]
}
