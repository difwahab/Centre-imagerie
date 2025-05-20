import { useTranslation } from 'react-i18next';

export default function LangSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: 'fr' | 'ar') => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="flex gap-2 items-center">
      {/* Drapeau Algérie pour Français */}
      <button onClick={() => changeLanguage('fr')} className="text-sm font-medium hover:underline">
        🇩🇿 Français
      </button>
      <span>|</span>
      {/* Drapeau Algérie pour Arabe */}
      <button onClick={() => changeLanguage('ar')} className="text-sm font-medium hover:underline">
        🇩🇿 عربي
      </button>
    </div>
  );
}
