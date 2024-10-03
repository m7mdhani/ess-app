import React from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const RequestCard = ({ title, icon, bgColor, active, setActive }: any) => {
  const colorScheme = useColorScheme();

  const getActiveColor = (): string => "#fff";
  const getLightSchemeColor = (): string => "#e5e7eb";
  const getDarkSchemeColor = (): string => "#051427";

  const getIconColor = (colorScheme: string | undefined | null): string => {
    if (isActive()) {
      return getActiveColor();
    } else if (isLightScheme(colorScheme)) {
      return getLightSchemeColor();
    } else {
      return getDarkSchemeColor();
    }
  };

  // Helper method to determine if the state is active
  const isActive = (): boolean => {
    return active;
  };

  // Helper method to determine if the color scheme is light
  const isLightScheme = (colorScheme: string | undefined | null): boolean => {
    return colorScheme === "light";
  };

  return (
    <TouchableOpacity onPress={setActive} className="items-center mt-1">
      <View
        className={`p-3 rounded-full border`}
        style={{
          borderColor: active ? bgColor : "#e5e7eb",
          backgroundColor: active ? bgColor : "#fff",
        }}
      >
        <Ionicons name={icon} size={28} color={getIconColor(active)} />
      </View>
      <View className="mt-2">
        <Text
          className={`font-semibold text-center  ${
            active ? "text-[#f26651]" : "text-gray-500"
          }`}
          style={{
            textAlign: "center",
            width: 80,
            flexWrap: "wrap",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RequestCard;
