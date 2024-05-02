import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import DatePicker from "react-native-date-picker";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../../assets/AsyncStorage";

const LogCalorieIntake = () => {
  const navigation = useNavigation();
  const [mealName, setActivityName] = useState("New Meal");
  const [currentSelectedFoodWeight, setCurrentSelectedFoodWeight] = useState();
  const [selectMeal, setSelectmeal] = useState(null);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredValues, setFilteredValues] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  // Sample data, replace with your own dataset

  // Function to filter values based on search keyword
  const filterValues = async () => {
    setFilteredFoods([]);
    const token = await getToken();

    const response = await fetch(
      `http://10.0.2.2:8080/api/v1/calorie/searchFoodCal?foodName=${searchKeyword}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.matchFood !== null) {
      const name = json.matchFood.foodName;
      const cal = Math.round(json.matchFood.cal);
      filteredFoods.push({ name, cal });
    }

    json.hintedFoods.map((item, index) => {
      const name = item.foodName;
      const cal = Math.round(item.cal);
      filteredFoods.push({ name, cal });
    });
    const filtered = filteredFoods.filter((value) =>
      value.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredValues(filtered);
  };

  // Function to handle weight selection
  const handleWeightSelection = (name, cal) => {
    if (currentSelectedFoodWeight > 0) {
      const calForWeight = Math.round(currentSelectedFoodWeight * (cal / 100));
      const weight = Math.round(currentSelectedFoodWeight);
      selectedWeights.push({ name, weight, calForWeight });
      setSearchKeyword("");
      setFilteredFoods([]);
      setCurrentSelectedFoodWeight(100);
      setCaloriesBurned(caloriesBurned + calForWeight);
    }
  };

  const mealData = [
    { label: "Breakfast", value: "1" },
    { label: "Lunch", value: "2" },
    { label: "Dinner", value: "3" },
    { label: "Snack", value: "4" },
    { label: "Other", value: "5" },
  ];
  const [date, setDate] = useState(new Date());
  const [dateOpen, setDateOpen] = useState(false);

  const clearItems = () => {
    setSelectedWeights([]);
    setCaloriesBurned(0);
  };

  const saveDate = async () => {
    const token = await getToken();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0");
    fetch("http://10.0.2.2:8080/api/v1/record/newRecord", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        meal: selectMeal,
        calorieCount: caloriesBurned,
        mealName: mealName,
        note: "",
        date: `${year}-${month}-${day}`,
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setCaloriesBurned(0);
        setCurrentSelectedFoodWeight();
        setSelectedWeights([]);
        navigation.navigate("TabNavigator");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
            value={mealName}
            placeholder="New Meal"
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.inputField}>
          <Dropdown
            style={styles.dropdown}
            data={mealData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Meal"
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
        <View style={{ width: "80%" }}>
          <TextInput
            style={{
              height: 50,
              borderWidth: 1,
              paddingHorizontal: 10,
              backgroundColor: "#5E5D5D",
              borderRadius: 10,
              marginVertical: 10,
              color: "white",
            }}
            placeholder="Search..."
            onChangeText={(text) => {
              setSearchKeyword(text);
              filterValues();
            }}
            value={searchKeyword}
          />
          <FlatList
            data={filteredValues}
            keyExtractor={(item) => item.name.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ color: "white" }}>{item.name}</Text>
                <Text style={{ color: "white" }}>{item.cal} kcal</Text>
                <View style={{ flexDirection: "row" }}>
                  <TextInput
                    value={currentSelectedFoodWeight}
                    style={{
                      height: 20,
                      borderColor: "gray",
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      marginRight: 10,
                      color: "white",
                    }}
                    placeholderTextColor={"grey"}
                    onChangeText={setCurrentSelectedFoodWeight}
                  />
                  <TouchableOpacity
                    style={{ backgroundColor: "#D0FD3E", borderRadius: 5 }}
                    onPress={() => handleWeightSelection(item.name, item.cal)}
                  >
                    <Text>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        <View style={{ marginTop: "10%" }}>
          {selectedWeights.length > 0 ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Selected items
              </Text>
              <TouchableOpacity onPress={clearItems}>
                <Text style={{ color: "#D0FD3E", fontWeight: "bold" }}>
                  clear
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View></View>
          )}

          <View style={styles.textAreaContainer}>
            <ScrollView>
              {selectedWeights.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Text style={{ color: "white" }}>{item.name}</Text>
                  <Text style={{ color: "white" }}>{item.weight} g</Text>
                  <Text style={{ color: "white" }}>
                    {item.calForWeight} kcal
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.calInputField}>
          <TextInput
            style={styles.cal}
            // onChangeText={}
            value={caloriesBurned > 0 ? caloriesBurned.toString() : "Calories"}
            placeholder="Calories"
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveDate}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
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
  searchInput: {
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: "#5E5D5D",
    borderRadius: 10,
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
  foodDropdown: {
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    backgroundColor: "#5E5D5D",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
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
    backgroundColor: "grey",
    borderRadius: 5,
    minHeight: 10,
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
export default LogCalorieIntake;
