import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import CircularProgress from "react-native-circular-progress-indicator";
import { getToken } from "../../assets/AsyncStorage";
import { useNavigation } from "@react-navigation/native";

const DayItem = ({ day, date, isSelected, onSelect }) => {
  const style = isSelected ? styles.dayItemSelected : styles.dayItem;
  return (
    <TouchableOpacity onPress={() => onSelect(day)} style={style.container}>
      <Text style={style.day}>{day}</Text>
      <Text style={style.date}>{date}</Text>
    </TouchableOpacity>
  );
};

const MealRecordCard = ({ mealName, stats, goalMet }) => (
  <View style={styles.mealRecordCard}>
    <View>
      <Text style={styles.mealRecordTitle}>{mealName}</Text>
      <Text
        style={[
          styles.mealRecordStats,
          goalMet ? { color: "green" } : { color: "red" },
        ]}
      >
        {stats}
      </Text>
    </View>
  </View>
);

const HomeScreen = () => {
  var navigation = useNavigation();
  const [data, setData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [mealRecords, setMealRecords] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  const fetchData = async () => {
    try {
      const token = await getToken();

      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const response = await fetch(
        `http://10.0.2.2:8080/api/v1/calorie/dailyDetails?date=${year}-${month}-${day}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const json = await response.json();
      setData(json);
      setMealRecords([
        {
          mealName: "Breakfast",
          stats: json.breakfastActual + "/" + json.breakfastGoal,
          goalMet: json.breakfastActual <= json.breakfastGoal,
        },
        {
          mealName: "Lunch",
          stats: json.lunchActual + "/" + json.lunchGoal,
          goalMet: json.lunchActual <= json.lunchGoal,
        },
        {
          mealName: "Dinner",
          stats: json.dinnerActual + "/" + json.dinnerGoal,
          goalMet: json.dinnerActual <= json.dinnerGoal,
        },
      ]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  // Array to store the seven dates
  const dates = [];

  // Loop to populate the array with seven dates
  for (let i = -3; i <= 3; i++) {
    const date = new Date(selectedDate);
    date.setDate(selectedDate.getDate() + i);
    dates.push(date);
  }

  function addLeadingZero(number) {
    return number < 10 ? "0" + number : number.toString();
  }

  return (
    <ScrollView style={styles.appContainer}>
      <View style={styles.dailyStatsContainer}>
        <View style={styles.dayItemsContainer}>
          {dates.map((date, index) => (
            <DayItem
              day={daysOfWeek[date.getDay()]}
              date={addLeadingZero(date.getDate())}
              isSelected={
                date.getDate() == selectedDate.getDate() ? true : false
              }
              onSelect={() => {
                setSelectedDate(date);
              }}
            />
          ))}
        </View>
      </View>
      <View style={styles.mealRecordsContainer}>
        <View style={{ alignItems: "center" }}>
          <CircularProgress
            value={data != null ? data.dailyActual : 1000}
            radius={84}
            duration={2000}
            progressValueColor={"#ecf0f1"}
            maxValue={data != null ? data.dailyGoal : 1600}
            title={"Active Calories"}
            titleColor={"white"}
            titleStyle={{ fontSize: 13 }}
          />
        </View>

        <View style={styles.activityRingContainer}>
          <View style={{ padding: 35 }}>
            <CircularProgress
              value={data != null ? data.totalActiveMinutes : 50}
              radius={50}
              duration={2000}
              progressValueColor={"#ecf0f1"}
              maxValue={data != null ? data.totalActiveMinutes : 100}
              title={"Active Time"}
              titleColor={"white"}
              titleStyle={{ fontSize: 12 }}
            />
          </View>
          <View style={{ padding: 35 }}>
            <CircularProgress
              value={data != null ? data.targetWeight : 50}
              radius={50}
              duration={2000}
              progressValueColor={"#ecf0f1"}
              maxValue={data != null ? data.currentWeight : 70}
              title={"Target"}
              titleColor={"white"}
              titleStyle={{ fontSize: 12 }}
            />
          </View>
        </View>
        <Text style={styles.mealRecordsTitle}>Meal Records</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {mealRecords.map((meal) => (
            <MealRecordCard
              key={meal.mealName}
              mealName={meal.mealName}
              stats={meal.stats}
              goalMet={meal.goalMet}
            />
          ))}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: "10%",
          }}
        >
          <TouchableOpacity
            style={styles.logButtons}
            onPress={() => navigation.navigate("NewAct")}
          >
            <Text style={{ color: "white" }}>Log activity</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logButtons}
            onPress={() => navigation.navigate("LogCal")}
          >
            <Text style={{ color: "white" }}>Log food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logButtons}
            onPress={() => navigation.navigate("LogWeight")}
          >
            <Text style={{ color: "white" }}>Log weight</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#1F2937",
    width: "100%",
  },
  coverImage: {
    width: "100%",
    aspectRatio: 8.33,
  },
  dayItemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  dailyStatsContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
    width: "100%",
    backgroundColor: "#374151",
  },
  dailyStatsList: {
    justifyContent: "space-between",
  },
  dailyStatCard: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#374151",
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 9999,
  },
  dailyStatCardActive: {
    backgroundColor: "#A3E635",
  },
  dailyStatText: {
    fontSize: 12,
    lineHeight: 16,
    color: "#FFFFFF",
  },
  dailyStatDate: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  mealRecordsContainer: {
    paddingHorizontal: 24,
    marginTop: 32,
    width: "100%",
  },
  activityRingContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  activityRingTextContainer: {
    position: "absolute",
  },
  calorieCount: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  calorieLabel: {
    fontSize: 24,
    color: "#FFFFFF",
  },
  mealRecordsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  mealRecordCard: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: "#374151",
    width: "32%",
  },
  mealRecordTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  mealRecordStats: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 16,
    color: "#A3E635",
  },
  mealRecordImage: {
    width: 24,
    height: 24,
  },
  dayItemSelected: {
    container: {
      backgroundColor: "#00FF00",
      padding: 10,
      borderRadius: 15,
    },
    day: {
      color: "#000000",
    },
    date: {
      color: "#000000",
    },
  },
  dayItem: {
    container: {
      backgroundColor: "#777777",
      padding: 10,
      borderRadius: 15,
    },
    day: {
      color: "#FFFFFF",
    },
    date: {
      color: "#FFFFFF",
    },
  },

  logButtons: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginTop: 16,
    borderRadius: 8,
    backgroundColor: "green",
    width: "32%",
  },
});

export default HomeScreen;
