'server-only'

export const getLanguageData = async (locale = "en", fileName: any) => {
  let lang = locale == 'favicon.ico' ? "en" : locale
  const languages: any = {
    en: () => import(`../../app/i18n/locales/en/${fileName}.json`).then((module) => module.default),
    hi: () => import(`../../app/i18n/locales/hi/${fileName}.json`).then((module) => module.default),
    te: () => import(`../../app/i18n/locales/te/${fileName}.json`).then((module) => module.default),
  }
  return languages[lang]();
}