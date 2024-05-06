import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { Dropdown } from "react-native-element-dropdown";
import { getToken } from "../../assets/AsyncStorage";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles"; 

const handleInputChange = (newValue, setValue) => {
  // Regular expression to check if the input is a valid number
  const numberRegex = /^[0-9]*$/;

  if (numberRegex.test(newValue) || newValue === "") {
    setValue(newValue);
  }
};

function OnBoardingScreen() {
  var navigation = useNavigation();
  const [dateOpen, setDateOpen] = useState(false);
  const genders = [
    { label: "Male", value: "1" },
    { label: "Female", value: "2" },
  ];
  const [modalVisible, setModalVisible] = useState(false);

  const [age, setAge] = useState(0);
  const [height, setHight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [gender, setGender] = useState(0);
  const [targetWeight, setTargetWeight] = useState(0);
  const [dob, setDob] = useState(new Date());
  const [weeklyWeightLossGoal, setWeeklyWeightLossGoal] = useState(0);
  const [dailyActivityGoal, setDailyActivityGoal] = useState(0);

  useEffect(() => {
    calculateAge();
  }, [dob]);

  const saveUserInfor = async () => {
    if (
      (age > 20,
      height > 0,
      weight > 0,
      gender > 0,
      weeklyWeightLossGoal > 0 && weeklyWeightLossGoal <= 500,
      dailyActivityGoal > 0)
    ) {
      const token = await getToken();
      fetch("http://10.0.2.2:8080/api/v1/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          dateOfBirth: dob,
          height: height,
          weight: weight,
          gender: gender,
          weeklyWeightLossGoal: weeklyWeightLossGoal,
          dailyActivityGoal: dailyActivityGoal,
          targetWeight: targetWeight,
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
          navigation.navigate("TabNavigator");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setModalVisible(true);
    }
  };

  const calculateAge = () => {
    const currentDate = new Date();
    const enteredDate = new Date(dob);

    // Calculate the difference in milliseconds between the two dates
    const differenceInMs = currentDate - enteredDate;

    // Convert the difference to years
    const ageInYears = Math.floor(differenceInMs / (1000 * 60 * 60 * 24 * 365));

    setAge(ageInYears.toString());
  };

  const calculateTimeToReachTarget = () => {
    if (
      weeklyWeightLossGoal > 0 &&
      weight > 0 &&
      targetWeight > 40 &&
      dailyActivityGoal > 0
    ) {
      const currentWeightKg = parseFloat(weight);
      const targetWeightKg = parseFloat(targetWeight);
      const weeklyWeightLossGrams = parseFloat(
        weeklyWeightLossGoal - dailyActivityGoal
      );

      if (
        !isNaN(currentWeightKg) &&
        !isNaN(targetWeightKg) &&
        !isNaN(weeklyWeightLossGrams)
      ) {
        var timeInWeeks = (
          (targetWeightKg - currentWeightKg) /
          (weeklyWeightLossGrams / 1000)
        ).toFixed(0);

        if (timeInWeeks < 0) {
          timeInWeeks = timeInWeeks * -1;
        }

        return `You will achive you goal in ${timeInWeeks} weeks`;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Fill Your Profile Information</Text>
      </View>
      <View style={styles.inputField}>
        <View style={styles.profileAttributeContainer}>
          <View style={styles.profileAttributeLabelContainer}>
            <Text style={styles.profileAttributeLabelText}>Height (cm)</Text>
          </View>
          <TextInput
            style={styles.profileAttributeValueContainer}
            onChangeText={(val) => handleInputChange(val, setHight)}
            placeholder={"..."}
            placeholderTextColor="#FFF"
            value={height}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.profileAttributeContainer}>
          <View style={styles.profileAttributeLabelContainer}>
            <Text style={styles.profileAttributeLabelText}>Weight (kg)</Text>
          </View>
          <TextInput
            style={styles.profileAttributeValueContainer}
            onChangeText={(val) => handleInputChange(val, setWeight)}
            placeholder={"..."}
            placeholderTextColor="#FFF"
            value={weight}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.profileAttributeContainer}>
          <View style={styles.profileAttributeLabelContainer}>
            <Text style={styles.profileAttributeLabelText}>
              Weekly Weight Loss Goal (grams)
            </Text>
          </View>
          <TextInput
            style={styles.profileAttributeValueContainer}
            onChangeText={(val) =>
              handleInputChange(val, setWeeklyWeightLossGoal)
            }
            placeholder={"..."}
            placeholderTextColor="#FFF"
            value={weeklyWeightLossGoal}
            keyboardType="numeric"
          />
          <Text style={{ color: "red", paddingTop: "4%" }}>
            {weeklyWeightLossGoal > 500
              ? "Above 500 grams a week is not sustanable for a long period of time"
              : ""}
          </Text>
        </View>

        <View style={styles.profileAttributeContainer}>
          <View style={styles.profileAttributeLabelContainer}>
            <Text style={styles.profileAttributeLabelText}>
              Daily Activity Goal (kcal)
            </Text>
          </View>
          <TextInput
            style={styles.profileAttributeValueContainer}
            onChangeText={(val) => handleInputChange(val, setDailyActivityGoal)}
            placeholder={"..."}
            placeholderTextColor="#FFF"
            value={dailyActivityGoal}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.profileAttributeContainer}>
          <View style={styles.profileAttributeLabelContainer}>
            <Text style={styles.profileAttributeLabelText}>
              Target weight (kg)
            </Text>
          </View>
          <TextInput
            style={styles.profileAttributeValueContainer}
            onChangeText={(val) => handleInputChange(val, setTargetWeight)}
            placeholder={"..."}
            placeholderTextColor="#FFF"
            value={targetWeight}
            keyboardType="numeric"
          />
          <Text style={{ color: "red", paddingTop: "4%" }}>
            {targetWeight < 40 && targetWeight > 0
              ? "This is an unrealistic goal"
              : calculateTimeToReachTarget()}
          </Text>
        </View>
        <View style={styles.profileAttributeContainer}>
          <View style={styles.profileAttributeLabelContainer}>
            <Text style={styles.profileAttributeLabelText}>Date of birth</Text>
          </View>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setDateOpen(true)}
          >
            <Text style={{ color: "white" }}>Date : {dob.toDateString()}</Text>
          </TouchableOpacity>
          <DatePicker
            modal
            open={dateOpen}
            date={dob}
            mode="date"
            onConfirm={(date) => {
              setDateOpen(false);
              setDob(date);
            }}
            onCancel={() => {
              setDateOpen(false);
            }}
          />
          <Text style={{ color: "grey", paddingTop: "4%" }}>
            {age < 20
              ? "You are too yong for this application"
              : `You are ${age} years old`}
          </Text>
        </View>
        <View style={styles.profileAttributeContainer}>
          <View style={styles.profileAttributeLabelContainer}>
            <Text style={styles.profileAttributeLabelText}>
              Biological gender
            </Text>
          </View>
          <Dropdown
            style={styles.dropdown}
            data={genders}
            maxHeight={300}
            labelField="label"
            placeholder="Select gender "
            placeholderTextColor="white"
            searchPlaceholder="Search..."
            iconColor="white"
            activeColor="white"
            placeholderStyle={{ color: "white" }}
            value={gender}
            onChange={(item) => {
              setGender(item.value);
            }}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={saveUserInfor}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>

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
            <Text>--Age</Text>
            <Text>--Height</Text>
            <Text>--Weight</Text>
            <Text>--Gender</Text>
            <Text>--Date of birth</Text>
            <Text>--Weekly Weight Loss Goal</Text>
            <Text>--Daily Activity Goal</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

export default OnBoardingScreen;
