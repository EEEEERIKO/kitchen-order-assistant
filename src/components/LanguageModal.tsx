import { MdOutlineLanguage } from 'react-icons/md'
import { FiX } from 'react-icons/fi'
import styles from './LanguageModal.module.css'
import { useLanguage } from '../app/i18n/LanguageProvider'
import type { LanguageCode } from '../app/i18n/translations'

interface LanguageModalProps {
  isOpen: boolean
  onSelectLanguage: (language: LanguageCode) => void
  onClose: () => void
}

export function LanguageModal({
  isOpen,
  onSelectLanguage,
  onClose,
}: LanguageModalProps) {
  const { t } = useLanguage()
  
  if (!isOpen) return null

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX size={24} />
        </button>

        <div className={styles.header}>
          <MdOutlineLanguage size={32} />
          <h2>{t.languageModal.title}</h2>
        </div>

        <div className={styles.languageOptions}>
          <button
            className={styles.languageButton}
            onClick={() => {
              onSelectLanguage('en')
              onClose()
            }}
          >
            <span className={styles.flag}>🇬🇧</span>
            <span className={styles.languageName}>{t.languageModal.english}</span>
          </button>

          <button
            className={styles.languageButton}
            onClick={() => {
              onSelectLanguage('fr')
              onClose()
            }}
          >
            <span className={styles.flag}>🇫🇷</span>
            <span className={styles.languageName}>{t.languageModal.french}</span>
          </button>

          <button
            className={styles.languageButton}
            onClick={() => {
              onSelectLanguage('de')
              onClose()
            }}
          >
            <span className={styles.flag}>🇩🇪</span>
            <span className={styles.languageName}>Deutsch</span>
          </button>

          <button
            className={styles.languageButton}
            onClick={() => {
              onSelectLanguage('it')
              onClose()
            }}
          >
            <span className={styles.flag}>🇮🇹</span>
            <span className={styles.languageName}>Italiano</span>
          </button>

          <button
            className={styles.languageButton}
            onClick={() => {
              onSelectLanguage('roh')
              onClose()
            }}
          >
            <span className={styles.flag}>🇨🇭</span>
            <span className={styles.languageName}>Rumantsch</span>
          </button>
        </div>

        <p className={styles.hint}>
          {t.languageModal.selectLanguagePrompt}
        </p>
      </div>
    </div>
  )
}
