import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  ActivityIndicator,
  Platform,
  StyleSheet,
  FlatListComponent,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, Stack, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { OvertimeRequestService } from "@/services/OvertimeRequest/OvertimeRequestService";
import { EmployeesService } from "@/services/Employee/EmployeeService";
import Toast from "react-native-root-toast";
import { formatDate, formatTime, parseTimeString } from "@/utils";

const OvertimeRequest = () => {
  const { id, type } = useLocalSearchParams();

  const [data, setData] = useState<any>({
    employeeId: "code10oo",
    attendanceDate: new Date(),
    clockIn: new Date(),
    clockOut: new Date(),
    reason: "",
    approverId: "",
    overTimeHours: "0",
    overTimeMinutes: "0",
  });
  const [approvers, setApprovers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showPicker, setShowPicker] = useState({
    attendanceDate: Platform.OS === "ios",
    clockIn: Platform.OS === "ios",
    clockOut: Platform.OS === "ios",
  });
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [loadingPage, setLoadingPage] = useState(true);

  const overtimeService: OvertimeRequestService = useMemo(
    () => new OvertimeRequestService(""),
    []
  );

  const handleOnchange = (
    event: any,
    selectedDate: Date | undefined,
    field: string
  ) => {
    if (event.type === "set" && selectedDate) {
      setData((prevState: any) => ({
        ...prevState,
        [field]: selectedDate,
      }));

      if (Platform.OS === "android") {
        setShowPicker((prevState) => ({ ...prevState, [field]: false }));
      }
    }
  };

  const handleChange = (e: any, field: string) => {
    setData((prevState: any) => ({
      ...prevState,
      [field]: e,
    }));
  };

  const handleApproverChange = (value: string) => {
    // console.log(value)
    setData((prevState: any) => ({
      ...prevState,
      approverId: value, // Update the approverId field with the selected value
    }));
  };

  console.log(data.approverId);

  const handleHoursChange = (value: string) => {
    setData((prevState: any) => ({
      ...prevState,
      overTimeHours: value, // Update the overTimeHours field with the selected value
    }));
  };

  const handleMinutesChange = (value: string) => {
    setData((prevState: any) => ({
      ...prevState,
      overTimeMinutes: value, // Update the overTimeMinutes field with the selected value
    }));
  };

  const showMode = (currentMode: "date" | "time", field: string) => {
    setPickerMode(currentMode);

    if (Platform.OS === "android") {
      setShowPicker({
        attendanceDate: false,
        clockIn: false,
        clockOut: false,
        [field]: true,
      });
    }
  };

  const getEmployees = async () => {
    const employeeInstance = new EmployeesService("");

    try {
      const response: any = await employeeInstance.getEmployees({});

      // if (response?.status == 200) {
      const employees = response?.data?.data.map((emp: any) => {
        return { label: emp.full, value: emp.id };
      });
      setApprovers(employees);
      // }
    } catch (err: any) {
      // console.log(err);
    }
  };

  const getRequestById = async () => {
    setLoading(true);
    checkRequestType();
  };

  function checkRequestType() {
    if (+type === 2) {
      getOverTimeRequest();
    }
  }

  const getOverTimeRequest = async () => {
    await getEmployees();

    try {
      const overtimeInstance = new OvertimeRequestService("");
      const response: any = await overtimeInstance.getOvertimeRequestById(id);

      setLoadingPage(false);
      if (response?.status === 200) {
        setLoading(false);

        const {
          id,
          status,
          requestDate,
          overTime,
          reason,
          attendanceDate,
          clockIn,
          clockOut,
          approverId,
          approvalComment,
          approvalDate,
        }: any = response.data;
        setData({
          id,
          status,
          requestDate,
          overTime,
          reason,
          approverId,
          attendanceDate: new Date(attendanceDate),
          clockIn: parseTimeString(clockIn),
          clockOut: parseTimeString(clockOut),
          approvalComment,
          approvalDate,
        });
      }
    } catch (error) {
      setLoadingPage(false);
      setLoading(false);
      console.error(error);
    } finally {
      setLoadingPage(false);
      setLoading(false);
    }
  };

  const editOvertimeRequest = async () => {
    setLoading(true);

    const formattedHours = data.overTimeHours.padStart(2, "0");
    const formattedMinutes = data.overTimeMinutes.padStart(2, "0");
    const sentData = {
      id: data.id,
      overTime: `${formattedHours}:${formattedMinutes}`,
      clockIn: formatTime(data.clockIn),
      clockOut: formatTime(data.clockOut),
      attendanceDate: formatDate(data.attendanceDate),
      reason: data.reason,
      employeeId: data.employeeId,
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

  const editRequest = () => {
    if (+type === 2) {
      editOvertimeRequest();
    }
  };

  useEffect(() => {
    getRequestById();
  }, [type, id]);

  console.log(data.approverId);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          headerTitle: "Edit request",
        }}
      />
      {loadingPage ? (
        <ActivityIndicator size={30} color="#F26651" />
      ) : (
        <ScrollView
          className="flex-1 mx-4"
          showsVerticalScrollIndicator={false}
        >
          <View className="gap-5">
            <View>
              <Text className="font-semibold text-base">Attendance Date</Text>
              <TouchableOpacity
                onPress={() => showMode("date", "attendanceDate")}
              >
                <Text>
                  {new Date(data.attendanceDate).toLocaleDateString()}
                </Text>
              </TouchableOpacity>

              {showPicker.attendanceDate && (
                <DateTimePicker
                  value={new Date(data.attendanceDate)}
                  mode={"date"}
                  display="compact"
                  // is24Hour={true}
                  onChange={(e, selectedDate) =>
                    handleOnchange(e, selectedDate, "attendanceDate")
                  }
                />
              )}
            </View>

            <View>
              <Text className="font-semibold text-base">Clock In</Text>
              <TouchableOpacity onPress={() => showMode("time", "clockIn")}>
                {Platform.OS === "android" && (
                  <Text>{data.clockIn.toLocaleTimeString()}</Text>
                )}
              </TouchableOpacity>

              {showPicker.clockIn && (
                <DateTimePicker
                  value={data.clockIn}
                  mode={"time"}
                  display="clock"
                  is24Hour={false}
                  onChange={(e, selectedDate) =>
                    handleOnchange(e, selectedDate, "clockIn")
                  }
                />
              )}
            </View>

            <View>
              <Text className="font-semibold text-base">Clock Out</Text>
              <TouchableOpacity onPress={() => showMode("time", "clockOut")}>
                {Platform.OS === "android" && (
                  <Text>{data.clockOut.toLocaleTimeString()}</Text>
                )}
              </TouchableOpacity>

              {showPicker.clockOut && (
                <DateTimePicker
                  value={data.clockOut}
                  mode={"time"}
                  display="clock"
                  is24Hour={false}
                  onChange={(e, selectedDate) =>
                    handleOnchange(e, selectedDate, "clockOut")
                  }
                />
              )}
            </View>

            <View>
              <Text className="font-semibold text-base">Reason</Text>
              <TextInput
                placeholder="reason"
                value={data.reason}
                onChangeText={(text) => handleChange(text, "reason")}
                multiline
                numberOfLines={5}
                className="px-4 shadow bg-slate-100 mt-2"
              />
            </View>

            {/* <View>
            <Text className="font-semibold text-base">approverId</Text>
            <TextInput
              placeholder="approverId"
              value={data.approverId}
              onChangeText={(text) => handleOnchange(text, "approverId")}
              className="px-5 py-4 border border-primary rounded-full shadow bg-slate-100 mt-2"
            />
          </View> */}

            <View>
              <Text className="font-semibold text-base">Approver</Text>
              <View className="m-0 p-0 rounded-lg bg-slate-100 mt-2">
                <Picker
                  selectedValue={data.approverId}
                  onValueChange={(itemValue) => handleApproverChange(itemValue)}
                  collapsable
                  itemStyle={{ height: 80 }}
                >
                  {approvers.map((item: any, index: any) => (
                    <Picker.Item
                      key={item.value}
                      label={`${item.label}`}
                      value={`${item.value}`}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View>
              <Text className="font-semibold text-base">Overtime Hours</Text>
              <View className="m-0 p-0 rounded-lg bg-slate-100 mt-2">
                <Picker
                  selectedValue={data.overTimeHours}
                  onValueChange={(itemValue) => handleHoursChange(itemValue)}
                  collapsable
                  itemStyle={{ height: 120 }}
                >
                  {Array.from({ length: 10 }, (_, i) => (
                    <Picker.Item
                      key={i + 1}
                      label={`${i + 1}`}
                      value={`${i + 1}`}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View>
              <Text className="font-semibold text-base">Overtime Minutes</Text>
              <View className="m-0 p-0 rounded-lg bg-slate-100 mt-2">
                <Picker
                  selectedValue={data.overTimeMinutes}
                  onValueChange={(itemValue) => handleMinutesChange(itemValue)}
                  collapsable
                  itemStyle={{ height: 120 }}
                >
                  {Array.from({ length: 61 }, (_, i) => (
                    <Picker.Item key={i} label={`${i}`} value={`${i}`} />
                  ))}
                </Picker>
              </View>
            </View>

            <TouchableOpacity
              className="bg-primary px-4 py-3 rounded-lg mb-4"
              onPress={() => editRequest()}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size={30} color="white" />
              ) : (
                <Text className="text-white text-center">Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default OvertimeRequest;
