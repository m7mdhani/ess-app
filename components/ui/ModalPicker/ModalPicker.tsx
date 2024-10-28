import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  Button,
  Pressable,
  useColorScheme,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";

const ModalPicker = ({ label, selectedValue, onValueChange, options }: any) => {
  const colorScheme = useColorScheme();

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selectedValue);

  const handleSelect = (value: any) => {
    onValueChange(value);
    setSelectedItem(value);
    setShowModal(false);
  };

  return (
    <View>
      <Text
        className={`font-semibold text-base ${
          colorScheme == "dark" ? "text-white" : "text-black"
        }`}
      >
        {label}
      </Text>
      <Pressable
        onPress={() => setShowModal(true)}
        className={`mt-2 flex-1  rounded-lg justify-between p-3 items-center flex-row ${
          colorScheme == "dark" ? "bg-sky-900" : "bg-slate-100"
        }`}
      >
        <Text
          className={`${colorScheme == "dark" ? "text-white" : "text-black"}`}
        >
          {options.find((opt: any) => opt.value === selectedItem)?.label ||
            `Select ${label}`}
        </Text>
        <Ionicons
          name="chevron-down"
          size={20}
          color={colorScheme == "dark" ? "white" : "black"}
        />
      </Pressable>

      {showModal && (
        <Modal transparent={true} visible={showModal} animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              className={`p-4 rounded-lg w-3/4 ${
                colorScheme == "dark" ? "bg-sky-900" : "bg-slate-100"
              }`}
            >
              <Text
                className={`font-bold text-lg ${
                  colorScheme == "dark" ? "text-white" : "text-black"
                }`}
              >
                Select {label}
              </Text>
              <Picker
                selectedValue={selectedItem}
                onValueChange={(itemValue) => handleSelect(itemValue)}
              >
                {options.map((item: any) => (
                  <Picker.Item
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    color={colorScheme == "dark" ? "white" : "black"}
                  />
                ))}
              </Picker>
              {/* <Button title="Close" onPress={() => setShowModal(false)} /> */}
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ModalPicker;
