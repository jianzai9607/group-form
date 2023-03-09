import moment from "moment/min/moment-with-locales";
import i18n from "@/i18n";
import { Language } from "@/enums/language";

const getDefaultState = () => {
  return {
    isLoading: false,
    language: Language.english // system
  };
};

export default {
  state: () => getDefaultState(),
  getters: {
    isLoading: (state) => state.isLoading,
    language: (state) => state.language
  },
  mutations: {
    resetState(state) {
      Object.assign(state, getDefaultState());
    },
    setState(state, newState) {
      Object.assign(state, newState);
    }
  },
  actions: {
    initLanguage() {
      const locale = getDefaultState().language.locale;
      moment.locale(locale);
      i18n.global.locale = locale;
    },
    setLanguage(context, language) {
      moment.locale(language.locale);
      i18n.global.locale = language.locale;
      context.commit("setState", { language });
    },
    showLoading(context) {
      context.commit("setState", { isLoading: true });
    },
    hideLoading(context) {
      context.commit("setState", { isLoading: false });
    }
  }
};
