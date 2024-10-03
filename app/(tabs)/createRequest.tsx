import RequestItem from "@/components/RequestItem/RequestItem";
import { allRequests } from "@/data/data";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Animated,
  FlatList,
  View,
  Text,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width * 0.7; // Width of each item
const ITEM_SPACING = (width - ITEM_WIDTH) / 2; // Space between items

const data = [
  { key: "1", title: "Item 1" },
  { key: "2", title: "Item 2" },
  { key: "3", title: "Item 3" },
  { key: "4", title: "Item 4" },
];

const CreateRequest = () => {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaView
      className={`flex-1 ${
        colorScheme == "dark" ? "bg-[#011127]" : "bg-slate-50"
      }`}
    >
      <StatusBar style={`${colorScheme == "dark" ? "light" : "dark"}`} />

      <View
        className={`flex-row justify-between items-center p-4 border-b border-slate-300 ${
          colorScheme == "dark" ? "bg-[#011127]" : "bg-slate-50"
        }`}
      >
        <Text
          className={`font-bold text-xl ${
            colorScheme == "dark" ? "text-white" : "text-black"
          }`}
        >
          Mohamed Hani
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

      <View className="flex-1 justify-center my-4">
        <FlatList
          data={allRequests}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          ListHeaderComponent={() => (
            <Text className="font-semibold text-gray-500 ml-3 mb-3 text-lg">
              Create Request
            </Text>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: "stretch",
            marginHorizontal: 4,
          }}
          renderItem={({ item }) => <RequestItem item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-between", // Distributes items across the row
    paddingHorizontal: 10,
    marginBottom: 20, // Space between rows
  },
  itemContainer: {
    backgroundColor: "#6a9fb5",
    // width: ITEM_WIDTH,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  itemText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default CreateRequest;
