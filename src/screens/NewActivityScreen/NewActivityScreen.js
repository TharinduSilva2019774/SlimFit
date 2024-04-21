import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../AsyncStorage";

const NewActivityScreen = () => {
  const navigation = useNavigation();

  const [activityName, setActivityName] = useState("New Activity");
  const [selectActivityType, setSelectActivityType] = useState(null);
  const [selectIntensity, setSelectIntensity] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const activityTypeData = [
    { label: "Walk", value: "1" },
    { label: "Run", value: "2" },
    { label: "Yoga", value: "3" },
  ];

  const intensityLevelData = [
    { label: "Sedentary", value: "1" },
    { label: "Light", value: "2" },
    { label: "Moderate ", value: "3" },
    { label: "Intense ", value: "4" },
    { label: "Very Intense  ", value: "5" },
  ];
  const [startDateTime, setStartDateTime] = useState(new Date());
  const [startDateTimeOpen, setStartDateTimeOpen] = useState(false);

  const [endDateTime, setEndDateTime] = useState(new Date());
  const [endDateTimeOpen, setEndDateTimeOpen] = useState(false);

  const [note, setNote] = useState("");

  const styles = StyleSheet.create({
    //Main container styles
    scrollViewcontainer: {
      flex: 1,
      width: "100%",
      height: "100%",
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
      padding: 12,
      marginVertical: 12,
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
      padding: 12,
      marginVertical: 12,
      width: "100%",
    },
    dateButton: {
      flex: 1,
      backgroundColor: "#5E5D5D",
      borderRadius: 10,
      padding: 12,
      marginVertical: 12,
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
      padding: 12,
      marginVertical: 12,
      color: "white",
    },
    predButton: {
      // Style your button here
      // Example styles:
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
    },
    saveButton: {
      marginTop: "14%",
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

  const getCal = async () => {
    let duration = 0;
    if (
      selectIntensity != null ||
      selectActivityType != null ||
      startDateTime != null ||
      endDateTime != null
    ) {
      try {
        // Make your request here
        const token = await getToken();
        const response = await fetch(
          `http://10.0.2.2:8080/api/v1/activity/calorie?intensity=${selectIntensity}&actId=${selectActivityType}&duration=${duration}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await response.json();
        setCaloriesBurned(json);
        console.log(json);
        // console.log(json.breakfastActual);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    } else {
      console.log("test");
    }
  };

  return (
    <ScrollView style={styles.scrollViewcontainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.leftItem}
          onPress={() => navigation.navigate("TabNavigator")}
        >
          <Text style={styles.backTxt}>back</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.titleTxt}>New Activity</Text>
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
            placeholder="New Activity"
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.inputField}>
          <Dropdown
            style={styles.dropdown}
            data={activityTypeData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Activity type"
            placeholderTextColor="white"
            searchPlaceholder="Search..."
            iconColor="white"
            activeColor="white"
            placeholderStyle={{ color: "white" }}
            value={selectActivityType}
            onChange={(item) => {
              setSelectActivityType(item.value);
            }}
          />
        </View>
        <View style={styles.inputField}>
          <Dropdown
            style={styles.dropdown}
            data={intensityLevelData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select intensity "
            iconColor="white"
            activeColor="white"
            placeholderStyle={{ color: "white" }}
            searchPlaceholder="Search..."
            value={selectIntensity}
            onChange={(item) => {
              setSelectIntensity(item.value);
            }}
          />
        </View>
        <View style={styles.inputField}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setStartDateTimeOpen(true)}
          >
            <Text style={{ color: "white" }}>
              Start time : {startDateTime.toDateString()}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={startDateTimeOpen}
            date={startDateTime}
            onConfirm={(date) => {
              setStartDateTimeOpen(false);
              setStartDateTime(date);
            }}
            onCancel={() => {
              setStartDateTimeOpen(false);
            }}
          />
        </View>
        <View style={styles.inputField}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setEndDateTimeOpen(true)}
          >
            <Text style={{ color: "white" }}>
              End time : {endDateTime.toDateString()}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={endDateTimeOpen}
            date={endDateTime}
            onConfirm={(date) => {
              setEndDateTimeOpen(false);
              setEndDateTime(date);
            }}
            onCancel={() => {
              setEndDateTimeOpen(false);
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

        <View
          style={{
            width: "80%",
            height: "9%",
            marginTop: 40,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            style={styles.cal}
            // onChangeText={}
            value={caloriesBurned > 0 ? caloriesBurned.toString() : ""}
            placeholder="Calories"
          />
          <TouchableOpacity
            style={{
              backgroundColor: "green",
              padding: 5,
              borderRadius: 5,
              margin: 10,
            }}
            onPress={getCal}
          >
            <Text>Calculate</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => setStartDateTimeOpen(true)}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewActivityScreen;
