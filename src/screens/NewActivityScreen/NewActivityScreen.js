import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Button,
  Modal,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../../assets/AsyncStorage";

const NewActivityScreen = () => {
  const navigation = useNavigation();

  const [selectActivityType, setSelectActivityType] = useState(null);
  const [selectIntensity, setSelectIntensity] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [activityTypeData, setActivityTypeData] = useState([]);

  const intensityLevelData = [
    { label: "Sedentary", value: "1" },
    { label: "Light", value: "2" },
    { label: "Moderate ", value: "3" },
    { label: "Intense ", value: "4" },
    { label: "Very Intense  ", value: "5" },
  ];
  const [startTime, setStartTime] = useState(new Date());
  const [startTimeOpen, setStartTimeOpen] = useState(false);

  const [endTime, setEndTime] = useState(new Date());
  const [endTimeOpen, setEndTimeOpen] = useState(false);

  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);

  const [note, setNote] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [duration, setDuration] = useState(0);
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
      backgroundColor: "blue",
      padding: 10,
      borderRadius: 5,
    },
    saveButton: {
      marginTop: "12%",
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

  const TimeModel = ({ timeOpen, time, setTimeOpen, setTime }) => (
    <DatePicker
      modal
      open={timeOpen}
      date={time}
      mode="time"
      onConfirm={(date) => {
        setTimeOpen(false);
        setTime(date);
      }}
      onCancel={() => {
        setTimeOpen(false);
      }}
    />
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setDuration(getDuration);
  }, [startTime, endTime]);

  const fetchData = async () => {
    try {
      const token = await getToken();
      const response = await fetch(
        "http://10.0.2.2:8080/api/v1/activity/activities",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      json.map((item, index) => {
        activityTypeData.push({ label: item.label, value: item.value });
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getDuration = () => {
    let differenceInMilliseconds = 0;
    let differenceInMinutes = 0;
    if (startTime != null && endTime != null && startTime < endTime) {
      differenceInMilliseconds = Math.abs(startTime - endTime);
      differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    }
    return differenceInMinutes;
  };

  const getCal = async () => {
    if (
      selectIntensity != null &&
      selectActivityType != null &&
      startTime != null &&
      endTime != null &&
      duration > 0
    ) {
      try {
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
        console.log("cal : " + parseFloat(json.calorie.toFixed(0)));
        setCaloriesBurned(parseFloat(json.calorie.toFixed(0)));
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    } else {
      setModalVisible(true);
    }
  };

  const saveAct = async () => {
    if (
      selectActivityType != null &&
      selectIntensity != null &&
      caloriesBurned != null &&
      duration > 0 &&
      date != null
    ) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
      const day = String(date.getDate()).padStart(2, "0");
      const token = await getToken();
      fetch("http://10.0.2.2:8080/api/v1/activity/newActivity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activityType: selectActivityType,
          calorie: caloriesBurned,
          duration: differenceInMinutes,
          intensity: selectIntensity,
          date: `${year}-${month}-${day}`,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setModalVisible(true);
    }
  };

  return (
    <ScrollView style={styles.scrollViewcontainer}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Text>You need to fill the following fields : </Text>
            <Text>--Activity Type</Text>
            <Text>--Intensity</Text>
            <Text>--Start and end time</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
            onPress={() => setDateOpen(true)}
          >
            <Text style={{ color: "white" }}>
              Date : {startTime.toDateString()}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={dateOpen}
            date={date}
            mode="date"
            onConfirm={(date) => {
              setDateOpen(false);
              setDate(date);
            }}
            onCancel={() => {
              setDateOpen(false);
            }}
          />
        </View>
        <View style={styles.inputField}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setStartTimeOpen(true)}
          >
            <Text style={{ color: "white" }}>
              Start time :{" "}
              {startTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={startTimeOpen}
            date={startTime}
            mode="time"
            onConfirm={(date) => {
              setStartTimeOpen(false);
              setStartTime(date);
            }}
            onCancel={() => {
              setStartTimeOpen(false);
            }}
          />
          {/* <TimeModel
            timeOpen={startTimeOpen}
            time={startTime}
            setTimeOpen={setStartTimeOpen}
            setTime={setStartTime}
          /> */}
        </View>
        <Text style={{ color: "white" }}>duration : {duration} minutes</Text>
        <View style={styles.inputField}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setEndTimeOpen(true)}
          >
            <Text style={{ color: "white" }}>
              End time :{" "}
              {endTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={endTimeOpen}
            date={endTime}
            mode="time"
            onConfirm={(date) => {
              setEndTimeOpen(false);
              setEndTime(date);
            }}
            onCancel={() => {
              setEndTimeOpen(false);
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
            onChangeText={setCaloriesBurned}
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

        <TouchableOpacity style={styles.saveButton} onPress={saveAct}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewActivityScreen;
