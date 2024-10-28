import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ActivityIndicator,
  useColorScheme,
} from "react-native";

const BreakModal = ({
  closeModal,
  modalVisible,
  toggleClock,
  loadingBreak,
  breakTitle,
}: any) => {
  const colorScheme = useColorScheme();

  return (
    <Modal animationType="slide" visible={modalVisible} transparent={true}>
      <TouchableWithoutFeedback
        style={{ height: "100%" }}
        onPress={() => closeModal()}
      >
        <View className={`shadow justify-end items-center flex-1 h-[50%]`}>
          <View
            className={`${
              colorScheme === "dark" ? "bg-[#011127]" : "bg-white"
            } w-full h-[45%] items-center py-4`}
          >
            <Text
              className={`font-semibold text-lg my-3 ${
                colorScheme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Start Your Break Now
            </Text>

            <View className="w-48">
              <Image
                source={require("../../assets/images/coffee-break.png")}
                className="w-full h-[200]"
              />
            </View>

            <TouchableOpacity
              onPress={() => {
                breakTitle === "Start"
                  ? toggleClock(
                      "StartBreak",
                      "Break In Successful",
                      null,
                      "End Break"
                    )
                  : toggleClock(
                      "EndBreak",
                      "Break Out Successful",
                      null,
                      "Start"
                    );
              }}
              disabled={loadingBreak}
              className="p-3 w-2/5 bg-[#F26651] mt-4 rounded-lg"
            >
              <View className="flex-row items-center justify-center gap-2">
                {loadingBreak ? (
                  <ActivityIndicator size={25} color="white" />
                ) : (
                  <Text className="text-white text-center text-base">
                    {breakTitle}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
    // </View>
  );
};

export default BreakModal;
