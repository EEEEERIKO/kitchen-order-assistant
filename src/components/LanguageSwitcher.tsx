import { useLanguage } from '../app/i18n/LanguageProvider'
import type { LanguageCode } from '../app/i18n/translations'

const LANGUAGES: { code: LanguageCode; name: string; flag: string }[] = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
]

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-500 dark:text-gray-400 text-sm">
        <span className="material-symbols-outlined text-lg align-middle">language</span>
      </span>
      <div className="flex gap-1">
        {LANGUAGES.map(({ code, name, flag }) => (
          <button
            key={code}
            onClick={() => setLanguage(code)}
            title={name}
            className={`px-2 py-1 rounded text-sm font-medium transition-colors ${
              language === code
                ? 'bg-primary text-white dark:bg-white dark:text-primary'
                : 'bg-gray-100 text-gray-700 dark:bg-surface-dark dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span className="mr-1">{flag}</span>
            <span className="hidden sm:inline">{name.split(' ')[0]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
