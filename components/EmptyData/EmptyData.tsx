import { View, Text, Image, useColorScheme } from "react-native";
import React from "react";

const EmptyData = () => {
  const colorScheme = useColorScheme();

  return (
    <View className="flex-1 items-center justify-center">
      <Image
        source={require("../../assets/images/nodata.png")}
        className="w-full"
        resizeMode="contain"
      />
      <Text
        className={`text-center text-lg -mt-10 ${
          colorScheme == "dark" ? "text-white" : "text-black"
        }`}
      >
        Oops, No Data Found
      </Text>
    </View>
  );
};

export default EmptyData;
