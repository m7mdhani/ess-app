import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { logs } from "@/data/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { Swipeable } from "react-native-gesture-handler";
import { TimeLogsService } from "@/services/TimeLogs/TimeLogsService";

const AttendanceHistory = () => {
  const colorScheme = useColorScheme();
  const [timeLogs, setTimeLogs] = useState([]);
  const timeLogsService = new TimeLogsService();

  const getTimeLogs = async () => {
    const response: any = await timeLogsService.getEmployeeTimeLogs({
      EmployeeId: "dsa",
    });
    console.log(response?.data);
    // setTimeLogs(logs);
  };

  useEffect(() => {
    getTimeLogs();
  }, []);

  return (
    <View className="gap-5 w-full justify-center">
      {logs?.length > 0 ? (
        logs.map((item) => (
          <View
            key={item.id}
            className={`flex-row rounded-full overflow-hidden gap-2 overflow-x-hidden border border-slate-200 p-2 items-center justify-start w-full  ${
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
