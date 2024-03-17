import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SettingScreen from "../screens/SettingScreen";
import { Ionicons } from "@expo/vector-icons";
import Popup from "../assets/Popup";
import ProgressScreen from "../screens/ProgressScreen/ProgressScreen";
import CommunityScreen from "../screens/CommunityScreen/CommunityScreen";

const Tab = createBottomTabNavigator();
const TabMenu = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Community") {
            iconName = focused
              ? "chatbox-ellipses"
              : "chatbox-ellipses-outline";
          } else if (route.name === "Progress") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",

        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <>
              <TouchableOpacity onPress={openModal}>
                <Text>Show Popup</Text>
              </TouchableOpacity>
              <Popup visible={modalVisible} onClose={closeModal} />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
export default TabMenu;
