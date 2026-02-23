import en from './en.json';
import am from './am.json';
import or from './or.json';

const locales = { en, am, or };

export function getTranslations(lang) {
  return locales[lang] || locales.en;
}

export function t(key, lang) {
  const translations = getTranslations(lang);
  return key.split('.').reduce((obj, k) => obj?.[k], translations);
}
