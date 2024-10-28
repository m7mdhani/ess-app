import React, { useState } from "react";
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
  FlatList,
  useColorScheme,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import RequestCard from "@/components/Requests/requestCard";
import { requestsData } from "@/data/data";
import { StatusBar } from "expo-status-bar";
import RequestsList from "@/components/RequestsList/RequestsList";

const Requests = () => {
  const [active, setActive] = useState("1");
  const colorScheme = useColorScheme();
  const [data, setData] = useState([]);

  return (
    <SafeAreaView
      className={`flex-1  ${
        colorScheme == "dark" ? "bg-[#011127] " : "bg-white"
      }`}
    >
      <StatusBar style={`${colorScheme == "dark" ? "light" : "dark"}`} />

      <View
        className={`flex-row justify-between items-center p-4  border-b border-slate-300 ${
          colorScheme == "dark" ? "bg-[#011127]" : "bg-white"
        }`}
      >
        <Text
          className={`font-bold text-xl  ${
            colorScheme == "dark" ? "text-white" : "text-black"
          }`}
        >
          Requests
        </Text>

        <View className="gap-3 flex-row items-center">
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              color={Colors.light.primary}
              size={25}
            />
          </TouchableOpacity>

          <Image
            source={require("../../assets/images/logo.png")}
            className="rounded-full w-8 h-8"
            resizeMode="contain"
          />
        </View>
      </View>

      <FlatList
        data={requestsData}
        horizontal={true}
        className={`px-4  gap-3 max-h-[20%]  ${
          colorScheme == "dark" ? "bg-[#011127]" : "bg-white"
        }`}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RequestCard
            title={item.title}
            icon={item.icon}
            bgColor={Colors.light.primary}
            active={active === item.id}
            setActive={() => setActive(item.id)}
          />
        )}
        contentContainerStyle={{
          paddingHorizontal: 16,
          backgroundColor: colorScheme == "light" ? "#fff" : "#051427",
          gap: 15,
          marginTop: 16,
        }}
      />

      <View className="flex-1">
        <RequestsList type={active} />
      </View>
    </SafeAreaView>
  );
};

export default Requests;
