import { createI18n } from "vue-i18n";
import store from "@/store/store";
/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
  const locales = import.meta.globEager("./locales/*.json");

  const messages = {};
  Object.keys(locales).forEach((key) => {
    const matched = key.match(/app_([A-Za-z0-9-_]+)\./i);

    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales[key].default;
    }
  });
  return messages;
}

function getLocale() {
  try {
    return store.getters["language"].locale || import.meta.env.VUE_APP_I18N_LOCALE || "en-GB";
  } catch (e) {
    return import.meta.env.VUE_APP_I18N_LOCALE || "en-GB";
  }
}

export default createI18n({
  locale: getLocale(),
  fallbackLocale: import.meta.env.VUE_APP_I18N_FALLBACK_LOCALE || "en-GB",
  messages: loadLocaleMessages(),
  globalInjection: true,
  fallbackRoot: true,
  silentTranslationWarn: true,
  silentFallbackWarn: true
});
