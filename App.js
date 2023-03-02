import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  const [count, setCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const _storeData = async () => {
    console.log("trying to store")
    try {
      await AsyncStorage.setItem(
        '@count',
        count.toString()
        
      );
      console.log("value set",count)
    } catch (error) {
      // Error saving data
      console.log("error: ", error.message);
    }
  };
  const _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('@count');
      if (value !== null) {
        // We have data!!
        console.log(parseInt("got value"))
        setCount(parseInt(value))
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  }
  const decrementCount = () => {
    setCount(count - 1);
  };
  useEffect(() => {
    _retrieveData();
    _storeData();
  }, []);
  useEffect(() => {
    _storeData();
  }, [count]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="+" onPress={incrementCount} />
        <Button title="-" onPress={decrementCount} />
        <Button title="clear" onPress={() => setCount(0)} />
        <Button title="load"  onPress={_retrieveData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});