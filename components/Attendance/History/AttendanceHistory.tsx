import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React from "react";
import { logs } from "@/data/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { Swipeable } from "react-native-gesture-handler";

const AttendanceHistory = () => {
  const colorScheme = useColorScheme();

  const renderRightActions = () => (
    <View style={styles.actionsContainer} className="rounded-xl">
      <TouchableOpacity style={[styles.button, styles.edit]} className="">
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.delete]}
        className="rounded-tr-lg rounded-br-lg"
      >
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="gap-5 w-full justify-center">
      {logs?.length > 0 ? (
        logs.map((item) => (
          // <Swipeable
          //   renderRightActions={renderRightActions}
          //   key={item.id}
          //   childrenContainerStyle={{ marginBottom: 12 }}
          // >
          <View
            key={item.id}
            className={`flex-row rounded-full overflow-hidden gap-2 overflow-x-hidden border-l-2 p-2 items-center justify-start w-full  ${
              colorScheme == "dark" ? "bg-sky-900" : "bg-white"
            }`}
          >
            <View>
              <Ionicons
                name="finger-print"
                size={52}
                color={colorScheme == "light" ? Colors.light.icon : "white"}
              />
            </View>

            <View className="items-start">
              <Text
                className={`py-3 ml-2 font-bold ${
                  colorScheme == "dark" ? "text-white" : "text-gray-500"
                }`}
              >
                {item.clockDate}
              </Text>

              <View className="flex-row gap-3 justify-start">
                <View className="flex-row items-center gap-2">
                  <Ionicons
                    name="return-up-forward"
                    size={22}
                    color={colorScheme == "light" ? Colors.light.icon : "white"}
                  />
                  <Text
                    className={`font-bold  ${
                      colorScheme == "dark" ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {item.clockIn ?? "--"}
                  </Text>
                </View>

                <View className="flex-row items-center gap-2">
                  <Ionicons
                    name="return-down-forward"
                    size={22}
                    color={colorScheme == "light" ? Colors.light.icon : "white"}
                  />
                  <Text
                    className={`font-bold  ${
                      colorScheme == "dark" ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {item.clockOut ?? "--"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          // </Swipeable>
        ))
      ) : (
        <Text
          className={`  ${
            colorScheme == "dark" ? "text-white" : "text-gray-400"
          }`}
        >
          No attendance logs available.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 20,
    marginBottom: 2,
    backgroundColor: "#F1F1F1",
  },
  itemText: {
    fontSize: 15,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
  },
  button: {
    width: 80,
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  edit: {
    backgroundColor: "#ffab00",
  },
  delete: {
    backgroundColor: "#ff1744",
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default AttendanceHistory;
