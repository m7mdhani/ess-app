import React from "react";
import { View, Text, Image, useColorScheme, Dimensions } from "react-native";
import { Link } from "expo-router";

const RequestItem = ({ item }: any) => {
  const colorScheme = useColorScheme();

  const { width } = Dimensions.get("window");

  const itemWidth = (width - 40) / 2;

  return (
    <Link href={item.href || "/"}>
      <View
        style={{
          width: itemWidth,
        }}
        className={`p-4 rounded-lg items-center shadow-lg ${
          colorScheme == "dark" ? "bg-sky-700" : "bg-white"
        }`}
      >
        <Image source={item.image} resizeMode="contain" className="w-32 h-32" />
        <Text
          className={`mt-2 font-semibold  ${
            colorScheme == "dark" ? "text-white" : "text-black"
          }`}
        >
          {item.title}
        </Text>
      </View>
    </Link>
  );
};

export default RequestItem;
