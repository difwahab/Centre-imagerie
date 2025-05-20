import React from 'react';
import { useTranslation } from 'react-i18next';

const LangSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: 'fr' | 'ar') => {
    console.log('Changing language to:', lang); // Log pour vérifier le changement de langue
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={() => changeLanguage('fr')}
        className="text-sm font-medium hover:underline"
      >
        🇩🇿 Français
      </button>
      <span>|</span>
      <button
        onClick={() => changeLanguage('ar')}
        className="text-sm font-medium hover:underline"
      >
        🇩🇿 عربي
      </button>
    </div>
  );
};

export default LangSwitcher;
