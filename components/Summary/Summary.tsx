import React from "react";
import { View, Text, useColorScheme } from "react-native";
import { analytics } from "@/data/data";

const Summary = () => {
  const colorScheme = useColorScheme();

  return (
    <View
      className={`rounded-lg p-4 mb-4 shadow-sm mx-4 border ${
        colorScheme == "dark"
          ? "border-sky-900 bg-sky-900"
          : "border-slate-100 bg-white"
      }`}
    >
      <View
        className={`flex-row gap-2 items-center  border-b border-slate-100 pb-2`}
      >
        <Text
          className={`font-bold text-lg pb-2  ${
            colorScheme == "dark" ? "text-white" : "text-black"
          }`}
        >
          Summary
        </Text>

        <Text className="bg-slate-100 text-sm font-semibold text-slate-500 p-2 rounded-full overflow-hidden">
          February
        </Text>
      </View>

      <View className="items-center">
        {analytics?.map((item) => (
          <View
            key={item.id}
            className="flex-row justify-between items-center w-full border-b border-slate-100 py-3"
          >
            <View className="flex-row items-center gap-2 justify-between">
              <View
                className={`w-2 h-2 rounded-full bg-green-600 bg-${item.color} `}
              ></View>
              <Text
                className={`font-semibold  ${
                  colorScheme == "dark" ? "text-white" : "text-black"
                }`}
              >
                {item.title}
              </Text>
            </View>
            <Text
              className={`font-bold  ${
                colorScheme == "dark" ? "text-white" : "text-black"
              }`}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Summary;
