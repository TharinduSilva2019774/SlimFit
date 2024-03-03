import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Navigation from './src/navigation';
import HomeScreen from './src/screens/HomeScreen';
import LogCalorieIntake from './src/screens/LogCalorieIntake';
import NewActivityScreen from './src/screens/NewActivityScreen';

export default function App() {

  
  return (
    <SafeAreaView style={styles.container}>
      <NewActivityScreen />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,  
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
