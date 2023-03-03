import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';   // https://docs.expo.dev/versions/latest/sdk/pedometer/ (requires install -npx expo install expo-sensors)
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  const [count, setCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [last_date, setLast_date] = useState(new Date());
 
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage successfully cleared');
    } catch (error) {
      console.log('Error clearing AsyncStorage: ', error.message);
    }
  };
  const storeSteps = async () => {       //https://reactnative.dev/docs/asyncstorage code is from here but the package has been removed, using AsyncStorage from '@react-native-async-storage/async-storage'; works
    try {                                //(requires install) -npm install @react-native-async-storage/async-storage
      await AsyncStorage.setItem('@count',count.toString());
      console.log("value set",count)
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const loadSteps = async () => {
    try {
      const value = await AsyncStorage.getItem('@count');
      if (value !== null) {
        setCount(parseInt(value))
        console.log("value retreived at ", parseInt(value))
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const storeDate = async () => {
    try {
      const newdate = new Date();
      await AsyncStorage.setItem('@date',newdate.toISOString())
      console.log("added current date ", newdate.toISOString())
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const loadDate = async () => {
    try {
      const value = await AsyncStorage.getItem('@date');
      if (value !== null) {
        const date = new Date(Date.parse(value));
        setLast_date(date);
        return date;
      } else {
        const date = new Date();
        date.setDate(date.getDate() - 7);
        setLast_date(date);
        setCount(0);
        return date;
      }
    } catch (error) {
      console.log("error: ", error.message);
      return null;
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  }
  const decrementCount = () => {
    setCount(count - 1);
  };
  useEffect(() => {
    loadSteps();
  }, []);
  useEffect(() => {
    storeSteps();
    storeDate();
  }, [count]);
  useEffect(() => {
    const loadData = async () => {
      const date = await loadDate();
      setLast_date(date);
  
      const end = new Date();
      const pastStepCountResult = await Pedometer.getStepCountAsync(date, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }
    };
    loadData();
  }, [last_date]);
  

  useEffect(() => {
    if (pastStepCount > 10) {
      setCount(count + pastStepCount)
    }
  }, [pastStepCount]);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Count: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="+" onPress={incrementCount} />
        <Button title="-" onPress={decrementCount} />
        <Button title="clear" onPress={clearStorage} />
        <Button title="load"  onPress={loadSteps} />
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