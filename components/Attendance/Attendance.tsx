import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import BreakModal from "../Modals/BreakModal";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Attendance = ({
  loading,
  takeAction,
  toggleClock,
  status,
  loadingBreak,
  breakTitle,
}: any) => {
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [status]);

  return (
    <View
      className={`rounded-lg p-4 shadow-sm mx-4 my-5 border  ${
        colorScheme == "dark"
          ? "border-sky-900 bg-sky-900"
          : "border-slate-100 bg-white"
      }`}
    >
      <Text
        className={`font-semi-bold text-lg border-b border-slate-100 pb-2 ${
          colorScheme == "dark" ? "text-white" : "text-black"
        }`}
      >
        Attendance
      </Text>

      <View className="mt-4 items-center">
        <Text
          className={`font-extrabold text-3xl ${
            colorScheme == "dark" ? "text-white" : "text-black"
          }`}
        >
          09:30 AM
        </Text>
        <Text
          className={`font-semibold mt-2  ${
            colorScheme == "dark" ? "text-gray-100" : "text-gray-600"
          }`}
        >
          Today's shift: 08:00 AM -- 5:00 PM
        </Text>
        <View
          className={`flex-row items-center gap-1  mt-1  ${
            colorScheme == "dark" ? "text-gray-100" : "text-gray-600"
          }`}
        >
          <Ionicons
            name="location-outline"
            size={22}
            color={colorScheme == "dark" ? "white" : "black"}
          />
          <Text
            className={`font-semibold  ${
              colorScheme == "dark" ? "text-gray-100" : "text-gray-600"
            }`}
          >
            Head Office
          </Text>
        </View>

        <View className="flex-row items-center w-full justify-between gap-3 mt-3">
          <TouchableOpacity
            className={`p-3 ${
              status == "Clock Out" ? "w-[80%]" : "w-full"
            } bg-[#F26651] mt-4 rounded-lg`}
            onPress={takeAction}
            disabled={loading}
          >
            <View className="flex-row items-center justify-center gap-2">
              {loading ? (
                <ActivityIndicator size={30} color="white" />
              ) : (
                <>
                  <Ionicons
                    name="finger-print-outline"
                    size={30}
                    color={"#fff"}
                  />
                  <Text className="text-white text-center text-lg">
                    {status}
                  </Text>
                </>
              )}
            </View>
          </TouchableOpacity>

          {status == "Clock Out" && (
            <TouchableOpacity
              className=" w-[20%] mt-4 rounded-lg"
              onPress={openModal}
              disabled={loading}
            >
              <View className="items-center justify-center p-1 w-[50] h-[50] border border-gray-200 rounded-lg">
                <Image
                  source={require("../../assets/images/break.png")}
                  className="w-full h-full"
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {modalVisible && (
        <BreakModal
          openModal={openModal}
          closeModal={closeModal}
          toggleClock={toggleClock}
          breakTitle={breakTitle}
          loadingBreak={loadingBreak}
        />
      )}
    </View>
  );
};

export default Attendance;
