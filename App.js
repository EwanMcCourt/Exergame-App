import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Platform  } from 'react-native';
import { Pedometer } from 'expo-sensors';   // https://docs.expo.dev/versions/latest/sdk/pedometer/ (requires install -npx expo install expo-sensors)
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function App() {
  const [count, setCount] = useState(0);
  const [initalCount, setInitalCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [mDate, setMDate] = useState(new Date());
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  

  
  

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
  
    if (isAvailable) {
      return Pedometer.watchStepCount(result => {
        console.log("live steps", result.steps)
        setCurrentStepCount(result.steps)
      });
    } else {
      setCount(-1);
    }
  };
  const getSteps = async (old_date) => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));
  
    if (isAvailable){
    const end = new Date();
    const pastStepCountResult = await Pedometer.getStepCountAsync(old_date, end);
    console.log("checking this time", old_date.toLocaleTimeString(), old_date.toISOString())
    if (pastStepCountResult) {
      setCount(prevCount => prevCount + pastStepCountResult.steps);
      console.log(pastStepCountResult.steps)
    }
    
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
        setCount(parseInt(value));
        setInitalCount(parseInt(value));
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
  const getTimes = () => {
    console.log("trying to set days,hours,mins", mDate.toDateString());
    const days_with_rem = (mDate.getTime() - new Date().getTime())/ (1000 * 60 * 60 * 24);
    setDays(Math.floor(days_with_rem));
    const hours_with_rem = ((days_with_rem - (Math.floor(days_with_rem)))*24)
    setHours(Math.floor(hours_with_rem))
    const mins_with_rem = ((hours_with_rem - Math.floor(hours_with_rem))*60)
    setMinutes(Math.floor(mins_with_rem));
    };
  const loadMonsterDate = async () => {
    console.log("running load date")
    try {
      const value = await AsyncStorage.getItem('@mdate');
      if (value !== null) {
        const date = new Date(Date.parse(value));
        setMDate(date)
      }else {
        const mdate = new Date();
        mdate.setDate(mdate.getDate() + 7);
        await AsyncStorage.setItem('@mdate',mdate.toISOString())
        setMDate(mdate)
      }
    } catch (error) {
      console.log("error: ", error.message);
      
    }
  };
  useEffect(() => {
    loadSteps();
    loadOldDate();
    loadMonsterDate();
  }, []);
  useEffect(() => {
    storeSteps();
    storeDate();
  }, [count]);
  useEffect(() => {
    getTimes();
    const interval = setInterval(() => {
      getTimes();
    }, 30000);
    return () => clearInterval(interval);
  }, [mDate]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("checking if 0 time left")
      if (days <= 0 && hours <= 0 && minutes <= 0){
        console.log("do the monster fight here");
      }
    }, 3000);
    return () => clearInterval(timeout);
  }, [minutes]);
  
  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);
  useEffect(() => {
    setCount(initalCount + currentStepCount);
  }, [currentStepCount]);

  
  return(
    <View style={styles.container}>
      <Text style={styles.text}>Days: {days} Hours: {hours} Minutes: {minutes}</Text>
      <Text style={styles.text}>Steps: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="clear" onPress={clearStorage} />
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
