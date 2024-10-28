import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/en-US/translation.json";
import translationAR from "./locales/ar-EG/translation.json";

const resources = {
  "en-US": { translation: translationEn },
  "ar-EG": { translation: translationAR },
};

const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    savedLanguage = Localization.locale;
  }

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    // lng: savedLanguage,
    lng: Localization.locale.includes('es') ? 'es' : 'en', // Set initial language based on device locale
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false,
    },
  });
};

initI18n();

export default i18n;
