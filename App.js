import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Platform  } from 'react-native';
import { Pedometer } from 'expo-sensors';   // https://docs.expo.dev/versions/latest/sdk/pedometer/ (requires install -npx expo install expo-sensors)
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleFit, { Scopes } from 'react-native-google-fit'
export default function App() {
  const [count, setCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [lastStepCount, setLastStepCount] = useState(0);
  const [lessCurrentStepCount, setLessCurrentStepCount] = useState(0);
  
  const prevStepCountRef = useRef(null);

  const subscribe = async () => {
    if (Platform.OS === 'ios'){
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
  
    if (isAvailable) {
      return Pedometer.watchStepCount(result => {
        console.log("live steps", result.steps)
        const currentStepCount = result.steps;
        const prevStepCount = prevStepCountRef.current;
        const stepDifference = prevStepCount === null ? 0 : currentStepCount - prevStepCount;
        setCurrentStepCount(stepDifference);
        prevStepCountRef.current = currentStepCount;
      });
    }}
    else if (Platform.OS === 'android'){
      const options = {
        scopes: [
          GoogleFit.Scope.FITNESS_ACTIVITY_READ_WRITE,
          GoogleFit.Scope.FITNESS_BODY_READ_WRITE,
        ],
      };
    
      try {
        await GoogleFit.authorize(options);
        const subscription = await GoogleFit.subscribeToStepCountUpdates((err, result) => {
          if (err) {
            console.log(err);
            return;
          }
    
          const currentStepCount = result.steps;
          console.log("live steps", currentStepCount);
    
          
          setCurrentStepCount(currentStepCount);
        });
    
        setStepCountSubscription(subscription);
      } catch (error) {
        console.log(error);
      }
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
  const loadOldDate = async () => {
    console.log("running load date")
    try {
      const value = await AsyncStorage.getItem('@date');
      if (value !== null) {
        const date = new Date(Date.parse(value));
        console.log(date.toLocaleTimeString())
        if (Platform.OS === 'ios') {
          await getSteps(date);
        }
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
    loadOldDate();
  }, []);
  useEffect(() => {
    storeSteps();
    storeDate();
  }, [count]);
  
  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);
  useEffect(() => {
    setCount(prevCount => prevCount + currentStepCount)
  }, [currentStepCount]);

  
  return(
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
