import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getToken } from "../../assets/AsyncStorage";

const ProgressScreen = () => {
  const [show, setShow] = useState(false);
  const [actualWeightData, setActualWeightData] = useState([]);
  const [actualDateData, setActualDateData] = useState([]);
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

    const response = await fetch(
      `http://10.0.2.2:8080/api/v1/progress/actual`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await response.json();
    setActualDateData([]);
    setActualWeightData([]);
    var dates = [];
    var weight = [];
    json.map((item, index) => {
      const d = new Date(item.date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
      const day = String(d.getDate()).padStart(2, "0");
      dates.push(`${year}/${month}/${day}`);
      weight.push(item.weight);
    });
    setActualDateData(dates);
    setActualWeightData(weight);
    setShow(true);
  };

  const screenWidth = Dimensions.get("window").width;

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
    recordContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#2C2C2E",
      padding: 15,
      paddingEnd: 20,
      marginBottom: 10,
      width: "97%",
    },
    recordText: {
      color: "#F7FAFC",
      fontSize: 16,
    },
  });

  const Record = ({ date, weight }) => (
    <View style={styles.recordContainer}>
      <Text style={styles.recordText}>{date}</Text>
      <Text style={styles.recordText}>{weight}</Text>
    </View>
  );

  const RecordList = ({ records }) => (
    <View>
      {records.map((record, index) => (
        <Record key={index} date={record.date} weight={record.weight} />
      ))}
    </View>
  );

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
      {show && (
        <View style={styles.container}>
          <View style={{ paddingTop: "5%" }}>
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
          </View>
        </View>
      )}
    </View>
  );
};

export default ProgressScreen;
