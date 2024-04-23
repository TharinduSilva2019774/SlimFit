import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native";

const LogCalorieIntake = () => {
  const navigation = useNavigation();
  const [activityName, setActivityName] = useState("New Meal");
  const [selectFood, setSelectFood] = useState(null);
  const [selectMeal, setSelectmeal] = useState(null);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const foodData = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  const mealData = [
    { label: "Breakfast", value: "1" },
    { label: "Lunch", value: "2" },
    { label: "Dinner", value: "3" },
    { label: "Snack", value: "4" },
    { label: "Other", value: "5" },
  ];
  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);

  const [note, setNote] = useState("");

  const styles = StyleSheet.create({
    //Main container styles
    scrollViewcontainer: {
      flex: 1,
      width: "100%",
    },
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#1C1C1E",
      width: "100%",
    },

    // Header styles
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
      backgroundColor: "#1C1C1E",
      height: "10%",
    },
    leftItem: {
      marginRight: "auto",
    },
    titleTxt: {
      paddingTop: 20,
      color: "white",
      fontSize: 30,
    },
    backTxt: {
      paddingTop: 20,
      color: "white",
      fontSize: 16,
    },

    //Body content styles
    input: {
      flex: 1,
      backgroundColor: "#5E5D5D",
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      color: "white",
    },
    inputField: {
      width: "80%",
      height: "9%",
    },
    imageCover: {
      width: "100%",
      aspectRatio: 8.33,
    },
    dropdown: {
      borderBottomColor: "gray",
      borderBottomWidth: 0.5,
      backgroundColor: "#5E5D5D",
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      width: "100%",
    },
    dateButton: {
      flex: 1,
      backgroundColor: "#5E5D5D",
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      justifyContent: "center",
    },
    textAreaContainer: {
      width: "80%",
      height: "20%",
      paddingTop: "20%",
    },
    textArea: {
      borderRadius: 10,
      backgroundColor: "#5E5D5D",
      width: "100%",
      height: 100,
    },
    calInputField: {
      width: "80%",
      height: "9%",
      marginTop: 40,
    },
    cal: {
      flex: 1,
      backgroundColor: "#5E5D5D",
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      color: "white",
    },
    saveButton: {
      marginTop: 20,
      backgroundColor: "#D0FD3E",
      borderRadius: 30,
      width: "60%",
      alignItems: "center",
      height: 50,
      justifyContent: "center",
    },
    saveButtonText: {
      color: "#1A202C",
      fontSize: 17,
      fontWeight: "bold",
    },
  });

  return (
    <KeyboardAvoidingView style={styles.scrollViewcontainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.leftItem}
          onPress={() => navigation.navigate("TabNavigator")}
        >
          <Text style={styles.backTxt}>back</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.titleTxt}>Log Calorie intake</Text>
        </View>
        <View style={styles.leftItem}>
          <Text style={{ color: "#1C1C1E" }}>blank</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.inputField}>
          <TextInput
            style={styles.input}
            // onChangeText={}
            value={activityName}
            placeholder="New Meal"
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.inputField}>
          <Dropdown
            style={styles.dropdown}
            data={foodData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Food"
            placeholderTextColor="white"
            searchPlaceholder="Search..."
            iconColor="white"
            activeColor="white"
            placeholderStyle={{ color: "white" }}
            value={selectFood}
            onChange={(item) => {
              setSelectFood(item.value);
            }}
          />
        </View>
        <View style={styles.inputField}>
          <Dropdown
            style={styles.dropdown}
            data={mealData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select meal"
            iconColor="white"
            activeColor="white"
            placeholderStyle={{ color: "white" }}
            searchPlaceholder="Search..."
            value={selectMeal}
            onChange={(item) => {
              setSelectmeal(item.value);
            }}
          />
        </View>
        <View style={styles.inputField}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setDateOpen(true)}
          >
            <Text style={{ color: "white" }}>Time</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={dateOpen}
            date={date}
            onConfirm={(date) => {
              setDateOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setDateOpen(false);
            }}
          />
        </View>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            multiline
            numberOfLines={4} // Adjust the number of lines as needed
            onChangeText={setNote}
            value={note}
            placeholder="Type notes here..."
            placeholderTextColor="white"
          />
        </View>

        <View style={styles.calInputField}>
          <TextInput
            style={styles.cal}
            // onChangeText={}
            value={caloriesBurned > 0 ? caloriesBurned.toString() : "Calories"}
            placeholder="Calories"
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => setDateOpen(true)}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LogCalorieIntake;
