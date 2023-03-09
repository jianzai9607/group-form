import enGB from "ant-design-vue/es/locale/en_GB";
import zhCN from "ant-design-vue/es/locale/zh_CN";

export const Language = Object.freeze({
  english: {
    id: 1,
    localizedString: "english",
    locale: "en-GB",
    antdLocale: enGB
  },
  chinese: {
    id: 2,
    localizedString: "chinese",
    locale: "zh-CN",
    antdLocale: zhCN
  }
});

export const LanguageDetail = Object.freeze({
  getLanguageByLocale: (locale) => {
    return (
      Object.values(Language).find(
        (language) => language.locale.toLowerCase() == locale.toLowerCase()
      ) ?? Language.english
    );
  }
});
