import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
      paddingTop: "10%",
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
      marginTop: "8%",
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