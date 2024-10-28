import { useTranslation } from "react-i18next";
import i18next from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager, LayoutAnimation, Platform } from "react-native";
import RNRestart from "react-native-restart";
import * as Updates from "expo-updates";

const useLanguageDirection = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const currentDirection = i18next.dir();
  const reverseFlexDir =
    currentDirection === "rtl" ? "flex-row-reverse" : "flex-row";

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);

    I18nManager.forceRTL(lang == "ar-EG");
    console.log(i18next.dir());
    // console.log(I18nManager.isRTL);

    if (i18next.dir() == "rtl" && Platform.OS !== "web") {
      console.log("should be RTL", lang == "ar-EG");
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      // Updates.reloadAsync();
      RNRestart.Restart();
    }

    LayoutAnimation.easeInEaseOut();
  };

  return {
    t,
    i18n,
    currentLanguage,
    currentDirection,
    reverseFlexDir,
    changeLanguage,
  };
};

export default useLanguageDirection;
