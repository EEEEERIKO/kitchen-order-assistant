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
    shareList: string
    language: string
    appTitle: string
    quickSearch: string
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
    shareList: string
    copy: string
    copied: string
    empty: string
    error: string
    shortLink: string
    openLink: string
  }

  // PDF export
  pdf: {
    title: string
    downloadButton: string
    downloadPDF: string
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

  // Footer
  footer: {
    appName: string
    copyright: string
    privacy: string
    terms: string
    support: string
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
    clearAll: string
    deleteConfirm: string
    deleteConfirmMessage: string
    deleteItem: string
    restockingList: string
    currentList: string
    products: string
    quantity: string
    unit: string
    remove: string
    export: string
    import: string
    language: string
    yes: string
    no: string
    cancel: string
    date: string
    noProducts: string
    noProductsYet: string
    noProductsFound: string
    tryOtherTerms: string
    startAddingProducts: string
    incompleteUnits: string
    incompleteUnitsMessage: string
    understood: string
  }

  // Categories
  categoryNames: {
    carnes: string
    pescados: string
    verduras: string
    frutas: string
    lacteos: string
    secos: string
    condimentos: string
    aceites: string
    otros: string
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
      shareList: 'Share List',
      language: 'Language',
      appTitle: 'Chef Inventory',
      quickSearch: 'Quick Search',
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
      shareList: 'Share List',
      copy: 'Copy link',
      copied: 'Shortened link copied!',
      empty: 'List is empty, add products to share',
      error: 'Error generating link',
      shortLink: 'Shortened link',
      openLink: 'Open link',
    },
    pdf: {
      title: 'Download PDF',
      downloadButton: 'Download PDF',
      downloadPDF: 'Download PDF',
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
    footer: {
      appName: 'Culinary Management Application',
      copyright: '© 2026 Culinary Management Application',
      privacy: 'Privacy',
      terms: 'Terms',
      support: 'Support',
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
      clearAll: 'Clear All',
      deleteConfirm: 'Are you sure?',
      deleteConfirmMessage: 'Are you sure you want to delete all {count} products from the list? This action cannot be undone.',
      deleteItem: 'Delete',
      restockingList: 'Restocking List - Chef',
      currentList: 'Current List',
      products: 'products',
      quantity: 'Quantity',
      unit: 'Unit',
      remove: 'Delete',
      export: 'Export',
      import: 'Import',
      language: 'English',
      yes: 'Yes',
      no: 'No',
      cancel: 'Cancel',
      date: 'Date',
      noProducts: 'No products',
      noProductsYet: 'No products yet',
      noProductsFound: 'No products found',
      tryOtherTerms: 'Try other search terms',
      startAddingProducts: 'Start adding products to your list',
      incompleteUnits: 'Incomplete units',
      incompleteUnitsMessage: 'The following products do not have a unit configured:',
      understood: 'Understood, I will complete',
    },
    categoryNames: {
      carnes: 'Meat',
      pescados: 'Fish and Seafood',
      verduras: 'Vegetables',
      frutas: 'Fruits',
      lacteos: 'Dairy Products',
      secos: 'Dry Products',
      condimentos: 'Spices and Condiments',
      aceites: 'Oils and Fats',
      otros: 'Others',
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
      shareList: 'Partager la liste',
      language: 'Langue',
      appTitle: 'Inventaire Chef',
      quickSearch: 'Recherche Rapide',
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
      shareList: 'Partager la liste',
      copy: 'Copier le lien',
      copied: 'Lien raccourci copié!',
      empty: 'La liste est vide, ajoutez des produits à partager',
      error: 'Erreur lors de la génération du lien',
      shortLink: 'Lien raccourci',
      openLink: 'Ouvrir le lien',
    },
    pdf: {
      title: 'Télécharger PDF',
      downloadButton: 'Télécharger PDF',
      downloadPDF: 'Télécharger PDF',
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
    footer: {
      appName: 'Application de Gestion Culinaire',
      copyright: '© 2026 Application de Gestion Culinaire',
      privacy: 'Confidentialité',
      terms: 'Conditions',
      support: 'Support',
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
      clearAll: 'Tout effacer',
      deleteConfirm: 'Êtes-vous sûr?',
      deleteConfirmMessage: 'Êtes-vous sûr de vouloir supprimer tous les {count} produits de la liste? Cette action ne peut pas être annulée.',
      deleteItem: 'Supprimer',
      restockingList: 'Liste de réapprovisionnement - Chef',
      currentList: 'Liste actuelle',
      products: 'produits',
      quantity: 'Quantité',
      unit: 'Unité',
      remove: 'Supprimer',
      export: 'Exporter',
      import: 'Importer',
      language: 'Français',
      yes: 'Oui',
      no: 'Non',
      cancel: 'Annuler',
      date: 'Date',
      noProducts: 'Aucun produit',
      noProductsYet: 'Pas encore de produits',
      noProductsFound: 'Aucun produit trouvé',
      tryOtherTerms: 'Essayez d\'autres termes de recherche',
      startAddingProducts: 'Commencez à ajouter des produits à votre liste',
      incompleteUnits: 'Unités incomplètes',
      incompleteUnitsMessage: 'Les produits suivants n\'ont pas d\'unité configurée:',
      understood: 'Compris, je vais compléter',
    },
    categoryNames: {
      carnes: 'Viandes',
      pescados: 'Poissons et Fruits de Mer',
      verduras: 'Légumes',
      frutas: 'Fruits',
      lacteos: 'Produits Laitiers',
      secos: 'Produits Secs',
      condimentos: 'Épices et Condiments',
      aceites: 'Huiles et Graisses',
      otros: 'Autres',
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
      shareList: 'Liste teilen',
      language: 'Sprache',
      appTitle: 'Koch Inventar',
      quickSearch: 'Schnellsuche',
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
      shareList: 'Liste teilen',
      copy: 'Link kopieren',
      copied: 'Gekürzter Link kopiert!',
      empty: 'Liste ist leer, fügen Sie Produkte hinzu zum Teilen',
      error: 'Fehler beim Generieren des Links',
      shortLink: 'Gekürzter Link',
      openLink: 'Link öffnen',
    },
    pdf: {
      title: 'PDF herunterladen',
      downloadButton: 'PDF herunterladen',
      downloadPDF: 'PDF herunterladen',
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
    footer: {
      appName: 'Kulinarische Verwaltungsanwendung',
      copyright: '© 2026 Kulinarische Verwaltungsanwendung',
      privacy: 'Datenschutz',
      terms: 'Bedingungen',
      support: 'Unterstützung',
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
      clearAll: 'Alles löschen',
      deleteConfirm: 'Sind Sie sicher?',
      deleteConfirmMessage: 'Möchten Sie wirklich alle {count} Produkte aus der Liste löschen? Diese Aktion kann nicht rückgängig gemacht werden.',
      deleteItem: 'Löschen',
      restockingList: 'Nachbestellungsliste - Chef',
      currentList: 'Aktuelle Liste',
      products: 'Produkte',
      quantity: 'Menge',
      unit: 'Einheit',
      remove: 'Löschen',
      export: 'Exportieren',
      import: 'Importieren',
      language: 'Deutsch',
      yes: 'Ja',
      no: 'Nein',
      cancel: 'Abbrechen',
      date: 'Datum',
      noProducts: 'Keine Produkte',
      noProductsYet: 'Noch keine Produkte',
      noProductsFound: 'Keine Produkte gefunden',
      tryOtherTerms: 'Versuchen Sie andere Suchbegriffe',
      startAddingProducts: 'Beginnen Sie, Produkte zu Ihrer Liste hinzuzufügen',
      incompleteUnits: 'Unvollständige Einheiten',
      incompleteUnitsMessage: 'Die folgenden Produkte haben keine konfigurierte Einheit:',
      understood: 'Verstanden, ich werde vervollständigen',
    },
    categoryNames: {
      carnes: 'Fleisch',
      pescados: 'Fisch und Meeresfrüchte',
      verduras: 'Gemüse',
      frutas: 'Obst',
      lacteos: 'Milchprodukte',
      secos: 'Trockenwaren',
      condimentos: 'Gewürze und Würzmittel',
      aceites: 'Öle und Fette',
      otros: 'Sonstiges',
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
      shareList: 'Condividi lista',
      language: 'Lingua',
      appTitle: 'Inventario Chef',
      quickSearch: 'Ricerca Veloce',
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
      shareList: 'Condividi lista',
      copy: 'Copia link',
      copied: 'Link abbreviato copiato!',
      empty: 'La lista è vuota, aggiungi prodotti per condividere',
      error: 'Errore nella generazione del link',
      shortLink: 'Link abbreviato',
      openLink: 'Apri link',
    },
    pdf: {
      title: 'Scarica PDF',
      downloadButton: 'Scarica PDF',
      downloadPDF: 'Scarica PDF',
      spanish: 'Spagnolo',
      french: 'Francese',
      english: 'Inglese',
      restockingListTitle: 'Lista di rifornimento',
    },
    credits: {
      title: 'Creato da',
      createdBy: 'Erik Valencia Cardona',
      madeWith: 'Fatto con ❤️ per i ristoranti',
    },    footer: {
      appName: 'Applicazione di Gestione Culinaria',
      copyright: '© 2026 Applicazione di Gestione Culinaria',
      privacy: 'Privacy',
      terms: 'Termini',
      support: 'Supporto',
    },    search: {
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
      clearAll: 'Cancella tutto',
      deleteConfirm: 'Sei sicuro?',
      deleteConfirmMessage: 'Sei sicuro di voler eliminare tutti i {count} prodotti dalla lista? Questa azione non può essere annullata.',
      deleteItem: 'Elimina',
      restockingList: 'Lista di rifornimento - Chef',
      currentList: 'Lista attuale',
      products: 'prodotti',
      quantity: 'Quantità',
      unit: 'Unità',
      remove: 'Elimina',
      export: 'Esporta',
      import: 'Importa',
      language: 'Italiano',
      yes: 'Sì',
      no: 'No',
      cancel: 'Annulla',
      date: 'Data',
      noProducts: 'Nessun prodotto',
      noProductsYet: 'Nessun prodotto ancora',
      noProductsFound: 'Nessun prodotto trovato',
      tryOtherTerms: 'Prova altri termini di ricerca',
      startAddingProducts: 'Inizia ad aggiungere prodotti alla tua lista',
      incompleteUnits: 'Unità incomplete',
      incompleteUnitsMessage: 'I seguenti prodotti non hanno un\'unità configurata:',
      understood: 'Capito, completerò',
    },
    categoryNames: {
      carnes: 'Carne',
      pescados: 'Pesce e Frutti di Mare',
      verduras: 'Verdure',
      frutas: 'Frutta',
      lacteos: 'Latticini',
      secos: 'Prodotti Secchi',
      condimentos: 'Spezie e Condimenti',
      aceites: 'Oli e Grassi',
      otros: 'Altri',
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
      shareList: 'Cundivider glista',
      language: 'Linguatg',
      appTitle: 'Inventari Chef',
      quickSearch: 'Tschertga Svelta',
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
      shareList: 'Cundivider glista',
      copy: 'Copiar link',
      copied: 'Link scursanì copià!',
      empty: 'La glista è vida, agiuntar products per cundivider',
      error: 'Errur cun generar il link',
      shortLink: 'Link scursanì',
      openLink: 'Avrir link',
    },
    pdf: {
      title: 'Telechargiar PDF',
      downloadButton: 'Telechargiar PDF',
      downloadPDF: 'Telechargiar PDF',
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
    footer: {
      appName: 'Applicaziun da Gestiun Culinara',
      copyright: '© 2026 Applicaziun da Gestiun Culinara',
      privacy: 'Proteziun da datas',
      terms: 'Cundiziuns',
      support: 'Support',
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
      clearAll: 'Stizzar tut',
      deleteConfirm: 'Èn Vus segirs?',
      deleteConfirmMessage: 'Èn Vus segirs che Vus vulais stizzar tut ils {count} products da la glista? Questa acziun na po betg vegnir annullada.',
      deleteItem: 'Stizzar',
      restockingList: 'Glista da reapprovisiunament - Chef',
      currentList: 'Glista actuala',
      products: 'products',
      quantity: 'Quantitad',
      unit: 'Unitad',
      remove: 'Stizzar',
      export: 'Exportar',
      import: 'Importar',
      language: 'Rumantsch',
      yes: 'Gea',
      no: 'Na',
      cancel: 'Interrumper',
      date: 'Data',
      noProducts: 'Nagins products',
      noProductsYet: 'Anc nagins products',
      noProductsFound: 'Nagins products chattads',
      tryOtherTerms: 'Empruvai auters termins da tschertga',
      startAddingProducts: 'Cumenzar ad agiuntar products a Vossa glista',
      incompleteUnits: 'Unitads incumpletas',
      incompleteUnitsMessage: 'Ils suandants products n\'han nagina unitad configurada:',
      understood: 'Chapì, jau vegn a cumplettar',
    },
    categoryNames: {
      carnes: 'Carn',
      pescados: 'Pesch e Fretgs da Mar',
      verduras: 'Verduras',
      frutas: 'Fritgs',
      lacteos: 'Products Lattiers',
      secos: 'Products Sitgs',
      condimentos: 'Spezias e Condiments',
      aceites: 'Olis e Grassas',
      otros: 'Auters',
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

/**
 * Obtiene el nombre traducido de una categoría
 */
export function getCategoryName(categoryId: string, language: LanguageCode): string {
  const t = translations[language]
  const categoryKey = categoryId as keyof typeof t.categoryNames
  return t.categoryNames[categoryKey] || categoryId
}

/**
 * Obtiene el locale para formateo de fechas según el idioma
 */
export function getDateLocale(language: LanguageCode): string {
  const localeMap: Record<LanguageCode, string> = {
    en: 'en-US',
    fr: 'fr-FR',
    de: 'de-DE',
    it: 'it-IT',
    roh: 'rm-CH',
  }
  return localeMap[language]
}
