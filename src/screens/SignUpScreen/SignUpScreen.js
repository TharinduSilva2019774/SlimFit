import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { storeToken } from "../../assets/AsyncStorage";
import axios from "axios";
import {
  parseResponseToTokenPayload,
  tokenPayload,
} from "../../assets/tokenReponse";

const SignUpScreen = () => {
  var navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erroMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  const signUpRequest = () => {
    if (!validateEmail(email)) {
      console.log("Invalid email");
      setErrorMessage("Invalid email");
      setModalVisible(true);
    } else if (!validatePassword(password)) {
      console.log("Invalid password");
      setErrorMessage(
        "The password should at least contain 8 characters, including an upper case, a lower case letter and numbers."
      );
      setModalVisible(true);
    } else {
      if ((firstName != "", lastName != "", email != "", password != "")) {
        axios
          .post("http://10.0.2.2:8080/api/v1/auth/register", {
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: password,
          })
          .then(async (response) => {
            console.log("Success:", response.data);
            parseResponseToTokenPayload(response.data);
            console.log(tokenPayload.token);
            storeToken(tokenPayload.token);
            navigation.navigate("OnBoarding");
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.response.data);
              setErrorMessage(error.response.data);
            } else {
              console.log("Error", error.message);
              setErrorMessage("Unexpected error, please try again");
            }
            setModalVisible(true);
          });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.signUpText}></Text>
        <Text style={styles.signUpText}>Sign Up</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter you first name"
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your last name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter you password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* <View style={styles.newsletterContainer}>
        <View style={styles.checkbox} />
        <Text style={styles.newsletterText}>
          I would like to receive your newsletter and other promotional
          information.
        </Text>
      </View> */}

      <TouchableOpacity style={styles.button} onPress={signUpRequest}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>Forgot your password?</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
          >
            <Text>{erroMessage}</Text>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default SignUpScreen;
