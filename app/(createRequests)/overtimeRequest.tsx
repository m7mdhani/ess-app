import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  Modal,
  Button,
  StyleSheet,
  useColorScheme,
} from "react-native";

import React, { useEffect, useMemo, useState } from "react";
import { router } from "expo-router";
import { OvertimeRequestService } from "@/services/OvertimeRequest/OvertimeRequestService";
import { EmployeesService } from "@/services/Employee/EmployeeService";
import Toast from "react-native-root-toast";
import { formatTime } from "@/utils";
import DateTimePickerInput from "@/components/ui/DateTimePickerInput/DateTimePickerInput";
import ModalPicker from "@/components/ui/ModalPicker/ModalPicker";

const OvertimeRequest = () => {
  const colorScheme = useColorScheme();

  const [approvers, setApprovers] = useState<any>([]);
  const hoursOptions = Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1}`,
    value: `${i + 1}`,
  }));

  const minutesOptions = Array.from({ length: 61 }, (_, i) => ({
    label: `${i}`,
    value: `${i}`,
  }));

  const [data, setData] = useState<any>({
    attendanceDate: new Date(),
    clockIn: new Date(),
    clockOut: new Date(),
    reason: "",
    approverId: "",
    overTimeHours: "1",
    overTimeMinutes: "0",
  });

  const [loading, setLoading] = useState(false);

  const overtimeService: OvertimeRequestService = useMemo(
    () => new OvertimeRequestService(),
    []
  );

  const handleChange = (e: any, field: string) => {
    setData((prevState: any) => ({
      ...prevState,
      [field]: e,
    }));
  };

  const handleApproverChange = (value: string) => {
    setData((prevState: any) => ({
      ...prevState,
      approverId: value,
    }));
  };
  const getEmployees = async () => {
    const employeeInstance = new EmployeesService();

    try {
      const response: any = await employeeInstance.getEmployees({});

      const employees = response?.data?.data.map((emp: any) => {
        return { label: emp.full, value: emp.id };
      });
      setApprovers(employees);
      // }
    } catch (err: any) {
      // console.log(err);
    }
  };

  function formatDate(inputDate: any) {
    return new Date(inputDate).toISOString().split("T")[0];
  }

  const addOvertimeRequest = async () => {
    setLoading(true);

    const formattedHours = data.overTimeHours.padStart(2, "0");
    const formattedMinutes = data.overTimeMinutes.padStart(2, "0");
    const sentData = {
      ...data,
      overTime: `${formattedHours}:${formattedMinutes}`,
      clockIn: formatTime(data.clockIn),
      clockOut: formatTime(data.clockOut),
      attendanceDate: formatDate(data.attendanceDate),
      reason: data.reason,
    };

    try {
      const response = await overtimeService.createOvertimeRequest(sentData);

      if (response?.status === 201) {
        setLoading(false);
        Toast.show("Overtime request created successfully");
        router.back();
      }
    } catch (error: any) {
      setLoading(false);
    }
  };

  const handleInputChange = (selectedDate: any, field: any) => {
    setData((prevData: any) => ({ ...prevData, [field]: selectedDate }));
  };

  useEffect(() => {
    getEmployees();
  }, []);

  console.log(data);

  return (
      <ScrollView
        className={`flex-1 ${
          colorScheme == "dark" ? "bg-[#011127]" : "bg-white"
        } p-4`}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-3">
          <View className="flex-1">
            <DateTimePickerInput
              label="Attendance Date"
              value={data.attendanceDate}
              mode="date"
              onChange={(date: any) =>
                handleInputChange(date, "attendanceDate")
              }
            />
          </View>

          <View className="flex-1">
            <DateTimePickerInput
              label="Clock In"
              value={data.clockIn}
              mode="time"
              onChange={(date: any) => handleInputChange(date, "clockIn")}
            />
          </View>

          <View className="flex-1">
            <DateTimePickerInput
              label="Clock Out"
              value={data.clockOut}
              mode="time"
              onChange={(date: any) => handleInputChange(date, "clockOut")}
            />
          </View>

          <KeyboardAvoidingView className="flex-1">
            <View>
              <Text
                className={`font-semibold text-base ${
                  colorScheme == "dark" ? "text-white" : "text-black"
                }`}
              >
                Reason
              </Text>
              <TextInput
                placeholder="reason"
                value={data.reason}
                onChangeText={(text) => handleChange(text, "reason")}
                multiline
                numberOfLines={5}
                className={`p-4  mt-2 rounded-lg ${
                  colorScheme == "dark"
                    ? "bg-sky-900 text-white"
                    : "bg-slate-100 text-black"
                } ${Platform.OS == "ios" ? `h-[120]` : "auto bg-slate-100"}
              `}
              />
            </View>
          </KeyboardAvoidingView>

          <View className="flex-1">
            <ModalPicker
              label="Approver"
              selectedValue={data.approverId}
              onValueChange={handleApproverChange}
              options={approvers}
            />
          </View>

          <View className="flex-1">
            <ModalPicker
              label="Overtime Hours"
              selectedValue={data.overTimeHours}
              onValueChange={handleInputChange}
              options={hoursOptions}
            />
          </View>

          <View className="flex-1">
            <ModalPicker
              label="Overtime Minutes"
              selectedValue={data.overTimeMinutes}
              onValueChange={handleInputChange}
              options={minutesOptions}
            />
          </View>

          <View className="mb-[50]">
            <TouchableOpacity
              className="bg-primary px-4 py-3 rounded-lg"
              onPress={() => addOvertimeRequest()}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size={16} color="white" />
              ) : (
                <Text className="text-white text-center">Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  );
};

export default OvertimeRequest;
