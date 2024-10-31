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
import { useEffect, useMemo, useState } from "react";
import { TimeLogsService } from "@/services/TimeLogs/TimeLogsService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from "@/i18n";

export default function HomeScreen() {
  const colorScheme = useColorScheme();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [loadingBreak, setLoadingBreak] = useState(false);
  const [status, setStatus] = useState("Clock In");
  const [breakTitle, setBreakTitle] = useState("Start");

  const timeLogsService: TimeLogsService = useMemo(
    () => new TimeLogsService(),
    []
  );

  const loadStatus = async () => {
    const savedStatus = await AsyncStorage.getItem("status");
    if (savedStatus) {
      setStatus(savedStatus);
    }
  };

  const takeAction = async () => {
    setLoading(true);
    if (status === "Clock In") {
      toggleClock("ClockIn", "Clock In Successful", "Clock Out");
    } else {
      toggleClock("ClockOut", "Clock Out Successful", "Clock In");
    }
  };

  const toggleClock = async (
    method: string,
    msg: string,
    status?: string | null,
    breakHeader?: string | null
  ) => {
    setLoadingBreak(true);

    try {
      const response = await timeLogsService.takeAction({
        employeeId: "dsa",
        logAction: method,
      });
      Toast.show(msg);
      setLoading(false);

      if (status) {
        await AsyncStorage.setItem("status", status);
        setStatus(status);
      }
      if (breakHeader) setBreakTitle(breakHeader);

      setLoadingBreak(false);
      setData(response?.data);
    } catch (error: AxiosError | any) {
      console.log(error?.response.data.message);
      // if (error?.response?.status === 422 && error?.response?.data?.message) {
      Toast.show(error?.response?.data?.message);
      // }
      setLoading(false);
      setLoadingBreak(false);
    }
  };

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };

    loadLanguage();
  }, []);

  useEffect(() => {
    loadStatus();
  }, []);

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
        <Attendance
          loading={loading}
          takeAction={takeAction}
          toggleClock={toggleClock}
          status={status}
          breakTitle={breakTitle}
          loadingBreak={loadingBreak}
          setLoadingBreak={setLoadingBreak}
        />
        <Summary />
      </ScrollView>
    </SafeAreaView>
  );
}
