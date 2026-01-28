export type LanguageCode = 'en' | 'fr' | 'de' | 'it' | 'roh'

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
    german: string
    italian: string
    romansh: string
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
      german: 'German',
      italian: 'Italian',
      romansh: 'Romansh',
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
      german: 'Allemand',
      italian: 'Italien',
      romansh: 'Romanche',
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
  de: {
    nav: {
      panel: 'Panel',
      search: 'Produkte suchen',
      info: 'Entwicklerinformationen',
      share: 'Liste teilen',
      language: 'Sprache',
    },
    form: {
      productLabel: 'Produkt',
      productPlaceholder: 'Z.B.: Hähnchenbrust, Tomaten...',
      addButton: 'Hinzufügen',
      quantityLabel: 'Menge',
      unitLabel: 'Einheit',
      categoryLabel: 'Kategorie (optional)',
      quantitiesActive: 'Mengen aktiv',
      onlyProducts: 'Nur Produkte',
      toggleQuantitiesLabel: 'Mengenmodus umschalten',
      enableQuantitiesTitle: 'Mengen aktivieren',
      disableQuantitiesTitle: 'Mengen deaktivieren',
      emptyProductError: 'Produktname darf nicht leer sein',
      negativeQuantityError: 'Menge darf nicht negativ sein',
      addProductError: 'Fehler beim Hinzufügen des Produkts',
      quantityIncreasedMessage: 'Menge erhöht',
      noUnitSelected: 'Nicht ausgewählt',
    },
    modal: {
      addProduct: 'Produkt hinzufügen',
      productName: 'Produktname',
      quantity: 'Menge',
      unit: 'Einheit',
      category: 'Kategorie (optional)',
      add: 'Hinzufügen',
      cancel: 'Abbrechen',
    },
    languageModal: {
      title: 'Sprache',
      selectLanguagePrompt: 'Wählen Sie die Sprache für die Nachbestellungsliste',
      spanish: 'Spanisch',
      english: 'Englisch',
      french: 'Französisch',
      german: 'Deutsch',
      italian: 'Italienisch',
      romansh: 'Rätoromanisch',
    },
    share: {
      title: 'Nachbestellungsliste teilen',
      copy: 'Link kopieren',
      copied: 'Gekürzter Link kopiert!',
      empty: 'Liste ist leer, fügen Sie Produkte hinzu zum Teilen',
      error: 'Fehler beim Generieren des Links',
    },
    pdf: {
      title: 'PDF herunterladen',
      downloadButton: '📥 PDF herunterladen',
      spanish: 'Spanisch',
      french: 'Französisch',
      english: 'Englisch',
      restockingListTitle: 'Nachbestellungsliste',
    },
    credits: {
      title: 'Erstellt von',
      createdBy: 'Erik Valencia Cardona',
      madeWith: 'Mit ❤️ für Restaurants gemacht',
    },
    search: {
      placeholder: 'Produkte suchen...',
      noResults: 'Keine Produkte gefunden',
    },
    print: {
      noProducts: 'Keine Produkte in der Liste',
      autoDownloadMessage: 'Die Datei wird automatisch heruntergeladen',
    },
    ui: {
      categories: 'Kategorien',
      allCategories: 'Alle Kategorien',
      addFirstProduct: 'Fügen Sie Ihr erstes Produkt hinzu',
      clearList: 'Liste löschen',
      deleteConfirm: 'Sind Sie sicher?',
      deleteItem: 'Löschen',
      restockingList: 'Nachbestellungsliste - Chef',
      quantity: 'Menge',
      unit: 'Einheit',
      remove: 'Löschen',
      export: 'Exportieren',
      import: 'Importieren',
      language: 'Deutsch',
      yes: 'Ja',
      no: 'Nein',
      cancel: 'Abbrechen',
    },
    units: {
      kg: 'kg',
      g: 'g',
      L: 'L',
      ml: 'ml',
      unit: 'Stück',
      box: 'Karton',
      package: 'Paket',
      jar: 'Glas',
      can: 'Dose',
      dozen: 'Dutzend',
    },
  },
  it: {
    nav: {
      panel: 'Pannello',
      search: 'Cerca prodotti',
      info: 'Informazioni sviluppatore',
      share: 'Condividi lista',
      language: 'Lingua',
    },
    form: {
      productLabel: 'Prodotto',
      productPlaceholder: 'Es: petto di pollo, pomodori...',
      addButton: 'Aggiungi',
      quantityLabel: 'Quantità',
      unitLabel: 'Unità',
      categoryLabel: 'Categoria (opzionale)',
      quantitiesActive: 'Quantità attive',
      onlyProducts: 'Solo prodotti',
      toggleQuantitiesLabel: 'Attiva/disattiva modalità quantità',
      enableQuantitiesTitle: 'Attiva quantità',
      disableQuantitiesTitle: 'Disattiva quantità',
      emptyProductError: 'Il nome del prodotto non può essere vuoto',
      negativeQuantityError: 'La quantità non può essere negativa',
      addProductError: 'Errore nell\'aggiunta del prodotto',
      quantityIncreasedMessage: 'Quantità aumentata',
      noUnitSelected: 'Non selezionato',
    },
    modal: {
      addProduct: 'Aggiungi prodotto',
      productName: 'Nome prodotto',
      quantity: 'Quantità',
      unit: 'Unità',
      category: 'Categoria (opzionale)',
      add: 'Aggiungi',
      cancel: 'Annulla',
    },
    languageModal: {
      title: 'Lingua',
      selectLanguagePrompt: 'Seleziona la lingua per la lista di rifornimento',
      spanish: 'Spagnolo',
      english: 'Inglese',
      french: 'Francese',
      german: 'Tedesco',
      italian: 'Italiano',
      romansh: 'Romancio',
    },
    share: {
      title: 'Condividi lista di rifornimento',
      copy: 'Copia link',
      copied: 'Link abbreviato copiato!',
      empty: 'La lista è vuota, aggiungi prodotti per condividere',
      error: 'Errore nella generazione del link',
    },
    pdf: {
      title: 'Scarica PDF',
      downloadButton: '📥 Scarica PDF',
      spanish: 'Spagnolo',
      french: 'Francese',
      english: 'Inglese',
      restockingListTitle: 'Lista di rifornimento',
    },
    credits: {
      title: 'Creato da',
      createdBy: 'Erik Valencia Cardona',
      madeWith: 'Fatto con ❤️ per i ristoranti',
    },
    search: {
      placeholder: 'Cerca prodotti...',
      noResults: 'Nessun prodotto trovato',
    },
    print: {
      noProducts: 'Nessun prodotto nella lista',
      autoDownloadMessage: 'Il file verrà scaricato automaticamente',
    },
    ui: {
      categories: 'Categorie',
      allCategories: 'Tutte le categorie',
      addFirstProduct: 'Aggiungi il tuo primo prodotto',
      clearList: 'Cancella lista',
      deleteConfirm: 'Sei sicuro?',
      deleteItem: 'Elimina',
      restockingList: 'Lista di rifornimento - Chef',
      quantity: 'Quantità',
      unit: 'Unità',
      remove: 'Elimina',
      export: 'Esporta',
      import: 'Importa',
      language: 'Italiano',
      yes: 'Sì',
      no: 'No',
      cancel: 'Annulla',
    },
    units: {
      kg: 'kg',
      g: 'g',
      L: 'L',
      ml: 'ml',
      unit: 'unità',
      box: 'scatola',
      package: 'pacco',
      jar: 'barattolo',
      can: 'lattina',
      dozen: 'dozzina',
    },
  },
  roh: {
    nav: {
      panel: 'Panel',
      search: 'Tschertgar products',
      info: 'Infurmaziun davart il sviluppader',
      share: 'Cundivider glista',
      language: 'Linguatg',
    },
    form: {
      productLabel: 'Product',
      productPlaceholder: 'P.ex.: petg da giaglina, tomatas...',
      addButton: 'Agiuntar',
      quantityLabel: 'Quantitad',
      unitLabel: 'Unitad',
      categoryLabel: 'Categoria (opziunal)',
      quantitiesActive: 'Quantitads activas',
      onlyProducts: 'Be products',
      toggleQuantitiesLabel: 'Midar il modus da quantitads',
      enableQuantitiesTitle: 'Activar quantitads',
      disableQuantitiesTitle: 'Desactivar quantitads',
      emptyProductError: 'Il num dal product na po betg esser vid',
      negativeQuantityError: 'La quantitad na po betg esser negativa',
      addProductError: 'Errur cun agiuntar il product',
      quantityIncreasedMessage: 'Quantitad augmentada',
      noUnitSelected: 'Betg tschernì',
    },
    modal: {
      addProduct: 'Agiuntar product',
      productName: 'Num dal product',
      quantity: 'Quantitad',
      unit: 'Unitad',
      category: 'Categoria (opziunal)',
      add: 'Agiuntar',
      cancel: 'Interrumper',
    },
    languageModal: {
      title: 'Linguatg',
      selectLanguagePrompt: 'Tscherner il linguatg per la glista da reapprovisiunament',
      spanish: 'Spagnol',
      english: 'Englais',
      french: 'Franzos',
      german: 'Tudestg',
      italian: 'Talian',
      romansh: 'Rumantsch',
    },
    share: {
      title: 'Cundivider glista da reapprovisiunament',
      copy: 'Copiar link',
      copied: 'Link scursanì copià!',
      empty: 'La glista è vida, agiuntar products per cundivider',
      error: 'Errur cun generar il link',
    },
    pdf: {
      title: 'Telechargiar PDF',
      downloadButton: '📥 Telechargiar PDF',
      spanish: 'Spagnol',
      french: 'Franzos',
      english: 'Englais',
      restockingListTitle: 'Glista da reapprovisiunament',
    },
    credits: {
      title: 'Creà da',
      createdBy: 'Erik Valencia Cardona',
      madeWith: 'Fatg cun ❤️ per ristoraunts',
    },
    search: {
      placeholder: 'Tschertgar products...',
      noResults: 'Nagins products chattads',
    },
    print: {
      noProducts: 'Nagins products en la glista',
      autoDownloadMessage: 'La datoteca vegn telechargiada automaticamain',
    },
    ui: {
      categories: 'Categorias',
      allCategories: 'Tut las categorias',
      addFirstProduct: 'Agiuntar tes emprim product',
      clearList: 'Stizzar glista',
      deleteConfirm: 'Essas ti segir?',
      deleteItem: 'Stizzar',
      restockingList: 'Glista da reapprovisiunament - Chef',
      quantity: 'Quantitad',
      unit: 'Unitad',
      remove: 'Stizzar',
      export: 'Exportar',
      import: 'Importar',
      language: 'Rumantsch',
      yes: 'Gia',
      no: 'Na',
      cancel: 'Interrumper',
    },
    units: {
      kg: 'kg',
      g: 'g',
      L: 'L',
      ml: 'ml',
      unit: 'unitad',
      box: 'chaschetta',
      package: 'pachet',
      jar: 'teglia',
      can: 'scatulettas',
      dozen: 'dutschina',
    },
  },
}

/**
 * Detecta el idioma del navegador y retorna el más cercano soportado
 * Fallback seguro: inglés (en)
 * Idiomas soportados: francés (fr), alemán (de), italiano (it), romanche (roh), inglés (en)
 */
export function detectBrowserLanguage(): LanguageCode {
  const browserLang = navigator.language.split('-')[0].toLowerCase()
  
  // Mapear idiomas del navegador a códigos soportados
  const langMap: Record<string, LanguageCode> = {
    en: 'en',
    fr: 'fr',
    de: 'de',
    it: 'it',
    rm: 'roh', // Código ISO 639-1 para romanche
    roh: 'roh', // También aceptar el código ISO 639-3
  }
  
  // Si el idioma está soportado, usarlo; sino, fallback a inglés
  return langMap[browserLang] || 'en'
}

/**
 * Obtiene las traducciones para un idioma específico
 */
export function getTranslations(language: LanguageCode): Translations {
  return translations[language]
}
