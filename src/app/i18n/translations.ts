export type LanguageCode = 'es' | 'en' | 'fr'

/**
 * Translations interface - Keys are in English (base language)
 * All UI strings should be extracted to this centralized system
 */
export interface Translations {
  // Navigation
  nav: {
    panel: string
    search: string
    info: string
    share: string
    language: string
  }

  // Product Form
  form: {
    productLabel: string
    productPlaceholder: string
    addButton: string
    quantityLabel: string
    unitLabel: string
    categoryLabel: string
    quantitiesActive: string
    onlyProducts: string
    toggleQuantitiesLabel: string
    enableQuantitiesTitle: string
    disableQuantitiesTitle: string
    emptyProductError: string
    negativeQuantityError: string
    addProductError: string
    quantityIncreasedMessage: string
    noUnitSelected: string
  }

  // Modal
  modal: {
    addProduct: string
    productName: string
    quantity: string
    unit: string
    category: string
    add: string
    cancel: string
  }

  // Language selection
  languageModal: {
    title: string
    selectLanguagePrompt: string
    spanish: string
    english: string
    french: string
  }

  // Share functionality
  share: {
    title: string
    copy: string
    copied: string
    empty: string
    error: string
  }

  // PDF export
  pdf: {
    title: string
    downloadButton: string
    spanish: string
    french: string
    english: string
    restockingListTitle: string
  }

  // Credits
  credits: {
    title: string
    createdBy: string
    madeWith: string
  }

  // Search
  search: {
    placeholder: string
    noResults: string
  }

  // Print view
  print: {
    noProducts: string
    autoDownloadMessage: string
  }

  // General UI
  ui: {
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
    yes: string
    no: string
    cancel: string
  }

