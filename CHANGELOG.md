# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-05

### Added
- **Product Management**: Add, edit, and remove products with full CRUD operations
- **Bilingual Support**: Complete Spanish/French translation system
- **Categorization**: Automatic product categorization with 180+ products
- **Smart Search**: Real-time filtering by product name and category
- **Order Marking**: Mark products as ordered with visual feedback
- **PDF Export**: Professional PDF generation for restocking lists with timestamped filenames
- **URL Sharing**: Ultra-compressed URL encoding (80%+ reduction) for sharing lists
- **Local Storage**: Automatic data persistence across sessions
- **Multi-page PDF**: Intelligent page breaking with header on first page and watermark on last
- **Responsive Design**: Mobile-friendly interface

### Features
- 180+ products in bilingual dictionary (Spanish/French)
- Support for multiple units (kg, L, pieces, boxes, etc.)
- URL compression supports 100-150 products per share link
- UTF-8 character support for special characters (ñ, ó, ü)
- Browser storage persistence
- Clean, professional UI with CSS Modules

### Technical
- Built with React 19 and TypeScript
- Vite build tool for fast development
- Responsive CSS architecture
- Cross-browser compatible (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

### Fixed
- Resolved Error 431 "Request Header Fields Too Large" with ultra-compression
- Fixed URL encoding for non-ASCII characters
- Fixed PDF file naming conflicts with timestamp-based names

## Future Releases

### [1.1.0] - Planned
- Cloud synchronization
- User authentication
- Team/restaurant management
- Advanced analytics dashboard

### [1.2.0] - Planned
- Mobile native apps (React Native)
- Offline mode improvements
- Inventory history tracking
- Automatic reorder suggestions

---

## Semantic Versioning

- **MAJOR** - Breaking changes
- **MINOR** - New features (backwards compatible)
- **PATCH** - Bug fixes (backwards compatible)
