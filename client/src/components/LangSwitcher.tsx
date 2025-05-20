import { useTranslation } from 'react-i18next';

export default function LangSwitcher() {
  const { i18n } = useTranslation();

  // Changer la langue et la direction du texte
  const changeLanguage = (lang: 'fr' | 'ar') => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="flex gap-3 items-center">
      {/* Bouton pour changer la langue en français */}
      <button
        onClick={() => changeLanguage('fr')}
        className="flex items-center gap-2 text-sm font-medium hover:underline focus:outline-none"
        aria-label="Passer à la langue française"
      >
        <span role="img" aria-label="Drapeau Algérie" className="text-xl">
          🇩🇿
        </span>
        Français
      </button>
      <span className="text-gray-500">|</span>
      {/* Bouton pour changer la langue en arabe */}
      <button
        onClick={() => changeLanguage('ar')}
        className="flex items-center gap-2 text-sm font-medium hover:underline focus:outline-none"
        aria-label="Passer à la langue arabe"
      >
        <span role="img" aria-label="Drapeau Algérie" className="text-xl">
          🇩🇿
        </span>
        عربي
      </button>
    </div>
  );
}
