import type { ListItem } from '../app/domain/types'
import { groupProductsByCategory, getCategoriesInOrder } from './grouping'
import { getAllCategories } from '../app/domain/classification'
import { getTranslations, type LanguageCode } from '../app/i18n/translations'
import { getProductName } from '../app/domain/product-names'
import './PrintView.css'

interface PrintViewProps {
  items: ListItem[]
  language: LanguageCode
}

/**
 * Genera un nombre único para el PDF con fecha y hora
 * Ej: "lista-reposicion-2026-01-02-143052.pdf"
 */
function generatePdfFileName(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `lista-reposicion-${year}-${month}-${day}-${hours}${minutes}${seconds}.pdf`
}

/**
 * Unidades de medida comunes para la lista de impresión
 */
const COMMON_UNITS = ['kg', 'g', 'L', 'ml', 'u', 'doc']

/**
 * PrintView: Vista de impresión mejorada para lista de pedidos
 *
 * Características:
 * - Muestra todos los productos (no solo marcados)
 * - Recuadros interactivos para marcar si se necesita
 * - Campos para escribir cantidad
 * - Botones para seleccionar unidad
 * - Optimizado para impresión A4
 * - Nombre único con fecha/hora
 */
export function PrintView({ items, language }: PrintViewProps) {
  const t = getTranslations(language as LanguageCode)
  
  // Agrupar por categoría (mostrar todos los productos, no solo marcados)
  const grouped = groupProductsByCategory(items)
  const categoryIds = getCategoriesInOrder()
  const allCategories = getAllCategories()

  // Crear un mapa de categorías por ID para búsqueda rápida
  const categoryMap = new Map(allCategories.map((cat) => [cat.id, cat]))

  // Configurar locales
  const localeMap: Record<LanguageCode, string> = {
    en: 'en-US',
    fr: 'fr-FR',
    de: 'de-DE',
    it: 'it-IT',
    roh: 'rm-CH',
  }

  // Obtener fecha actual
  const now = new Date()
  const dateFormatted = now.toLocaleDateString(localeMap[language], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Obtener hora para el nombre del PDF
  const timeFormatted =
    String(now.getHours()).padStart(2, '0') +
    ':' +
    String(now.getMinutes()).padStart(2, '0')
  
  // Labels localizados
  const dateLabel = t.ui.unit // Temporal, usar las traducciones existentes
  const timeLabel = t.ui.unit // Temporal

  if (items.length === 0) {
    return (
      <div className="printView printView--empty">
        <p className="emptyMessage">
          {t.print.noProducts}
        </p>
      </div>
    )
  }

  return (
    <div className="printView printView--interactive">
      {/* ENCABEZADO */}
      <div className="printView__header">
        <h1 className="printView__title">
          {t.pdf.restockingListTitle}
        </h1>
        <div className="printView__headerInfo">
          <p className="printView__date">
            <strong>Date: </strong>
            {dateFormatted}
          </p>
          <p className="printView__time">
            <strong>Time: </strong>
            {timeFormatted}
          </p>
          <p className="printView__fileName printView__printOnly">
            <em>({generatePdfFileName()})</em>
          </p>
        </div>
      </div>

      {/* CONTENIDO - TABLA POR CATEGORÍAS */}
      <div className="printView__content">
        {categoryIds
          .filter((categoryId) => grouped[categoryId as string])
          .map((categoryId) => {
            const category = categoryMap.get(categoryId as any)
            if (!category) return null

            const categoryItems = grouped[categoryId as string]
            const categoryName =
              language === 'en'
                ? category.nameEs // Usar nameEs como fallback por ahora
                : category.nameEs

            return (
              <section key={categoryId} className="printView__category">
                <h2 className="printView__categoryTitle">{categoryName}</h2>

                {/* TABLA CON RECUADROS INTERACTIVOS */}
                <div className="printView__tableWrapper">
                  <table className="printView__table printView__table--interactive">
                    <thead className="printView__tableHead printView__printOnly">
                      <tr>
                        <th className="printView__colCheckbox">
                          {'✓'}
                        </th>
                        <th className="printView__colProduct">
                          {t.form.productLabel}
                        </th>
                        <th className="printView__colQuantity">
                          {t.form.quantityLabel}
                        </th>
                        <th className="printView__colUnit">
                          {t.form.unitLabel}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryItems.map((item, index) => {
                        const productName = getProductName(item, language)

                        return (
                          <tr
                            key={item.id}
                            className={`printView__row ${
                              index % 2 === 0
                                ? 'printView__row--even'
                                : 'printView__row--odd'
                            }`}
                          >
                            {/* RECUADRO PARA MARCAR SI SE NECESITA */}
                            <td className="printView__colCheckbox">
                              <div className="printView__checkbox">
                                <input
                                  type="checkbox"
                                  className="printView__checkboxInput"
                                  defaultChecked={item.isOrderMarked}
                                  aria-label={`Needs ${productName}`}
                                />
                              </div>
                            </td>

                            {/* NOMBRE DEL PRODUCTO */}
                            <td className="printView__colProduct">
                              <span className="printView__productName">
                                {productName}
                              </span>
                            </td>

                            {/* CAMPO PARA ESCRIBIR CANTIDAD */}
                            <td className="printView__colQuantity">
                              <input
                                type="number"
                                className="printView__quantityInput"
                                defaultValue={item.orderQuantity ?? ''}
                                placeholder={item.quantity.toString()}
                                min="0"
                                step="0.1"
                                aria-label={`Quantity of ${productName}`}
                              />
                            </td>

                            {/* RECUADROS PARA SELECCIONAR UNIDAD */}
                            <td className="printView__colUnit">
                              <div className="printView__unitButtons">
                                {COMMON_UNITS.map((unit) => (
                                  <label
                                    key={unit}
                                    className={`printView__unitButton ${
                                      item.unit === unit
                                        ? 'printView__unitButton--selected'
                                        : ''
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name={`unit-${item.id}`}
                                      value={unit}
                                      defaultChecked={item.unit === unit}
                                      className="printView__unitRadio"
                                      aria-label={`${unit}`}
                                    />
                                    <span className="printView__unitLabel">
                                      {unit}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            )
          })}
      </div>

      {/* PIE DE PÁGINA */}
      <div className="printView__footer">
        <p className="printView__footerText">
          {false
            ? 'Lista generada por Lista de Reposición - Chef'
            : 'Liste générée par Lista de Reposición - Chef'}
        </p>
        <p className="printView__footerNote printView__printOnly">
          {false
            ? 'Marque los productos que se necesitan y escriba la cantidad'
            : 'Cochez les produits nécessaires et indiquez la quantité'}
        </p>
      </div>

      {/* INSTRUCCIONES PARA PANTALLA (OCULTAS EN IMPRESIÓN) */}
      <div className="printView__instructions printView__screenOnly">
        <h3>
          {false ? 'Instrucciones de Impresión' : 'Instructions d\'Impression'}
        </h3>
        <ul>
          <li>
            {false
              ? 'Marque el recuadro ✓ para productos que necesita'
              : 'Cochez ✓ pour les produits dont vous avez besoin'}
          </li>
          <li>
            {false
              ? 'Escriba la cantidad en el campo "Cantidad"'
              : 'Écrivez la quantité dans le champ "Quantité"'}
          </li>
          <li>
            {false
              ? 'Seleccione la unidad de medida correcta (kg, g, L, ml, u, doc)'
              : 'Sélectionnez la bonne unité (kg, g, L, ml, u, doc)'}
          </li>
          <li>
            {false
              ? 'Presione Ctrl+P (o Cmd+P) para imprimir'
              : 'Appuyez sur Ctrl+P (ou Cmd+P) pour imprimer'}
          </li>
        </ul>
      </div>
    </div>
  )
}
