import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { storeToken } from "../AsyncStorage";
import {
  parseResponseToTokenPayload,
  tokenPayload,
} from "../../assets/tokenReponse";
import { useNavigation } from "@react-navigation/native";

// SignUpScreen Component
const SignInScreen = () => {
  var navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInProcess = () => {
    if (
      email != "" &&
      email != undefined &&
      password != "" &&
      password != undefined
    ) {
      axios
        .post("http://10.0.2.2:8080/api/v1/auth/authenticate", {
          email: email,
          password: password,
          // Add any other data you want to send in the body
        })
        .then(async (response) => {
          console.log("Success:", response.data);
          parseResponseToTokenPayload(response.data);
          console.log(tokenPayload.token);
          storeToken(tokenPayload.token);
          navigation.navigate("TabNavigator");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

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
      alignItems: "center",
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
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.loginText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.signUpText}>Sign In</Text>
        <Text style={{ color: "#1C1C1E" }}>Log in</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={signInProcess}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>Forgot your password?</Text>
    </View>
  );
};

export default SignInScreen;
