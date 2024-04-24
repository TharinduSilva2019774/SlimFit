import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogCalorieIntake from "../screens/LogCalorieIntake";
import TabMenu from "../tabNav";
import NewActivityScreen from "../screens/NewActivityScreen";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import OnBoardingScreen from "../screens/OnBoarding/OnBoardingScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />

        <Stack.Screen name="TabNavigator" component={TabMenu} />
        <Stack.Screen name="LogCal" component={LogCalorieIntake} />
        <Stack.Screen name="NewAct" component={NewActivityScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
