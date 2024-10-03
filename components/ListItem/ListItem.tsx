import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";

const ListItem = ({ item }: any) => {
  const renderRightActions = () => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity style={[styles.button, styles.edit]}>
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.delete]}>
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginBottom: 2,
    backgroundColor: "#F1F1F1",
  },
  itemText: {
    fontSize: 15,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    marginBottom: 2,
  },
  button: {
    width: 80,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  edit: {
    backgroundColor: "#ffab00",
  },
  delete: {
    backgroundColor: "#ff1744",
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
export default ListItem;
