import Attendance from "@/components/Attendance/Attendance";
import AttendanceHistory from "@/components/Attendance/History/AttendanceHistory";
import Summary from "@/components/Summary/Summary";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack } from "expo-router";
import {
  Image,
  StyleSheet,
  Platform,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1  ${
        colorScheme == "dark" ? "bg-[#011127]" : "bg-slate-50"
      }`}
    >
      <StatusBar style={`${colorScheme == "dark" ? "light" : "dark"}`} />

      <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
        <View className="rounded-lg p-4 mb-4">
          <View className="w-full gap-2 items-center pb-2">
            <Text
              className={`font-bold text-lg pb-2 text-center   ${
                colorScheme == "dark" ? "text-white" : "text-black"
              }`}
            >
              Attendance & Leave
            </Text>

            <Ionicons
              name="finger-print"
              size={120}
              color={colorScheme == "light" ? "black" : "white"}
            />
          </View>

          <Text
            className={`font-bold text-lg py-5 ${
              colorScheme == "dark" ? "text-white" : "text-black"
            }`}
          >
            All Attendees
          </Text>
          <GestureHandlerRootView className="flex-1">
            <AttendanceHistory />
          </GestureHandlerRootView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
