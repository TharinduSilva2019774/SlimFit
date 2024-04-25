import React, { useState, useEffect } from "react";
import {
  TextInput,
  ScrollView,
  Button,
  Modal,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../../assets/AsyncStorage";
import { RulerPicker } from "react-native-ruler-picker";

const LogWeightScreen = () => {
  const navigation = useNavigation();
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    getLastWeight();
  }, []);

  const getLastWeight = async () => {
    const token = await getToken();

    const response = await fetch(`http://10.0.2.2:8080/api/v1/user/weight`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await response.json();
    setWeight(json.weight);
  };

  const onSubmit = async () => {
    const token = await getToken();
    fetch("http://10.0.2.2:8080/api/v1/user/weight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        weight: weight,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        navigation.navigate("TabNavigator");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>What's your weight?</Text>
      </View>
      <RulerPicker
        unitTextStyle={{ color: "#FFF", fontSize: 30 }}
        valueTextStyle={{ color: "#FFF", fontSize: 40 }}
        min={30}
        max={150}
        initialValue={parseFloat(weight)}
        unit="KG"
        step={0.1}
        onValueChangeEnd={(number) => setWeight(number)}
      />
      <View style={styles.content}>
        <Image
          resizeMode="contain"
          source={{
            uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/94841660908d6f01817a2658a9340c90e7e28d7f1c9a17d6f046b457ba0a8f55?apiKey=748f91a40ab04acf923d77b5c15f23f6&",
          }}
          style={styles.mainImage}
        />
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={styles.textContainer}
            onPress={() => navigation.navigate("TabNavigator")}
          >
            <Text style={{ color: "#D0FD3E" }}>back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={onSubmit}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1C1C1E",
    display: "flex",
    maxWidth: 480,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    padding: "80px 0 44px",
  },
  header: {
    color: "#FFF",
    textAlign: "center",
    marginTop: 11,
    fontFamily: "Integral CF, sans-serif",
    fontWeight: "700",
    fontSize: 20,
    lineHeight: "150%",
    padding: "5%",
  },
  headerText: {
    color: "#FFF",
    fontSize: 25,
    fontFamily: "ABeeZee",
    padding: "5%",
    fontWeight: "900",
  },
  content: {
    display: "flex",
    marginTop: "10%",
    padding: "7%",
    width: "100%",
    maxWidth: 312,
    alignItems: "stretch",
    gap: 20,
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    whiteSpace: "nowrap",
    textAlign: "center",
    justifyContent: "space-between",
  },
  mainImage: {
    position: "relative",
    width: 54,
    flexShrink: 0,
    aspectRatio: 1,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "start",
    borderRadius: 48,
    display: "flex",
    flexDirection: "column",
    margin: "auto 0",
    padding: 13,
    flex: 1,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "start",
    borderRadius: 48,
    backgroundColor: "#D0FD3E",
    display: "flex",
    flexDirection: "column",
    margin: "auto 0",
    padding: 13,
    flex: 1,
  },
  buttonText: {
    fontFamily: "Open Sans, sans-serif",
    textAlign: "center",
  },
  buttonIcon: {
    position: "relative",
    width: 24,
    flexShrink: 0,
    aspectRatio: 1,
  },
});

export default LogWeightScreen;
