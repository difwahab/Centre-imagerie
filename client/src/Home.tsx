import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export default function Home() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="p-6 text-center">
      {/* Affichage du logo situé dans client/public/logo.jpeg */}
      <img
        src="/logo.jpeg"
        alt="Logo Centre d’Imagerie Benameur"
        className="mx-auto mb-6 w-48 h-auto"
      />

      <div className="mb-4 space-x-2">
        <button onClick={() => i18n.changeLanguage('fr')}>🇫🇷 Français</button>
        <button onClick={() => i18n.changeLanguage('ar')}>🇩🇿 عربي</button>
      </div>

      <h1 className="text-xl font-bold">{t('home.welcome')}</h1>
      <p>{t('home.contact_us')}</p>
    </div>
  );
}
