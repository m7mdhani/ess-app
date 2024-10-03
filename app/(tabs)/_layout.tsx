import { Tabs } from "expo-router";
import React, { useRef } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { Animated, Platform, useColorScheme, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const defaultColor = "#7E7E7E";

  const homeBorderWidth = useRef(new Animated.Value(0)).current;
  const attendanceBorderWidth = useRef(new Animated.Value(0)).current;
  const requestsBorderWidth = useRef(new Animated.Value(0)).current;
  const profileBorderWidth = useRef(new Animated.Value(0)).current;

  // Function to animate the border width
  const animateBorder = (borderValue: Animated.Value, focused: boolean) => {
    Animated.timing(borderValue, {
      toValue: focused ? 2 : 0, // 2px border when focused, 0 when not
      duration: 300, // Adjust the duration to control speed
      useNativeDriver: false,
    }).start();
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: defaultColor,
        headerShown: false,
        headerShadowVisible: false,
        tabBarStyle: {
          height: Platform.OS == "android" ? 65 : 100,
          alignItems: "center",
          backgroundColor: colorScheme == "light" ? "#fff" : "#051427",
          borderTopColor: "#eee",
        },
        tabBarLabelStyle: {
          paddingVertical: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                borderTopColor: focused ? Colors.light.primary : "transparent",
                borderTopWidth: 2,
                height: "100%",
                paddingTop: 10,
                width: "60%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TabBarIcon
                name={"home-outline"}
                color={focused ? Colors.light.primary : defaultColor}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="attendance"
        options={{
          title: "Attendance",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                borderTopColor: focused ? Colors.light.primary : "transparent",
                borderTopWidth: 2,
                height: "100%",
                paddingTop: 10,
                width: "60%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TabBarIcon
                name={"calendar-outline"}
                color={focused ? Colors.light.primary : defaultColor}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="createRequest"
        options={{
          title: "",
          tabBarLabelStyle: { display: "none" },
          tabBarIcon: () => (
            <View className="rounded-full w-14 h-14 justify-center items-center bg-primary bottom-5">
              <TabBarIcon name={"add"} color={"#fff"} size={30} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: "Requests",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                borderTopColor: focused ? Colors.light.primary : "transparent",
                borderTopWidth: 2,
                height: "100%",
                paddingTop: 10,
                width: "60%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TabBarIcon
                name={"file-tray-outline"}
                color={focused ? Colors.light.primary : defaultColor}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                borderTopColor: focused ? Colors.light.primary : "transparent",
                borderTopWidth: 2,
                height: "100%",
                paddingTop: 10,
                width: "60%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TabBarIcon
                name={"person-outline"}
                color={focused ? Colors.light.primary : defaultColor}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
