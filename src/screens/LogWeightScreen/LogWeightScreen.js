import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getToken } from "../../assets/AsyncStorage";
import { RulerPicker } from "react-native-ruler-picker";
import { styles } from "./Styles";

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

export default LogWeightScreen;
