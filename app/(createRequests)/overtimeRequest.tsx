import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { OvertimeRequestService } from "@/services/OvertimeRequest/OvertimeRequestService";
import { EmployeesService } from "@/services/Employee/EmployeeService";
import Toast from "react-native-root-toast";

const OvertimeRequest = () => {
  const [data, setData] = useState<any>({
    employeeId: "code10oo",
    attendanceDate: "",
    clockIn: "",
    clockOut: "",
    reason: "",
    approverId: "",
    overTimeHours: "0",
    overTimeMinutes: "0",
  });

  const [approvers, setApprovers] = useState([]);
  const [loading, setLoading] = useState(false);

  const overtimeService: OvertimeRequestService = useMemo(
    () => new OvertimeRequestService(""),
    []
  );

  const handleOnchange = (text: string, input: string) => {
    setData((prevState: any) => ({ ...prevState, [input]: text }));
  };

  const handleHoursChange = (value: string) => {
    setData((prevState: any) => ({
      ...prevState,
      overTimeHours: value,
    }));
  };

  const handleApproverChange = (value: string) => {
    setData((prevState: any) => ({
      ...prevState,
      approver: value,
    }));
  };

  const handleMinutesChange = (value: string) => {
    setData((prevState: any) => ({
      ...prevState,
      overTimeMinutes: value,
    }));
  };

  const onChange = (
    event: any,
    selectedDate: Date | undefined,
    field: string
  ) => {
    if (event.type === "set") {
      // Ensure this is only triggered when a date is set
      const currentDate = selectedDate || new Date();

      setData((prevState: any) => {
        if (field === "attendanceDate") {
          return {
            ...prevState,
            attendanceDate: currentDate.toLocaleDateString(),
          };
        } else if (field === "clockIn") {
          return {
            ...prevState,
            clockIn: currentDate.toLocaleTimeString(),
          };
        } else if (field === "clockOut") {
          return {
            ...prevState,
            clockOut: currentDate.toLocaleTimeString(),
          };
        }
        return prevState;
      });
    }
  };

  const showMode = (currentMode: any, field: string) => {
    try {
      DateTimePickerAndroid.open({
        value: new Date(),
        onChange: (event, selectedDate) => onChange(event, selectedDate, field),
        mode: currentMode,
        is24Hour: field === "overTime" ? true : false, // 24-hour format for overTime
      });
    } catch (error) {
      console.error("DateTimePicker error:", error); // Catch any issues that might cause malformed calls
    }
  };

  const showDatepicker = (field: string) => {
    showMode("date", field);
  };

  const showTimepicker = (field: string) => {
    showMode("time", field);
  };

  const getEmployees = async () => {
    const employeeInstance = new EmployeesService("");
    const response = await employeeInstance.getEmployees();

    // console.log(response?.data);

    if (response?.status == 200) {
      const employees = response?.data?.data.map((emp: any) => {
        return { label: emp.full, value: emp.id };
      });
      setApprovers(employees);
    }
  };

  // console.log(data)

  function formatTime(inputTime: any) {
    console.log(inputTime)
    // Create a Date object from the input time
    const [time, modifier] = inputTime.split(' '); // Separate time and AM/PM
    let [hours, minutes] = time.split(':').map(Number);
  
    // Adjust hours based on AM/PM
    if (modifier === 'PM' && hours < 12) {
      hours += 12;
    } else if (modifier === 'AM' && hours === 12) {
      hours = 0; // Handle midnight
    }
  
    // Pad hours and minutes with leading zeros if needed
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
  
    return `${formattedHours}:${formattedMinutes}`;
  }

  function formatDate(inputDate: any) {
    // Split the input date by '/'
    const [month, day, year] = inputDate.split('/');
  
    // Pad month and day with leading zeros if necessary
    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');
  
    // Return the date in YYYY-MM-DD format
    return `${year}-${formattedMonth}-${formattedDay}`;
  }

  const addOvertimeRequest = async () => {
    setLoading(true);

    const formattedHours = data.overTimeHours.padStart(2, "0");
    const formattedMinutes = data.overTimeMinutes.padStart(2, "0");
    const sentData = {
      // ...data,
      overTime: `${formattedHours}:${formattedMinutes}`,
      approverId: "12",
      clockIn: formatTime(data.clockIn),
      clockOut: formatTime(data.clockOut),
      attendanceDate: formatDate(data.attendanceDate),
      reason: data.reason,
      employeeId: data.employeeId,
    };

    try {
      console.log(sentData);
      const response = await overtimeService.createOvertimeRequest(sentData);

      setLoading(false);
      if (response?.status === 201) {
        Toast.show("Overtime request created successfully");
      }
    } catch (error: any) {
      console.log(error)
      setLoading(false);
    }
  };

  useEffect(() => {
    // getEmployees();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={
          {
            // headerRight: saveButton,
          }
        }
      />
      <ScrollView className="flex-1 mx-4" showsVerticalScrollIndicator={false}>
        <View className="gap-5">
          <View>
            <Text className="font-semibold text-base">Attendance Date</Text>
            {/* <Text>selected: {date.toLocaleString()}</Text> */}
            {/* <TextInput
              placeholder="attendanceDate"
              value={data.attendanceDate}
              onChangeText={(text) => handleOnchange(text, "attendanceDate")}
              className="px-5 py-4 border border-primary rounded-full shadow bg-slate-100 mt-2"
            /> */}
            <TouchableOpacity>
              <Text
                className="px-5 py-4 border border-primary rounded-full shadow bg-slate-100 mt-2"
                onPress={() => showDatepicker("attendanceDate")}
              >
                {data.attendanceDate || "Select Date"}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text className="font-semibold text-base">Clock In</Text>
            {/* <TextInput
              placeholder="Clock In"
              value={data.attendanceDate}
              onChangeText={(text) => handleOnchange(text, "clockIn")}
              className="px-5 py-4 border border-primary rounded-full shadow bg-slate-100 mt-2"
            /> */}
            <TouchableOpacity>
              <Text
                className="px-5 py-4 border border-primary rounded-full shadow bg-slate-100 mt-2"
                onPress={() => showTimepicker("clockIn")}
              >
                {data.clockIn || "Select Clock In Time"}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text className="font-semibold text-base">clockOut</Text>
            {/* <TextInput
              placeholder="Clock Out"
              value={data.attendanceDate}
              onChangeText={(text) => handleOnchange(text, "clockOut")}
              className="px-5 py-4 border border-primary rounded-full shadow bg-slate-100 mt-2"
            /> */}
            <TouchableOpacity>
              <Text
                className="px-5 py-4 border border-primary rounded-full shadow bg-slate-100 mt-2"
                onPress={() => showTimepicker("clockOut")}
              >
                {data.clockOut || "Select Clock Out Time"}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text className="font-semibold text-base">reason</Text>
            <TextInput
              placeholder="reason"
              value={data.attendanceDate}
              onChangeText={(text) => handleOnchange(text, "reason")}
              className="px-5 py-4 border border-primary rounded-full shadow bg-slate-100 mt-2"
            />
          </View>

          <View>
            <Text className="font-semibold text-base">approverId</Text>
            <TextInput
              placeholder="approverId"
              value={data.approverId}
              onChangeText={(text) => handleOnchange(text, "approverId")}
              className="px-5 py-4 border border-primary rounded-full shadow bg-slate-100 mt-2"
            />
          </View>

          <View>
            <Text className="font-semibold text-base">Approver</Text>
            <View className="border border-primary rounded-full bg-slate-100 mt-2">
              <Picker
                selectedValue={data.overTimeMinutes}
                onValueChange={(itemValue) => handleApproverChange(itemValue)}
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

          {/* <View> */}
          {/* <Text className="font-semibold text-base">overTime</Text> */}
          {/* <TextInput
              placeholder="overTime"
              value={data.overTime}
              onChangeText={(text) => handleOnchange(text, "overTime")}
              className="px-5 py-4 border border-primary rounded-full shadow bg-slate-100 mt-2"
            /> */}
          {/* <TouchableOpacity>
              <Text
                className="px-5 py-4 border border-primary rounded-full shadow bg-slate-100 mt-2"
                onPress={() => showTimepicker("overTime")}
              >
                {data.overTime || "Select Over Time"}
              </Text>
            </TouchableOpacity> */}
          {/* </View> */}

          <View>
            <Text className="font-semibold text-base">Overtime Hours</Text>
            <View className="border border-primary rounded-full bg-slate-100 mt-2">
              <Picker
                selectedValue={data.overTimeHours}
                onValueChange={(itemValue) => handleHoursChange(itemValue)}
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
            <View className="border border-primary rounded-full bg-slate-100 mt-2">
              <Picker
                selectedValue={data.overTimeMinutes}
                onValueChange={(itemValue) => handleMinutesChange(itemValue)}
              >
                {Array.from({ length: 61 }, (_, i) => (
                  <Picker.Item key={i} label={`${i}`} value={`${i}`} />
                ))}
              </Picker>
            </View>
          </View>

          <TouchableOpacity
            className="bg-primary px-4 py-3 rounded-full mb-4"
            onPress={addOvertimeRequest}
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
    </SafeAreaView>
  );
};

export default OvertimeRequest;
