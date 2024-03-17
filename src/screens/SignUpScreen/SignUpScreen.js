import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

// SignUpScreen Component
const SignUpScreen = () => {
  // Reusable Input Component with Label
  const InputField = ({ label, placeholder, secureTextEntry }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );

  // Reusable Button Component
  const CustomButton = ({ title }) => (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // alignItems: "center",
      backgroundColor: "#1F2937",
      width: "100%",
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 32,
      marginTop: 16,
    },
    signUpText: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#F9FAFB",
    },
    loginText: {
      color: "#D0FD3E",
      fontWeight: "600",
    },
    inputContainer: {
      marginTop: 24,
      paddingHorizontal: 16,
      alignSelf: "stretch",
    },
    inputLabel: {
      color: "#F9FAFB",
      marginBottom: 8,
    },
    input: {
      backgroundColor: "#515050",
      color: "#F9FAFB",
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    newsletterContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 24,
      paddingHorizontal: 16,
    },
    checkbox: {
      width: 20,
      height: 20,
      backgroundColor: "#4A5568",
      marginRight: 16,
    },
    newsletterText: {
      color: "#F9FAFB",
      flex: 1,
    },
    button: {
      marginTop: 32,
      backgroundColor: "#D1D5DB",
      paddingHorizontal: 64,
      paddingVertical: 12,
      borderRadius: 50,
      alignItems: "center",
    },
    buttonText: {
      color: "#1A202C",
      fontWeight: "bold",
    },
    forgotPassword: {
      color: "#D0FD3E",
      marginTop: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.signUpText}>Sign Up</Text>
        <Text style={styles.loginText}>Login</Text>
      </View>

      <InputField label="Name" placeholder="Enter your name" />
      <InputField label="Email" placeholder="Enter your email" />
      <InputField
        label="Password"
        placeholder="Enter your password"
        secureTextEntry={true}
      />

      <View style={styles.newsletterContainer}>
        <View style={styles.checkbox} />
        <Text style={styles.newsletterText}>
          I would like to receive your newsletter and other promotional
          information.
        </Text>
      </View>

      <CustomButton title="Sign Up" />

      <Text style={styles.forgotPassword}>Forgot your password?</Text>
    </View>
  );
};

export default SignUpScreen;
