import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'ru'], // to prevent errors if the user's detected lang is not available
    load: 'languageOnly', // to look up for only language (for 'en' and not for 'en-US')
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'gqlLng',
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    debug: false,
  });

export default i18n;
