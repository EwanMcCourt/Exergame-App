import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';   // https://docs.expo.dev/versions/latest/sdk/pedometer/ (requires install -npx expo install expo-sensors)
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  const [count, setCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [lastStepCount, setLastStepCount] = useState(0);
 
  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {


      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    }
  };
  const getSteps = async (old_date) => {
    const end = new Date();
    const pastStepCountResult = await Pedometer.getStepCountAsync(old_date, end);
    console.log("checking this time", old_date.toLocaleTimeString(), old_date.toISOString())
    if (pastStepCountResult) {
      setCount(prevCount => prevCount + pastStepCountResult.steps);
      console.log(pastStepCountResult.steps)
    }
    

  };
  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      console.log('AsyncStorage successfully cleared');
    } catch (error) {
      console.log('Error clearing AsyncStorage: ', error.message);
    }
  };
  const storeSteps = async () => { 
    console.log("running store steps")      //https://reactnative.dev/docs/asyncstorage code is from here but the package has been removed, using AsyncStorage from '@react-native-async-storage/async-storage'; works
    try {                                //(requires install) -npm install @react-native-async-storage/async-storage
      await AsyncStorage.setItem('@count',count.toString());
      console.log("value set",count)
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const loadSteps = async () => {
    console.log("running load steps")
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
    console.log("running store date")
    try {
      const newdate = new Date();
      await AsyncStorage.setItem('@date',newdate.toISOString())
      console.log("added current date ", newdate.toISOString())
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const loadDate = async () => {
    console.log("running load date")
    try {
      const value = await AsyncStorage.getItem('@date');
      if (value !== null) {
        const date = new Date(Date.parse(value));
        console.log(date.toLocaleTimeString())
        await getSteps(date);
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
    loadSteps();
    loadDate();
  }, []);
  useEffect(() => {
    storeSteps();
    storeDate();
  }, [count]);
  useEffect(() => {
    const subscription = subscribe();
  }, []);
  

  
  
  return (
    <View style={styles.container}>
      <Text>Steps after opening the app: {currentStepCount}</Text>
      <Text>Steps after opening the app, lagging one step behind: {lastStepCount}</Text>
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