import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// This is in case we want to have the Node.js backend handle default languages
// Express middleware to detect user's preferred language from headers
//app.use((req, res, next) => {
  //const language = req.headers['accept-language'] || 'en';
  //res.locals.language = language.startsWith('id') ? 'id' : 'en';
  //next();
//});
// Pass the detected language to the frontend (e.g., through a template or API)

// Function to detect the user's preferred language
const getInitialLanguage = () => {
  // Check if language is stored in session/local storage
  const savedLanguage = localStorage.getItem('language') || sessionStorage.getItem('language');
  if (savedLanguage) return savedLanguage;

  // Default to the browser's language, or fallback to English
  const browserLanguage = navigator.language || navigator.userLanguage;
  return browserLanguage.startsWith('id') ? 'id' : 'en'; // Detect Bahasa Indonesia or default to English
};

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
    lng: getInitialLanguage(), // Set initial language here
    fallbackLng: 'en', // Fallback language
    interpolation: {
      escapeValue: false, // React already safes from XSS
    },
  });

export default i18n;