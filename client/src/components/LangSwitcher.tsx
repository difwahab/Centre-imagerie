import { useTranslation } from 'react-i18next';

export default function LangSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: 'fr' | 'ar') => {
    i18n.changeLanguage(lang);
    // La direction est déjà gérée globalement via le listener 'languageChanged' dans i18n.ts
  };

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => changeLanguage('fr')}
        className={`text-sm font-medium hover:underline ${i18n.language === 'fr' ? 'underline font-semibold' : ''}`}
        aria-label="Passer en français"
      >
        🇫🇷 Français
      </button>
      <span>|</span>
      <button
        onClick={() => changeLanguage('ar')}
        className={`text-sm font-medium hover:underline ${i18n.language === 'ar' ? 'underline font-semibold' : ''}`}
        aria-label="Passer en arabe"
      >
        🇩🇿 الجزائرية
      </button>
    </div>
  );
}
