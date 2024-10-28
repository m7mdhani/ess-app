import { View, Text, Platform, useColorScheme } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const CreateRequestsLayout = () => {
  const backIcon = Platform.OS === "ios" ? "chevron-back" : "arrow-back-sharp";
  const colorScheme = useColorScheme();

  return (
    <Stack>
      <Stack.Screen
        name="overtimeRequest"
        options={{
          headerTitle: "Overtime Request",
          headerStyle: {
            backgroundColor: colorScheme == "dark" ? "#011127" : "#fff",
          },
          headerLeft: () => (
            <Ionicons
              name={backIcon}
              size={25}
              color={colorScheme == "dark" ? "white" : "black"}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <Stack.Screen
        name="missingtimeRequest"
        options={{
          headerTitle: "Missing time Request",
          headerStyle: {
            backgroundColor: colorScheme == "dark" ? "#011127" : "#fff",
          },
          headerLeft: () => (
            <Ionicons
              name={backIcon}
              size={25}
              color={colorScheme == "dark" ? "white" : "black"}
              onPress={() => router.back()}
            />
          ),
        }}
      />
    </Stack>
  );
};

export default CreateRequestsLayout;
