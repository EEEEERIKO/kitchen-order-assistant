/**
 * Configuración del Restaurante
 * 
 * Este archivo contiene toda la información del restaurante que se muestra en:
 * - El header de la aplicación web
 * - El encabezado del PDF generado
 * - Cualquier otra sección donde se necesite información del restaurante
 * 
 * PARA VENDER LA APP: Solo modifica las variables en este archivo
 * y todos los cambios se reflejarán automáticamente en la app
 */

export const RESTAURANT_CONFIG = {
  // Nombre del restaurante - CAMBIO MANUAL TEST
  name: 'Le Rendez-Vous Restaurant',
  
  // Logo del restaurante (URL o ruta relativa a public/)
  // Ejemplos:
  // - './logo.png' (archivo en public/logo.png)
  // - './images/logo.png' (archivo en public/images/logo.png)
  // - 'https://example.com/logo.png' (URL externa)
  logo: './images/descarga.png',
  
  // Dirección del restaurante
  address: 'Rte du Lac 14, 1938 Champex-Lac',
  
  // Número de teléfono de contacto
  phone: '+41 027 565 36 70',
  
  // Correo electrónico de contacto
  email: 'info@lerendezvous.ch',
  
  // Slogan o descripción corta (opcional)
  tagline: 'Panel del Chef Ejecutivo',
} as const

/**
 * Tipo de configuración para TypeScript
 */
export type RestaurantConfig = typeof RESTAURANT_CONFIG
