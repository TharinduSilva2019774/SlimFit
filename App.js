import { StatusBar } from "expo-status-bar";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, SafeAreaView, Modal } from "react-native";
import Navigation from "./src/navigation";
import HomeScreen from "./src/screens/HomeScreen";
import LogCalorieIntake from "./src/screens/LogCalorieIntake";
import NewActivityScreen from "./src/screens/NewActivityScreen";
import ProgressScreen from "./src/screens/ProgressScreen/ProgressScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingScreen from "./src/screens/SettingScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";
import TabMenu from "./src/tabNav";

import { TouchableOpacity, FlatList } from "react-native";
import Popup from "./src/assets/Popup";

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Navigation />
      {/* <TouchableOpacity onPress={openModal}>
        <Text>Show Popup</Text>
      </TouchableOpacity>
      <Popup visible={modalVisible} onClose={closeModal} /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
  },
});
