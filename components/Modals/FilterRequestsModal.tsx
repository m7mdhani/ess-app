import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  useColorScheme,
  Platform,
  Pressable,
  TextInput,
} from "react-native";

const FilterRequestsModal = ({
  closeModal,
  modalVisible,
  type,
  searchData,
  setSearchData,
  handleSearch,
  searchLoading,
}: any) => {
  const colorScheme = useColorScheme();

  const [loading, setLoading] = useState(false);

  const [showPicker, setShowPicker] = useState({
    attendanceDate: Platform.OS === "ios",
    clockIn: Platform.OS === "ios",
    clockOut: Platform.OS === "ios",
  });
  const showMode = (currentMode: "date" | "time", field: string) => {
    if (Platform.OS === "android") {
      setShowPicker({
        attendanceDate: false,
        clockIn: false,
        clockOut: false,
        [field]: true,
      });
    }
  };

  const handleOnchange = (
    event: any,
    selectedDate: Date | undefined,
    field: string
  ) => {
    if (event.type === "set" && selectedDate) {
      setSearchData((prevState: any) => ({
        ...prevState,
        [field]: selectedDate,
      }));

      if (Platform.OS === "android") {
        setShowPicker((prevState) => ({ ...prevState, [field]: false }));
      }
    } else {
      setShowPicker((prevState) => ({ ...prevState, [field]: false }));
    }
  };

  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <TouchableWithoutFeedback
        style={{ height: "100%" }}
        onPress={() => closeModal()}
      >
        <View
          className={`shadow justify-end items-center flex-1 h-[100%] mx-4`}
        >
          <View
            className={`${
              colorScheme === "dark" ? "bg-[#011127]" : "bg-white"
            } w-full h-[55%] items-center py-4`}
          >
            <View className="w-full mt-3">
              <Text className="font-semibold text-base">Attendance Date</Text>

              {Platform.OS === "android" && (
                <Pressable onPress={() => showMode("date", "attendanceDate")}>
                  <TextInput
                    className="mt-2 p-3 rounded-lg bg-slate-100 text-black"
                    value={searchData.attendanceDate.toLocaleDateString()}
                    editable={false}
                    placeholderTextColor={"black"}
                    onPressIn={() => showMode("date", "attendanceDate")}
                  />
                </Pressable>
              )}

              {showPicker.attendanceDate && (
                <DateTimePicker
                  mode={"date"}
                  display="spinner"
                  value={searchData.attendanceDate}
                  onChange={(e, selectedDate) =>
                    handleOnchange(e, selectedDate, "attendanceDate")
                  }
                  className="h-[120] -mt-[10] bg-black"
                />
              )}
            </View>

            <View className="w-full mt-3">
              <Text className="font-semibold text-base">Clock In</Text>

              {Platform.OS === "android" && (
                <Pressable onPress={() => showMode("time", "clockIn")}>
                  <TextInput
                    className="mt-2 p-3 rounded-lg bg-slate-100 text-black"
                    value={searchData.clockIn.toLocaleTimeString()}
                    editable={false}
                    placeholderTextColor={"black"}
                    onPressIn={() => showMode("time", "clockIn")}
                  />
                </Pressable>
              )}

              {showPicker.clockIn && (
                <DateTimePicker
                  value={searchData.clockIn}
                  mode={"time"}
                  display="spinner"
                  is24Hour={false}
                  onChange={(e, selectedDate) =>
                    handleOnchange(e, selectedDate, "clockIn")
                  }
                  className="h-[50] -mt-[10] bg-black"
                />
              )}
            </View>

            <View className="w-full mt-3">
              <Text className="font-semibold text-base">Clock Out</Text>
              {Platform.OS === "android" && (
                <Pressable onPress={() => showMode("time", "clockIn")}>
                  <TextInput
                    className="mt-2 p-3 rounded-lg bg-slate-100 text-black"
                    value={searchData.clockOut.toLocaleTimeString()}
                    editable={false}
                    placeholderTextColor={"black"}
                    onPressIn={() => showMode("time", "clockOut")}
                  />
                </Pressable>
              )}

              {showPicker.clockOut && (
                <DateTimePicker
                  value={searchData.clockOut}
                  mode={"time"}
                  display="spinner"
                  is24Hour={false}
                  onChange={(e, selectedDate) =>
                    handleOnchange(e, selectedDate, "clockOut")
                  }
                  className="h-[50] -mt-[10] bg-black"
                />
              )}
            </View>

            <TouchableOpacity
              className="bg-primary px-4 py-3 rounded-lg w-full mt-4"
              onPress={() => handleSearch(true)}
              disabled={searchLoading}
            >
              {searchLoading ? (
                <ActivityIndicator size={30} color="white" />
              ) : (
                <Text className="text-white text-center">Search</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FilterRequestsModal;
