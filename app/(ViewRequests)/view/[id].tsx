import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { OvertimeRequestService } from "@/services/OvertimeRequest/OvertimeRequestService";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MissedDurationRequestService } from "@/services/MissedDuration/MissedDurationService";

const ViewRequest = () => {
  const { id, type } = useLocalSearchParams();
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const getRequestById = async () => {
    setLoading(true);
    checkRequestType();
  };

  function checkRequestType() {
    if (+type === 2) {
      getOverTimeRequest();
    } else if (+type === 3) {
      getMissedTimeRequest();
    }
  }

  console.log(type);

  const getOverTimeRequest = async () => {
    console.log("here");
    try {
      const overtimeInstance = new OvertimeRequestService("");
      const response: any = await overtimeInstance.getOvertimeRequestById(id);

      if (response?.status === 200) {
        setLoading(false);

        const {
          status,
          requestDate,
          overTime,
          reason,
          attendanceDate,
          clockIn,
          clockOut,
          approvalComment,
          approvalDate,
        }: any = response.data;
        setData({
          status,
          requestDate,
          overTime,
          reason,
          attendanceDate,
          clockIn,
          clockOut,
          approvalComment,
          approvalDate,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getMissedTimeRequest = async () => {
    try {
      const missedTimeInstance = new MissedDurationRequestService("");
      const response: any = await missedTimeInstance.getMissedRequestById(id);

      if (response?.status === 200) {
        setLoading(false);

        const {
          status,
          requestDate,
          overTime,
          reason,
          attendanceDate,
          clockIn,
          clockOut,
          approvalComment,
          approvalDate,
        }: any = response.data;
        setData({
          status,
          requestDate,
          overTime,
          reason,
          attendanceDate,
          clockIn,
          clockOut,
          approvalComment,
          approvalDate,
        });
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatLabel = (key: any) => {
    return key
      .replace(/([A-Z])/g, " $1") // Add a space before uppercase letters
      .replace(/^./, (str: any) => str.toUpperCase()) // Capitalize the first letter
      .trim(); // Trim any leading or trailing spaces
  };

  useEffect(() => {
    getRequestById();
  }, [type, id]);

  console.log(data);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <Stack.Screen options={{ headerTitle: `View Request` }} />

      {loading ? (
        <ActivityIndicator size={30} color="#F26651" />
      ) : (
        <ScrollView>
          <View className="px-4">
            {Object.keys(data).map((key) => (
              <View key={key} className="mb-4">
                <Text className="text-lg mb-2">{formatLabel(key)}</Text>
                <TextInput
                  className="border p-2 rounded-lg border-gray-200 bg-white text-black"
                  value={data[key]?.toString()}
                  numberOfLines={2}
                  editable={false}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ViewRequest;
