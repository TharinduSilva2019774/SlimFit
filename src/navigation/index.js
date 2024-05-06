import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogCalorieIntake from "../screens/LogCalorieIntake";
import TabMenu from "../tabNav";
import NewActivityScreen from "../screens/NewActivityScreen";
import HomeScreen from "../screens/HomeScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
<<<<<<< HEAD
import OnBoardingScreen from "../screens/OnBoarding/OnBoardingScreen";
import LogWeightScreen from "../screens/LogWeightScreen/LogWeightScreen";
import EditSettingScreen from "../screens/EditSettingScreen/EditScreenScreen";
=======
import OnBoardingScreen from "../screens/OnBoarding";
import LogWeightScreen from "../screens/LogWeightScreen";
import EditSettingScreen from "../screens/EditSettingScreen";
>>>>>>> 4e34a3b7714f19fe956cba3e8ece4ad3977969cd

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TabNavigator" component={TabMenu} />

        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="NewAct" component={NewActivityScreen} />
        <Stack.Screen name="LogWeight" component={LogWeightScreen} />
        <Stack.Screen name="LogCal" component={LogCalorieIntake} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
        <Stack.Screen name="EditSettingScreen" component={EditSettingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
