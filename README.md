# Kitchen Order Assistant

A professional restaurant inventory management and restocking list application built with React, TypeScript, and Vite. Designed for restaurant staff to efficiently manage product inventory, generate restocking lists, and share inventory snapshots with team members.

## Features

### 📋 Core Functionality
- **Product Management**: Add, edit, and remove products with bilingual support (Spanish/French)
- **Categorized Inventory**: Automatic organization of products by category (Vegetables, Seafood, Meat, Pantry, Wines, Dairy, etc.)
- **Smart Search**: Real-time filtering by product name and category
- **Quantity Tracking**: Manage stock levels with various unit types (kg, L, pieces, boxes, etc.)

### 🔗 URL Sharing
- **Ultra-Compressed URLs**: Share complete inventory lists via URL with 80%+ data compression
- **UTF-8 Support**: Handles special characters (ñ, ó, ü) and non-ASCII text
- **Secure Encoding**: TextEncoder/TextDecoder with Base64 encoding for reliability
- **Shareable Links**: Generate short, shareable URLs to distribute inventory snapshots to team members

### 📄 PDF Generation
- **Professional PDF Export**: Generate formatted restocking lists as PDF
- **Multi-page Support**: Automatic page breaks with header on first page and watermark on last page
- **Timestamp Naming**: PDF files automatically named with date and time to avoid conflicts
- **Optimized Layout**: Efficient space usage with flexible category distribution across pages

### 🌐 Bilingual Support
- **Spanish/French**: Full application support for Spanish (Español) and French (Français)
- **Product Dictionary**: 180+ products with complete bilingual translations
- **Dynamic Language Switching**: Change language on-the-fly without losing data

### 💾 Data Persistence
- **Local Storage**: Automatically saves inventory to browser storage
- **Session Recovery**: Restores list when reopening the application
- **Import from URL**: Load shared lists from URL parameters

## Technology Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript 5
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **Testing**: Vitest
- **Linting**: ESLint

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/EEEEERIKO/kitchen-order-assistant.git
cd kitchen-order-assistant

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Create optimized build
npm run build

# Preview production build locally
npm run preview
```

## Usage

### Adding Products
1. Enter product name in Spanish
2. Enter quantity and unit
3. Click "Add" or press Enter
4. Product will be automatically categorized

### Managing Inventory
- **Edit Quantity**: Click on quantity field to update stock levels
- **Remove Product**: Click trash icon to remove from list
- **Mark as Ordered**: Check products that have been ordered
- **Search**: Use search bar to filter products by name or category

### Sharing Lists
1. Click "Share" button
2. Copy the generated URL from the modal
3. Share link with team members via email, chat, or messaging app
4. Recipients can open the link to load the exact same list

### Generating PDF
1. Click "Download PDF" button
2. Configure printing options in browser dialog
3. Select "Save as PDF" to download
4. File will be named with current date and time

## Project Structure

```
src/
├── App.tsx                 # Main application component
├── App.css                 # Global styles
├── components/             # React components
│   ├── ProductForm.tsx     # Product input form
│   ├── ProductList.tsx     # Inventory display
│   ├── PDFGenerator.tsx    # PDF export functionality
│   ├── LanguageModal.tsx   # Language selector
│   ├── CategorizedProductList.tsx  # Grouped display
│   └── useRestockingList.ts # Custom hook for state management
├── app/
│   └── domain/             # Business logic
│       ├── classification.ts  # Product categorization
│       ├── dictionary.ts      # Bilingual product dictionary
│       ├── types.ts           # TypeScript type definitions
│       └── normalize.ts       # Text normalization
```

## Key Features in Detail

### Ultra-Compression Algorithm
The URL encoding uses a custom ultra-compression strategy:
- Stores only essential data: product names (ES/FR), quantity, unit
- Uses pipe separators instead of JSON overhead
- Achieves 80%+ reduction in URL size
- Supports up to 131+ products per URL
- Handles Unicode characters properly

### Bilingual Dictionary
Contains 180+ products across categories:
- **Vegetables**: Tomatoes, peppers, lettuce, onions, potatoes, etc.
- **Seafood**: Fish, shrimp, squid, clams, mussels, etc.
- **Meat**: Chicken, beef, pork with various cuts
- **Pantry**: Rice, pasta, oils, spices, etc.
- **Wines**: Red, white, rosé, sparkling varieties
- **Dairy**: Cheese, milk, cream, butter, etc.

### PDF Export
- Professional layout with header containing date/time
- Products organized in 2-column grid for compact display
- Checkboxes for marking items as ordered
- Watermark on last page only
- Proper page margins and footers
- Named with timestamp to prevent file overwrites

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- **Bundle Size**: ~45KB (gzipped)
- **Load Time**: <1 second on 4G
- **URL Encoding**: Ultra-compression reduces typical 131-product lists to ~2000 character URLs
- **PDF Generation**: Uses native browser printing API for reliability

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Made for restaurant professionals.**
