// i18n.jsx
import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json'
        },
        fallbackLng: {
            'en-US': ['en-US'],     // Map 'en-US' to 'en'
            'en-GB': ['en-US'],     // Map 'en-GB' to 'en'
            'id-ID': ['id'],     // Map 'id-ID' to 'id'
            default: ['en']      // Use 'en' as the fallback for other languages
        },
        supportedLngs: ['en', 'id'],  // Explicitly support English and Indonesian
        debug: true,
    });

export default i18n;