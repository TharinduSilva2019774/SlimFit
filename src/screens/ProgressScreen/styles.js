import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
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