  // Units
  units: {
    kg: string
    g: string
    L: string
    ml: string
    unit: string
    box: string
    package: string
    jar: string
    can: string
    dozen: string
  }
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
    form: {
      productLabel: 'Producto',
      productPlaceholder: 'Ej: pecho de pollo, tomates...',
      addButton: 'Añadir',
      quantityLabel: 'Cantidad',
      unitLabel: 'Unidad',
      categoryLabel: 'Categoría (opcional)',
      quantitiesActive: 'Cantidades activas',
      onlyProducts: 'Solo productos',
      toggleQuantitiesLabel: 'Alternar modo de cantidades',
      enableQuantitiesTitle: 'Activar cantidades',
      disableQuantitiesTitle: 'Desactivar cantidades',
      emptyProductError: 'El nombre del producto no puede estar vacío',
      negativeQuantityError: 'La cantidad no puede ser negativa',
      addProductError: 'Error al añadir el producto',
      quantityIncreasedMessage: 'Cantidad aumentada',
      noUnitSelected: 'No seleccionado',
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
    languageModal: {
      title: 'Idioma',
      selectLanguagePrompt: 'Selecciona el idioma para la lista de reposición',
      spanish: 'Español',
      english: 'Inglés',
      french: 'Francés',
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
      downloadButton: '📥 Descargar PDF',
      spanish: 'Español',
      french: 'Francés',
      english: 'Inglés',
      restockingListTitle: 'Lista de Reposición',
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
    print: {
      noProducts: 'No hay productos en la lista',
      autoDownloadMessage: 'El archivo se descargará automáticamente',
    },
    ui: {
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
      yes: 'Sí',
      no: 'No',
      cancel: 'Cancelar',
    },
    units: {
      kg: 'kg',
      g: 'g',
      L: 'L',
      ml: 'ml',
      unit: 'unidad',
      box: 'caja',
      package: 'paquete',
      jar: 'bote',
      can: 'lata',
      dozen: 'docena',
    },
  },
  en: {
    nav: {
      panel: 'Panel',
      search: 'Search products',
      info: 'Developer Information',
      share: 'Share List',
      language: 'Language',
    },
    form: {
      productLabel: 'Product',
      productPlaceholder: 'Ex: chicken breast, tomatoes...',
      addButton: 'Add',
      quantityLabel: 'Quantity',
      unitLabel: 'Unit',
      categoryLabel: 'Category (optional)',
      quantitiesActive: 'Quantities active',
      onlyProducts: 'Products only',
      toggleQuantitiesLabel: 'Toggle quantities mode',
      enableQuantitiesTitle: 'Enable quantities',
      disableQuantitiesTitle: 'Disable quantities',
      emptyProductError: 'Product name cannot be empty',
      negativeQuantityError: 'Quantity cannot be negative',
      addProductError: 'Error adding product',
      quantityIncreasedMessage: 'Quantity increased',
      noUnitSelected: 'Not selected',
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
    languageModal: {
      title: 'Language',
      selectLanguagePrompt: 'Select language for restocking list',
      spanish: 'Spanish',
      english: 'English',
      french: 'French',
    },
    share: {
      title: 'Share Restocking List',
      copy: 'Copy link',
      copied: 'Shortened link copied!',
      empty: 'List is empty, add products to share',
      error: 'Error generating link',
    },
    pdf: {
      title: 'Download PDF',
      downloadButton: '📥 Download PDF',
      spanish: 'Spanish',
      french: 'French',
      english: 'English',
      restockingListTitle: 'Restocking List',
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
    print: {
      noProducts: 'No products in the list',
      autoDownloadMessage: 'File will download automatically',
    },
    ui: {
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
      yes: 'Yes',
      no: 'No',
      cancel: 'Cancel',
    },
    units: {
      kg: 'kg',
      g: 'g',
      L: 'L',
      ml: 'ml',
      unit: 'unit',
      box: 'box',
      package: 'package',
      jar: 'jar',
      can: 'can',
      dozen: 'dozen',
    },
  },
  fr: {
    nav: {
      panel: 'Panneau',
      search: 'Rechercher des produits',
      info: 'Information du développeur',
      share: 'Partager la liste',
      language: 'Langue',
    },
    form: {
      productLabel: 'Produit',
      productPlaceholder: 'Ex: poitrine de poulet, tomates...',
      addButton: 'Ajouter',
      quantityLabel: 'Quantité',
      unitLabel: 'Unité',
      categoryLabel: 'Catégorie (optionnel)',
      quantitiesActive: 'Quantités actives',
      onlyProducts: 'Produits seulement',
      toggleQuantitiesLabel: 'Basculer mode quantités',
      enableQuantitiesTitle: 'Activer les quantités',
      disableQuantitiesTitle: 'Désactiver les quantités',
      emptyProductError: 'Le nom du produit ne peut pas être vide',
      negativeQuantityError: 'La quantité ne peut pas être négative',
      addProductError: 'Erreur lors de l\'ajout du produit',
      quantityIncreasedMessage: 'Quantité augmentée',
      noUnitSelected: 'Non sélectionné',
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
    languageModal: {
      title: 'Langue',
      selectLanguagePrompt: 'Sélectionnez la langue pour la liste de réapprovisionnement',
      spanish: 'Espagnol',
      english: 'Anglais',
      french: 'Français',
    },
    share: {
      title: 'Partager la liste de réapprovisionnement',
      copy: 'Copier le lien',
      copied: 'Lien raccourci copié!',
      empty: 'La liste est vide, ajoutez des produits à partager',
      error: 'Erreur lors de la génération du lien',
    },
    pdf: {
      title: 'Télécharger PDF',
      downloadButton: '📥 Télécharger PDF',
      spanish: 'Espagnol',
      french: 'Français',
      english: 'Anglais',
      restockingListTitle: 'Liste de réapprovisionnement',
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
    print: {
      noProducts: 'Aucun produit dans la liste',
      autoDownloadMessage: 'Le fichier se téléchargera automatiquement',
    },
    ui: {
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
      yes: 'Oui',
      no: 'Non',
      cancel: 'Annuler',
    },
    units: {
      kg: 'kg',
      g: 'g',
      L: 'L',
      ml: 'ml',
      unit: 'unité',
      box: 'boîte',
      package: 'paquet',
      jar: 'pot',
      can: 'boîte',
      dozen: 'douzaine',
    },
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
