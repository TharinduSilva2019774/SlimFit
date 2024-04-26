import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const DummyScreen = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredValues, setFilteredValues] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState({});

  // Sample data, replace with your own dataset
  const allValues = [
    { id: 1, name: "Value 1" },
    { id: 2, name: "Value 2" },
    { id: 3, name: "Value 3" },
    // Add more values as needed
  ];

  // Function to filter values based on search keyword
  const filterValues = async () => {
    const filtered = allValues.filter((value) =>
      value.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredValues(filtered);
  };

  // Function to handle weight selection
  const handleWeightSelection = (id, weight) => {
    setSelectedWeights({ ...selectedWeights, [id]: weight });
  };

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          paddingHorizontal: 10,
        }}
        placeholder="Search..."
        onChangeText={(text) => {
          setSearchKeyword(text);
          filterValues();
        }}
        value={searchKeyword}
      />
      <FlatList
        data={filteredValues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
            }}
          >
            <Text>{item.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <TextInput
                style={{
                  height: 20,
                  borderColor: "gray",
                  borderWidth: 1,
                  paddingHorizontal: 10,
                }}
                placeholder="Search..."
                onChangeText={(text) => {
                  setSearchKeyword(text);
                  filterValues();
                }}
                value={searchKeyword}
              />
              <TouchableOpacity
                onPress={() => handleWeightSelection(item.id, "heavy")}
              >
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* <ScrollView style={{ width: "20%" }}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Line 1</Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Line 2</Text>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Line 3</Text>
        </View>
      </ScrollView> */}
      <Text>Test</Text>
    </View>
  );
};

export default DummyScreen;
