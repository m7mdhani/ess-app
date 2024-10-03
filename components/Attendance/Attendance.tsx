import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Attendance = ({ loading, takeAction, status }: any) => {
  const colorScheme = useColorScheme();

  return (
    <View
      className={`rounded-lg p-4 shadow-sm mx-4 my-5 border  ${
        colorScheme == "dark"
          ? "border-sky-900 bg-sky-900"
          : "border-slate-100 bg-white"
      }`}
    >
      <Text
        className={`font-semi-bold text-lg border-b border-slate-100 pb-2 ${
          colorScheme == "dark" ? "text-white" : "text-black"
        }`}
      >
        Attendance
      </Text>

      <View className="mt-4 items-center">
        <Text
          className={`font-extrabold text-3xl ${
            colorScheme == "dark" ? "text-white" : "text-black"
          }`}
        >
          09:30 AM
        </Text>
        <Text
          className={`font-semibold mt-2  ${
            colorScheme == "dark" ? "text-gray-100" : "text-gray-600"
          }`}
        >
          Today's shift: 08:00 AM -- 5:00 PM
        </Text>
        <View
          className={`flex-row items-center gap-1  mt-1  ${
            colorScheme == "dark" ? "text-gray-100" : "text-gray-600"
          }`}
        >
          <Ionicons
            name="location-outline"
            size={22}
            color={colorScheme == "dark" ? "white" : "black"}
          />
          <Text
            className={`font-semibold  ${
              colorScheme == "dark" ? "text-gray-100" : "text-gray-600"
            }`}
          >
            Head Office
          </Text>
        </View>

        <TouchableOpacity
          className="p-3 w-full bg-[#F26651] mt-4 rounded-lg"
          onPress={takeAction}
          disabled={loading}
        >
          <View className="flex-row items-center justify-center gap-2">
            {loading ? (
              <ActivityIndicator size={30} color="white" />
            ) : (
              <>
                <Ionicons
                  name="finger-print-outline"
                  size={30}
                  color={"#fff"}
                />
                <Text className="text-white text-center text-lg">{status}</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Attendance;
