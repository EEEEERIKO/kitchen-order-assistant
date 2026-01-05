export type LanguageCode = 'es' | 'en' | 'fr'

export interface Translations {
  nav: {
    panel: string
    search: string
    info: string
    share: string
    language: string
  }
  modal: {
    addProduct: string
    productName: string
    quantity: string
    unit: string
    category: string
    add: string
    cancel: string
  }
  share: {
    title: string
    copy: string
    copied: string
    empty: string
    error: string
  }
  pdf: {
    title: string
    spanish: string
    french: string
    english: string
  }
  credits: {
    title: string
    createdBy: string
    madeWith: string
  }
  search: {
    placeholder: string
    noResults: string
  }
  categories: string
  allCategories: string
  addFirstProduct: string
  clearList: string
  deleteConfirm: string
  deleteItem: string
  restockingList: string
  quantity: string
  unit: string
  remove: string
  export: string
  import: string
  language: string
}

export const translations: Record<LanguageCode, Translations> = {
  es: {
    nav: {
      panel: 'Panel',
      search: 'Buscar productos',
      info: 'Información del desarrollador',
      share: 'Compartir Lista',
      language: 'Idioma',
    },
    modal: {
      addProduct: 'Agregar Producto',
      productName: 'Nombre del producto',
      quantity: 'Cantidad',
      unit: 'Unidad',
      category: 'Categoría (opcional)',
      add: 'Agregar',
      cancel: 'Cancelar',
    },
    share: {
      title: 'Compartir Lista de Reposición',
      copy: 'Copiar enlace',
      copied: '¡Enlace acortado copiado!',
      empty: 'La lista está vacía, agrega productos para compartir',
      error: 'Error al generar el enlace',
    },
    pdf: {
      title: 'Descargar PDF',
      spanish: 'Español',
      french: 'Francés',
      english: 'Inglés',
    },
    credits: {
      title: 'Creado Por',
      createdBy: 'Erik Valencia Cardona',
      madeWith: 'Hecho con ❤️ para restaurantes',
    },
    search: {
      placeholder: 'Buscar productos...',
      noResults: 'No se encontraron productos',
    },
    categories: 'Categorías',
    allCategories: 'Todas las categorías',
    addFirstProduct: 'Agrega tu primer producto',
    clearList: 'Limpiar lista',
    deleteConfirm: '¿Estás seguro?',
    deleteItem: 'Eliminar',
    restockingList: 'Lista de Reposición - Chef',
    quantity: 'Cantidad',
    unit: 'Unidad',
    remove: 'Eliminar',
    export: 'Exportar',
    import: 'Importar',
    language: 'Español',
  },
  en: {
    nav: {
      panel: 'Panel',
      search: 'Search products',
      info: 'Developer Information',
      share: 'Share List',
      language: 'Language',
    },
    modal: {
      addProduct: 'Add Product',
      productName: 'Product name',
      quantity: 'Quantity',
      unit: 'Unit',
      category: 'Category (optional)',
      add: 'Add',
      cancel: 'Cancel',
    },
    share: {
      title: 'Share Restocking List',
      copy: 'Copy link',
      copied: '¡Shortened link copied!',
      empty: 'List is empty, add products to share',
      error: 'Error generating link',
    },
    pdf: {
      title: 'Download PDF',
      spanish: 'Spanish',
      french: 'French',
      english: 'English',
    },
    credits: {
      title: 'Created By',
      createdBy: 'Erik Valencia Cardona',
      madeWith: 'Made with ❤️ for restaurants',
    },
    search: {
      placeholder: 'Search products...',
      noResults: 'No products found',
    },
    categories: 'Categories',
    allCategories: 'All categories',
    addFirstProduct: 'Add your first product',
    clearList: 'Clear list',
    deleteConfirm: 'Are you sure?',
    deleteItem: 'Delete',
    restockingList: 'Restocking List - Chef',
    quantity: 'Quantity',
    unit: 'Unit',
    remove: 'Delete',
    export: 'Export',
    import: 'Import',
    language: 'English',
  },
  fr: {
    nav: {
      panel: 'Panneau',
      search: 'Rechercher des produits',
      info: 'Information du développeur',
      share: 'Partager la liste',
      language: 'Langue',
    },
    modal: {
      addProduct: 'Ajouter un produit',
      productName: 'Nom du produit',
      quantity: 'Quantité',
      unit: 'Unité',
      category: 'Catégorie (optionnel)',
      add: 'Ajouter',
      cancel: 'Annuler',
    },
    share: {
      title: 'Partager la liste de réapprovisionnement',
      copy: 'Copier le lien',
      copied: '¡Lien raccourci copié!',
      empty: 'La liste est vide, ajoutez des produits à partager',
      error: 'Erreur lors de la génération du lien',
    },
    pdf: {
      title: 'Télécharger PDF',
      spanish: 'Espagnol',
      french: 'Français',
      english: 'Anglais',
    },
    credits: {
      title: 'Créé par',
      createdBy: 'Erik Valencia Cardona',
      madeWith: 'Fait avec ❤️ pour les restaurants',
    },
    search: {
      placeholder: 'Rechercher des produits...',
      noResults: 'Aucun produit trouvé',
    },
    categories: 'Catégories',
    allCategories: 'Toutes les catégories',
    addFirstProduct: 'Ajoutez votre premier produit',
    clearList: 'Effacer la liste',
    deleteConfirm: 'Êtes-vous sûr?',
    deleteItem: 'Supprimer',
    restockingList: 'Liste de réapprovisionnement - Chef',
    quantity: 'Quantité',
    unit: 'Unité',
    remove: 'Supprimer',
    export: 'Exporter',
    import: 'Importer',
    language: 'Français',
  },
}

/**
 * Detecta el idioma del navegador y retorna el más cercano soportado
 */
export function detectBrowserLanguage(): LanguageCode {
  const browserLang = navigator.language.split('-')[0].toLowerCase()
  
  // Mapear idiomas comunes a los soportados
  const langMap: Record<string, LanguageCode> = {
    es: 'es',
    en: 'en',
    fr: 'fr',
  }
  
  return langMap[browserLang] || 'es' // Default a español
}

/**
 * Obtiene las traducciones para un idioma específico
 */
export function getTranslations(language: LanguageCode): Translations {
  return translations[language]
}
