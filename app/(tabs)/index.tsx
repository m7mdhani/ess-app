import Attendance from "@/components/Attendance/Attendance";
import Summary from "@/components/Summary/Summary";
import { Colors } from "@/constants/Colors";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  useColorScheme,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-root-toast";
import { AxiosError } from "axios";
import { useMemo, useState } from "react";
import { TimeLogsService } from "@/services/TimeLogs/TimeLogsService";
// import { useColorScheme } from "nativewind";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [status, setStatus] = useState("Clock In");
  const timeLogsService: TimeLogsService = useMemo(
    () => new TimeLogsService(""),
    []
  );

  const takeAction = async () => {
    setLoading(true);
    if (status === "Clock In") {
      toggleClock("ClockIn", "Clock In Successful", "Clock Out");
    } else {
      toggleClock("ClockOut", "Clock Out Successful", "Clock In");
    }
  };

  const toggleClock = async (method: string, msg: string, status: string) => {
    try {
      const response = await timeLogsService.takeAction({
        employeeTimeLogId: 34,
        logAction: method,
      });
      Toast.show(msg);
      setLoading(false);
      setStatus(status);

      // console.log(response?.data);
      setData(response?.data);
    } catch (error: AxiosError | any) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      className={`flex-1 ${
        colorScheme == "dark" ? "bg-[#011127]" : "bg-slate-50"
      }`}
    >
      <StatusBar style={`${colorScheme == "dark" ? "light" : "dark"}`} />

      <View
        className={`flex-row justify-between items-center  p-4  ${
          colorScheme == "dark" ? "bg-secondary" : "bg-slate-50"
        } border-b border-slate-300`}
      >
        <Text
          className={`font-bold text-xl  ${
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

      <ScrollView>
        <Attendance loading={loading} takeAction={takeAction} status={status} />
        <Summary />
      </ScrollView>
    </SafeAreaView>
  );
}
