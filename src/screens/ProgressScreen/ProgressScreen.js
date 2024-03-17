import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Dimensions,
} from "react-native";
import {
  LineChart,
  BarChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
const ProgressScreen = () => {
  const intencityLevelData = [
    { label: "Sedentary", value: "1" },
    { label: "Light", value: "2" },
    { label: "Moderate ", value: "3" },
    { label: "Intense ", value: "4" },
    { label: "Very Intense  ", value: "5" },
  ];

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    barPercentage: 0.5,
  };

  const data = {
    labels: ["2023/12/20", "2023/11/30", "2023/11/11", "2023/10/20"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const screenWidth = Dimensions.get("window").width;

  const records = [
    { date: "2023/12/20", weight: "54.7kg" },
    { date: "2023/11/30", weight: "55.0kg" },
    { date: "2023/11/11", weight: "55.5kg" },
    { date: "2023/10/20", weight: "56.4kg" },
  ];

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
          <Text style={styles.backTxt}>back</Text>
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
          <LineChart
            data={data}
            width={screenWidth}
            height={300}
            verticalLabelRotation={30}
            chartConfig={chartConfig}
            bezier
          />
        </View>
        <View style={{ alignItems: "center", paddingTop: "25%" }}>
          <RecordList records={records} />
        </View>
      </View>
    </View>
  );
};

export default ProgressScreen;
