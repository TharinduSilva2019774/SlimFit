import React,{useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput ,ScrollView,KeyboardAvoidingView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


const LogCalorieIntake = () => {

    const styles = StyleSheet.create({
        scrollViewcontainer:{
            flex: 1,
            width: "100%",
            minHeight:"1000px",
        },
        container: {
          flex: 1,
          alignItems: 'center',
        //   justifyContent: 'center',
          backgroundColor: '#1C1C1E',
          width:"100%"
        },
        input: {
          flex: 1,
          backgroundColor: "#5E5D5D",
          borderRadius: 10,
          padding: 10,
          marginVertical: 10,
        },
        inputField: {
          width:"80%",
          height:"9%"
        },
        imageCover: {
          width: '100%',
          aspectRatio: 8.33,
        },
        dropdown: {
          borderBottomColor: 'gray',
          borderBottomWidth: 0.5,
          backgroundColor:"#5E5D5D",
          borderRadius: 10,
          padding: 10,
          marginVertical: 10,
          width:"100%"
        },
      //   saveButton: {
      //     marginTop: 24,
      //     backgroundColor: '#0A84FF',
      //     paddingVertical: 15,
      //     borderRadius: 20,
      //     alignItems: 'center',
      //     justifyContent: 'center',
      //   },
      //   saveButtonText: {
      //     fontSize: 20,
      //     fontWeight: '600',
      //     color: '#FFFFFF',
      //   },
      });

    const [inputValue, setInputValue] = useState('');
    const [value, setValue] = useState(null);
    const foodData = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
      ];

    const mealData = [
        { label: 'Breakfast', value: '1' },
        { label: 'Lunch', value: '2' },
        { label: 'Dinner', value: '3' },
        { label: 'Snack', value: '4' },
        { label: 'Other', value: '5' },
      ];


  return (
    <KeyboardAvoidingView style={styles.scrollViewcontainer}>
        <View style={styles.container}>
            <View style={styles.inputField}>
                <TextInput
                style={styles.input}
                // onChangeText={}
                value={inputValue}
                placeholder="New Activity"
            />
            </View>
            <View style={styles.inputField}>
              <Dropdown
                  style={styles.dropdown}
                  data={foodData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Food"
                  searchPlaceholder="Search..."
                  value={value}
                  onChange={item => {
                  setValue(item.value);
                  }}
                  renderLeftIcon={() => (
                  <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                  )}
              />
            </View>
            <View style={styles.inputField}>
              <Dropdown
                  style={styles.dropdown}
                  data={mealData}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select meal"
                  searchPlaceholder="Search..."
                  value={value}
                  onChange={item => {
                  setValue(item.value);
                  }}
                  renderLeftIcon={() => (
                  <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                  )}
              />
            </View>
        </View>
    </KeyboardAvoidingView >
    
  );
};

export default LogCalorieIntake;