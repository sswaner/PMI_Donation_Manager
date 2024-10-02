import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: require('./locales/en/translation.json'),
      },
      id: {
        translation: require('./locales/id/translation.json'),
      },
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;