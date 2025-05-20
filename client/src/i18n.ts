import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationFR from './locales/fr.json';
import translationAR from './locales/ar.json';

const resources = {
  fr: { translation: translationFR },
  ar: { translation: translationAR },
};

i18n
  .use(LanguageDetector) // Permet la détection automatique de la langue du navigateur
  .use(initReactI18next) // Intègre i18next avec React
  .init({
    resources,
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
    detection: {
      // Désactive la détection automatique si tu veux forcer manuellement la langue
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
  });

// Sauvegarde la langue à chaque changement
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng);
  document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
});

export default i18n;
