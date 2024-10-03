import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  useColorScheme,
  Appearance,
  LayoutAnimation,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "expo-status-bar";

const Profile = () => {
  const colorScheme = useColorScheme();
  const scheme = colorScheme;

  const toggleColorScheme = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Smooth transition
    if (Platform.OS !== "web") {
      const newScheme = scheme === "dark" ? "light" : "dark";
      Appearance.setColorScheme(newScheme);
      // setScheme(newScheme);
    }
  };

  return (
    <SafeAreaView
      className={`flex-1 ${
        colorScheme === "dark" ? "bg-[#011127]" : "bg-slate-50"
      }`}
    >
      <StatusBar animated style={colorScheme === "dark" ? "light" : "dark"} />

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

            {/* Toggle dark/light mode button */}
            {/* <TouchableOpacity
              className="p-3 bg-slate-100 rounded-full"
              onPress={toggleColorScheme}
            >
              <Ionicons
                name={
                  colorScheme === "light" ? "sunny-outline" : "moon-outline"
                }
                size={22}
              />
            </TouchableOpacity> */}
          </View>

          {/* Preferences Section */}
          <View className="my-4">
            <Text className="font-semibold text-md text-gray-400">
              Preferences
            </Text>
            <View
              className={`${
                colorScheme === "dark" ? "bg-sky-900" : "bg-white"
              }  rounded-xl mt-4 p-3`}
            >
              <View className="flex-row gap-3 mb-3 items-center pb-3 border-b border-gray-100">
                <View className="bg-slate-100 w-12 h-12 p-3 rounded-full">
                  <Ionicons name="newspaper-sharp" size={25} color="primary" />
                </View>
                <Text
                  className={` font-semibold ${
                    colorScheme === "dark" ? "text-gray-300" : "text-black"
                  }`}
                >
                  English
                </Text>
              </View>

              <View className="flex-row gap-3 items-center">
                <View className="bg-slate-100 w-12 h-12 p-3 rounded-full">
                  <Ionicons name="notifications" size={25} color="primary" />
                </View>
                <Text
                  className={` font-semibold ${
                    colorScheme === "dark" ? "text-gray-300" : "text-black"
                  }`}
                >
                  On
                </Text>
              </View>
            </View>
          </View>

          {/* Password & Security Section */}
          <View className="my-4">
            <Text className="font-semibold text-md text-gray-400">
              Password & Security
            </Text>
            <View
              className={`rounded-xl mt-4 p-3 ${
                colorScheme === "dark" ? "bg-sky-900" : "bg-white"
              }`}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                  <View className="bg-slate-100 w-12 h-12 p-3 rounded-full">
                    <Ionicons name="lock-closed" size={25} color="primary" />
                  </View>
                  <Text
                    className={` ${
                      colorScheme === "dark" ? "text-gray-300" : "ktext-blac"
                    } font-semibold`}
                  >
                    Change password
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  color={colorScheme === "light" ? "black" : "white"}
                  size={22}
                />
              </View>
            </View>
          </View>

          {/* About Section */}
          <View className="mt-4">
            <Text className="font-semibold text-md text-gray-400">About</Text>
            <View
              className={` ${
                colorScheme === "dark" ? "bg-sky-900" : "bg-white"
              } rounded-xl mt-4 p-3`}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                  <View className="bg-slate-100 w-12 h-12 p-3 rounded-full">
                    <Ionicons name="phone-portrait" size={25} color="primary" />
                  </View>
                  <Text
                    className={` ${
                      colorScheme === "dark" ? "text-gray-300 " : "text-black"
                    }  font-semibold`}
                  >
                    About the App
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
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
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                  <View className="bg-slate-100 w-12 h-12 p-3 rounded-full">
                    <Ionicons name="call" size={25} color="primary" />
                  </View>
                  <Text
                    className={` ${
                      colorScheme === "dark" ? "text-gray-300" : "text-black"
                    } font-semibold`}
                  >
                    Contact Us
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
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
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-3">
                  <View className="bg-slate-100 w-12 h-12 p-3 rounded-full">
                    <Ionicons name="terminal" size={25} color="primary" />
                  </View>
                  <Text
                    className={` ${
                      colorScheme === "dark" ? "text-gray-300" : "text-black"
                    } font-semibold`}
                  >
                    Terms & Conditions
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
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
