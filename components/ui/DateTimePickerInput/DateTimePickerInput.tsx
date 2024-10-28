import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  Platform,
  Button,
  useColorScheme,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@expo/vector-icons/Ionicons";

const DateTimePickerInput = ({ label, value, mode, onChange }: any) => {
  const colorScheme = useColorScheme();

  const [showPicker, setShowPicker] = useState(false);

  const handleShowPicker = () => {
    setShowPicker(true);
  };

  const handleConfirm = (event: any, selectedDate: any) => {
    setShowPicker(Platform.OS === "ios");
    if (selectedDate) onChange(selectedDate);
  };

  return (
    <View className="w-full flex-1">
      <Text
        className={`font-semibold text-base ${
          colorScheme == "dark" ? "text-white" : "text-black"
        }`}
      >
        {label}
      </Text>

      <Pressable
        onPress={handleShowPicker}
        className={`mt-1 flex-1 bg-slate-100 rounded-lg justify-between p-3 items-center flex-row ${
          colorScheme == "dark" ? "bg-sky-900" : "bg-slate-100"
        }`}
      >
        <TextInput
          className={`${
            colorScheme == "dark" ? "text-white" : "text-black"
          } h-full`}
          value={
            mode == "date"
              ? value.toLocaleDateString()
              : value.toLocaleTimeString()
          }
          editable={false}
          placeholderTextColor={"black"}
        />
        <Ionicons
          name={mode == "date" ? "calendar" : "time"}
          size={20}
          color={`${colorScheme == "dark" ? "white" : "black"}`}
        />
      </Pressable>

      {showPicker &&
        (Platform.OS === "android" ? (
          <DateTimePicker
            value={value}
            mode={mode}
            display="default"
            onChange={handleConfirm}
          />
        ) : (
          <Modal transparent={true} visible={showPicker} animationType="fade">
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <View
                className={`p-4 rounded-lg ${
                  colorScheme == "dark" ? "bg-sky-900" : "bg-slate-100"
                }`}
              >
                <Text
                  className={`font-bold text-lg mb-2 ${
                    colorScheme == "dark" ? "text-white" : "text-black"
                  }`}
                >
                  Select a {mode === "date" ? "Date" : "Time"}
                </Text>
                <DateTimePicker
                  value={value}
                  mode={mode}
                  display="spinner"
                  onChange={handleConfirm}
                />
                <Button title="Done" onPress={() => setShowPicker(false)} />
              </View>
            </View>
          </Modal>
        ))}
    </View>
  );
};

export default DateTimePickerInput;
