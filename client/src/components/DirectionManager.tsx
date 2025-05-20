import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function DirectionManager() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return null;
}
