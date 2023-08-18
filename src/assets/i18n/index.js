import ko from './lang/ko.json'
import en from './lang/en.json'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  leagacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    ko: ko,
    en: en
  }

})

export default i18n
