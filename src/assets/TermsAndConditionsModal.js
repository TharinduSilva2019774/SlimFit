import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const TermsAndConditionsModal = ({ onClose }) => {
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modal}>
        <Text style={styles.heading}>Terms and Conditions</Text>
        <Text style={styles.paragraph}>
          By using SlimFit, you agree to be bound by these terms and conditions.
          This app utilizes a machine learning model to calculate calories for
          exercises and collects user data including (hight, weight, date of
          birth, gender)
        </Text>
        <Text style={styles.paragraph}>
          SlimFit shall not be liable for any damages arising from the use of
          this app, including the utilization of the machine learning model.
        </Text>
        <Button title="Close" onPress={onClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paragraph: {
    marginBottom: 10,
  },
});

export default TermsAndConditionsModal;
