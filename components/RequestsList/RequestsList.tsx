import {
  View,
  Text,
  FlatList,
  useColorScheme,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { OvertimeRequestService } from "@/services/OvertimeRequest/OvertimeRequestService";
import RequestItem from "./RequestItem";
import Toast from "react-native-root-toast";
import { MissedDurationRequestService } from "@/services/MissedDuration/MissedDurationService";
import EmptyData from "../EmptyData/EmptyData";
import Ionicons from "@expo/vector-icons/Ionicons";
import FilterRequestsModal from "../Modals/FilterRequestsModal";
import { formatDate, formatTime } from "@/utils";

const RequestsList = ({ type }: any) => {
  const colorScheme = useColorScheme();

  const overtimeInstance = new OvertimeRequestService();
  const missedTimeInstance = new MissedDurationRequestService();

  const [data, setData] = useState<any[]>([]);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const [page, setPage] = useState<any>(0);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  console.log(hasMoreData)
  console.log(loadingMore)

  const [searchLoading, setSearchLoading] = useState(false)
  const [searchData, setSearchData] = useState<any>({
    employeeId: "code10oo",
    attendanceDate: new Date(),
    clockIn: new Date(),
    clockOut: new Date(),
  });

  const closeModal = () => {
    setOpenFilterModal(false);
  };

  // opens modal
  const openModal = () => {
    setOpenFilterModal(true);
  };

  const fetchOvertimeData = async (resetPage = false) => {
    if (isFetching || !hasMoreData) return;

    setIsFetching(true);
    setLoadingMore(true);

    const nextPage = resetPage ? 1 : page + 1;
    try {
      const response: any = await overtimeInstance.getOvertimeRequests({
        EmployeeId: "code10oo",
        PageNo: nextPage,
        PageSize: 10,
      });

      if (response?.status === 200) {
        setLoadingMore(true);

        if (response.data?.data?.length > 0) {
          setPage(nextPage);
          if (resetPage) {
            setData(response.data.data);
          } else {
            setData((prevData) => [...prevData, ...response.data.data]);
          }
        } else {
          setHasMoreData(false);
        }
      }
    } catch (error) {
      Toast.show("Failed to fetch data.");
    } finally {
      setIsFetching(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = async (resetPage = false) => {
    setIsFetching(false);
    // if (isFetching || !hasMoreData) return;

    setIsFetching(true);
    setSearchLoading(true)
    setLoadingMore(true);

    const nextPage = resetPage ? 1 : page + 1;
    try {
      const response: any = await overtimeInstance.getOvertimeRequests({
        EmployeeId: "code10oo",
        PageNo: nextPage,
        PageSize: 10,
        clockIn: formatTime(searchData.clockIn),
        clockOut: formatTime(searchData.clockOut),
        attendanceDate: formatDate(searchData.attendanceDate),
      });
      console.log(response);

      if (response?.status === 200) {
        setLoadingMore(true);
        setSearchLoading(false)

        if (response.data?.data?.length > 0) {
          setPage(nextPage);
          if (resetPage) {
            setData(response.data.data);
          } else {
            setData((prevData) => [...prevData, ...response.data.data]);
          }
        } else {
          setHasMoreData(false);
        }

        closeModal();
      }
    } catch (error) {
      setSearchLoading(false)
      Toast.show("Failed to fetch data.", {
        duration: Toast.durations.LONG,
      });
    } finally {
      setSearchLoading(false)
      setIsFetching(false);
      setLoadingMore(false);
    }
  };

  const fetchMissedDurationData = async (resetPage = false) => {
    if (isFetching || !hasMoreData) return;

    setIsFetching(true);
    setLoadingMore(true);

    const nextPage = resetPage ? 1 : page + 1;
    try {
      const response: any = await missedTimeInstance.getMissedRequests({
        PageNo: nextPage,
        PageSize: 10,
      });

      if (response?.status === 200) {
        setLoadingMore(true);

        if (response.data?.data?.length > 0) {
          setPage(nextPage);
          if (resetPage) {
            setData(response.data.data);
          } else {
            setData((prevData) => [...prevData, ...response.data.data]);
          }
        } else {
          setHasMoreData(false);
        }
      }
    } catch (error) {
      Toast.show("Failed to fetch data.");
      setIsFetching(false);
      setLoadingMore(false);
    } finally {
      setIsFetching(false);
      setLoadingMore(false);
    }
  };

  const cancelOvertimeRequest = async (id: string) => {
    try {
      const response = await overtimeInstance.cancelOvertimeRequest(id);

      if (response?.status === 200) {
        setLoadingCancel(false);
        Toast.show("Canceled Successfully");
      }
    } catch (error) {
      setLoadingCancel(false);
      console.error(error);
    } finally {
      setLoadingCancel(false);
    }
  };

  const cancelMissedDurationRequest = async (id: string) => {
    try {
      const response = await missedTimeInstance.cancelMissedRequest(id);

      if (response?.status === 200) {
        setLoadingCancel(false);
        Toast.show("Canceled Successfully");
      }
    } catch (error) {
      setLoadingCancel(false);
      console.error(error);
    } finally {
      setLoadingCancel(false);
    }
  };

  const renderFooter = () => {
    if (type == 2 || type == 3) {
      if (loadingMore) {
        return <ActivityIndicator size="large" color="#F26651" />;
      }
      if (!hasMoreData) {
        return (
          <Text
            className={`text-center text-sm ${
              colorScheme == "dark" ? "text-white" : "text-black"
            }`}
          >
            End of data
          </Text>
        );
      }
      return null;
    }
  };

  const checkType = () => {
    if (type == 2) fetchOvertimeData();
    if (type == 3) fetchMissedDurationData();
  };

  const cancelRequest = (id: any) => {
    if (type == 2) cancelOvertimeRequest(id);
    if (type == 3) cancelMissedDurationRequest(id);
  };

  useEffect(() => {
    setHasMoreData(true);
    setData([]);
    setPage(0);

    if (type == 2) {
      fetchOvertimeData(true);
    } else if (type == 3) {
      fetchMissedDurationData(true);
    }
  }, [type]);

  return (
    // <ScrollView className="flex-1">
    <View className="flex-1 w-full">
      {data.length > 0 && (
        <TouchableOpacity onPress={() => setOpenFilterModal(true)}>
          <View className="items-end pr-4 w-fit">
            <Ionicons name="filter" size={20} color={"black"} />
          </View>
        </TouchableOpacity>
      )}

      {openFilterModal && (
        <FilterRequestsModal
          openModal={openModal}
          closeModal={closeModal}
          modalVisible={openFilterModal}
          searchData={searchData}
          setSearchData={setSearchData}
          type={type}
          setPage={setPage}
          handleSearch={handleSearch}
          searchLoading={searchLoading}
        />
      )}

      <View
        className={`flex-row ${
          colorScheme == "dark" ? "bg-[#051427]" : "bg-white"
        } border-b border-gray-200 p-4`}
      >
        <Text
          className={`flex-1 text-center font-semibold ${
            colorScheme == "dark" ? "text-white" : "text-black"
          }`}
        >
          Date
        </Text>
        <Text
          className={`flex-1 text-center font-semibold ${
            colorScheme == "dark" ? "text-white" : "text-black"
          }`}
        >
          Status
        </Text>
        <Text
          className={`flex-1 text-center font-semibold ${
            colorScheme == "dark" ? "text-white" : "text-black"
          }`}
        >
          Clock In
        </Text>
        <Text
          className={`flex-1 text-center font-semibold ${
            colorScheme == "dark" ? "text-white" : "text-black"
          }`}
        >
          Clock Out
        </Text>
        <Text
          className={`flex-1 text-center font-semibold ${
            colorScheme == "dark" ? "text-white" : "text-black"
          }`}
        >
          Cancel
        </Text>
      </View>

      <FlatList
        data={data}
        onEndReached={checkType}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !isFetching && data.length === 0 ? <EmptyData /> : null
        }
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <RequestItem
            item={item}
            type={type}
            cancelRequest={() => cancelRequest(item.id)}
            loadingCancel={loadingCancel}
          />
        )}
        contentContainerStyle={{
          backgroundColor: colorScheme == "light" ? "#fff" : "#051427",
          gap: 15,
          padding: 16,
        }}
      />
    </View>
    // </ScrollView>
  );
};

export default RequestsList;
