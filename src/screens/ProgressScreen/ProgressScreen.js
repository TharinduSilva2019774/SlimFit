import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getToken } from "../../assets/AsyncStorage";
import { styles } from "./styles";

const ProgressScreen = () => {
  const [show, setShow] = useState(false);
  const [actualWeightData, setActualWeightData] = useState([]);
  const [actualDateData, setActualDateData] = useState([]);
  const [goalWeightData, setGoalWeightData] = useState([]);
  const [goalDateData, setGoalDateData] = useState([]);
  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`,
    barPercentage: 0.5,
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = await getToken();

    const actualResponse = await fetch(
      `http://10.0.2.2:8080/api/v1/progress/actual`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const acutalJson = await actualResponse.json();
    var dates = [];
    var weight = [];
    acutalJson.map((item, index) => {
      const d = new Date(item.date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      dates.push(`${year}/${month}/${day}`);
      weight.push(item.weight);
    });
    setActualDateData(dates);
    setActualWeightData(weight);

    const goalResponse = await fetch(
      `http://10.0.2.2:8080/api/v1/progress/goal`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const goalJson = await goalResponse.json();
    var dates = [];
    var weight = [];
    goalJson.map((item, index) => {
      const d = new Date(item.date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
      const day = String(d.getDate()).padStart(2, "0");
      dates.push(`${year}/${month}/${day}`);
      weight.push(item.weight);
    });
    setGoalDateData(dates);
    setGoalWeightData(weight);

    setShow(true);
  };

  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.scrollViewcontainer}>
      <View style={styles.headerContainer}>
        <View style={styles.leftItem}>
          <Text style={{ color: "#1C1C1E" }}>blank</Text>
        </View>
        <View>
          <Text style={styles.titleTxt}>Progress</Text>
        </View>
        <View style={styles.leftItem}>
          <Text style={{ color: "#1C1C1E" }}>blank</Text>
        </View>
      </View>
      <View style={styles.container}>
  <View style={{ paddingTop: "5%" }}>  
    {show && (
      <LineChart
        data={{
          labels: actualDateData,
          datasets: [
            {
              data: actualWeightData,
            },
          ],
        }}
        width={screenWidth}
        height={300}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
      />
    )}
  </View>
  <View style={{ paddingTop: "5%" }}>  
    {show && (
      <LineChart
        data={{
          labels: goalDateData,
          datasets: [
            {
              data: goalWeightData,
            },
          ],
        }}
        width={screenWidth}
        height={300}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
      />
    )}
  </View>
</View>
    </View>
  );
};

export default ProgressScreen;
