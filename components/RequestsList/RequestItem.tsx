import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

const RequestItem = ({ item, type, cancelRequest, loadingCancel }: any) => {
  const colorScheme = useColorScheme();

  const getItemStyle = (status: string) => {
    if (status === "Pending") {
      return "bg-yellow-500 rounded-lg text-white";
    } else if (status === "Cancelled") {
      return "bg-red-500 rounded-lg text-white";
    } else {
      return "bg-transparent text-black";
    }
  };

  return (
    <TouchableOpacity
      className="flex-row border-b border-gray-100 pb-2"
      onPress={() =>
        router.push({
          pathname: "/(ViewRequests)/view/[id]",
          params: { id: item.id, type },
        })
      }
    >
      <Text
        className={`flex-1 text-center text-xs ${
          colorScheme == "dark" ? "text-white" : "text-black"
        }`}
      >
        {new Date(item.requestDate).toLocaleDateString()}
      </Text>
      <Text
        className={`flex-1 text-center text-xs py-1 items-center justify-center ${getItemStyle(
          item.status
        )}`}
        style={{ lineHeight: 14 }}
      >
        {item.status}
      </Text>
      <Text
        className={`flex-1 text-center text-xs ${
          colorScheme == "dark" ? "text-white" : "text-black"
        }`}
      >
        {item.clockIn}
      </Text>
      <Text
        className={`flex-1 text-center text-xs ${
          colorScheme == "dark" ? "text-white" : "text-black"
        }`}
      >
        {item.clockOut}
      </Text>

      {loadingCancel ? (
        <ActivityIndicator size="large" color={"#F26651"} />
      ) : (
        <TouchableOpacity
          className="flex-1 items-center justify-center"
          disabled={item.status !== "Pending"}
          onPress={() => cancelRequest(item.id)}
        >
          {item.status === "Pending" ? (
            <Ionicons name="close-outline" size={20} color={"#F26651"} />
          ) : (
            <Text>-</Text>
          )}
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default RequestItem;
