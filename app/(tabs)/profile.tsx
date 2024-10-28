import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  I18nManager,
  Platform,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";
import useLanguageDirection from "@/hooks/useLanguageDirection";
import { getLocales } from "expo-localization";

const Profile = () => {
  const colorScheme = useColorScheme();

  const {
    t,
    currentDirection,
    currentLanguage,
    reverseFlexDir,
    changeLanguage,
  } = useLanguageDirection();

  return (
    <SafeAreaView
      className={`flex-1 ${
        colorScheme === "dark" ? "bg-[#011127]" : "bg-slate-50"
      }`}
    >
      <StatusBar animated style={colorScheme === "dark" ? "light" : "dark"} />

      <View>
        <Text>{I18nManager.isRTL ? " RTL" : " LTR"}</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="m-4">
          <View className="flex-row gap-3 items-center">
            <Image
              source={require("../../assets/images/logo.png")}
              className={`rounded-full w-14 h-14 border ${
                colorScheme === "dark" ? "border-white" : "border-slate-400"
              }`}
              resizeMode="contain"
            />

            <View>
              <Text
                className={`font-semibold text-lg  ${
                  colorScheme === "dark" ? "text-gray-100" : "text-black"
                }`}
              >
                Mohamed Hani
              </Text>
              <Text
                className={` ${
                  colorScheme === "dark" ? "text-white" : "text-gray-500"
                }`}
              >
                mohamed.hani@applogica.com
              </Text>
            </View>
          </View>

          {/* Preferences Section */}
          <View className="my-4">
            <Text className="font-semibold text-md text-gray-400">
              {t("profile.preferences")}
            </Text>
            <View
              className={`${
                colorScheme === "dark" ? "bg-sky-900" : "bg-white"
              }  rounded-xl mt-4 p-3`}
            >
              <TouchableOpacity
                onPress={() =>
                  changeLanguage(currentLanguage == "en-US" ? "ar-EG" : "en-US")
                }
              >
                <View
                  className={`flex-row gap-3 mb-3 items-center pb-3 border-b border-gray-100 ${reverseFlexDir}`}
                >
                  <View className="bg-slate-100 w-12 h-12 p-3 rounded-full">
                    <Ionicons
                      name="newspaper-sharp"
                      size={25}
                      color="primary"
                    />
                  </View>
                  <Text
                    className={` font-semibold ${
                      colorScheme === "dark" ? "text-gray-300" : "text-black"
                    }`}
                  >
                    {t("profile.language")}
                  </Text>
                </View>
              </TouchableOpacity>

              <View className={`flex-row gap-3 items-center ${reverseFlexDir}`}>
                <View className="bg-slate-100 w-12 h-12 p-3 rounded-full">
                  <Ionicons name="notifications" size={25} color="primary" />
                </View>
                <Text
                  className={` font-semibold ${
                    colorScheme === "dark" ? "text-gray-300" : "text-black"
                  }`}
                >
                  {t("profile.notifications")}
                </Text>
              </View>
            </View>
          </View>

          {/* Password & Security Section */}
          <View className="my-4">
            <Text className="font-semibold text-md text-gray-400">
              {t("profile.password&security")}
            </Text>
            <View
              className={`rounded-xl mt-4 p-3 ${
                colorScheme === "dark" ? "bg-sky-900" : "bg-white"
              }`}
            >
              <View
                className={`flex-row justify-between items-center ${reverseFlexDir}`}
              >
                <View
                  className={`flex-row items-center gap-3 ${reverseFlexDir}`}
                >
                  <View className="bg-slate-100 w-12 h-12 p-3 rounded-full">
                    <Ionicons name="lock-closed" size={25} color="primary" />
                  </View>
                  <Text
                    className={` ${
                      colorScheme === "dark" ? "text-gray-300" : "ktext-blac"
                    } font-semibold`}
                  >
                    {t("profile.changePassword")}
                  </Text>
                </View>
                <Ionicons
                  name={
                    currentDirection == "ltr"
                      ? "chevron-forward"
                      : "chevron-back"
                  }
                  color={colorScheme === "light" ? "black" : "white"}
                  size={22}
                />
              </View>
            </View>
          </View>

          {/* About Section */}
          <View className="mt-4">
            <Text className="font-semibold text-md text-gray-400">
              {t("profile.about")}
            </Text>
            <View
              className={` ${
                colorScheme === "dark" ? "bg-sky-900" : "bg-white"
              } rounded-xl mt-4 p-3`}
            >
              <View
                className={`flex-row justify-between items-center ${reverseFlexDir}`}
              >
                <View
                  className={`flex-row items-center gap-3 ${reverseFlexDir}`}
                >
                  <View className="bg-slate-100 w-12 h-12 p-3 rounded-full">
                    <Ionicons name="phone-portrait" size={25} color="primary" />
                  </View>
                  <Text
                    className={` ${
                      colorScheme === "dark" ? "text-gray-300 " : "text-black"
                    }  font-semibold`}
                  >
                    {t("profile.aboutTheApp")}
                  </Text>
                </View>
                <Ionicons
                  name={
                    currentDirection == "ltr"
                      ? "chevron-forward"
                      : "chevron-back"
                  }
                  color={colorScheme === "light" ? "black" : "white"}
                  size={22}
                />
              </View>
            </View>

            <View
              className={`${
                colorScheme === "dark" ? "bg-sky-900" : "bg-white"
              } rounded-xl mt-4 p-3`}
            >
              <View
                className={`flex-row justify-between items-center ${reverseFlexDir}`}
              >
                <View
                  className={`flex-row items-center gap-3 ${reverseFlexDir}`}
                >
                  <View className="bg-slate-100 w-12 h-12 p-3 rounded-full">
                    <Ionicons name="call" size={25} color="primary" />
                  </View>
                  <Text
                    className={` ${
                      colorScheme === "dark" ? "text-gray-300" : "text-black"
                    } font-semibold`}
                  >
                    {t("profile.contactUs")}
                  </Text>
                </View>
                <Ionicons
                  name={
                    currentDirection == "ltr"
                      ? "chevron-forward"
                      : "chevron-back"
                  }
                  color={colorScheme === "light" ? "black" : "white"}
                  size={22}
                />
              </View>
            </View>

            <View
              className={` ${
                colorScheme === "dark" ? "bg-sky-900" : "bg-white"
              } rounded-xl mt-4 p-3`}
            >
              <View
                className={`flex-row justify-between items-center ${reverseFlexDir}`}
              >
                <View
                  className={`flex-row items-center gap-3 ${reverseFlexDir}`}
                >
                  <View className="bg-slate-100 w-12 h-12 p-3 rounded-full">
                    <Ionicons name="terminal" size={25} color="primary" />
                  </View>
                  <Text
                    className={` ${
                      colorScheme === "dark" ? "text-gray-300" : "text-black"
                    } font-semibold`}
                  >
                    {t("profile.terms")}
                  </Text>
                </View>
                <Ionicons
                  name={
                    currentDirection == "ltr"
                      ? "chevron-forward"
                      : "chevron-back"
                  }
                  color={colorScheme === "light" ? "black" : "white"}
                  size={22}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
