import React from "react";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Pedometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import MultiplierContext from "./MultiplierContext";
import CircularProgress from 'react-native-circular-progress-indicator';

const Stack = createStackNavigator();
const backgroundimage = {
  uri: "https://cdn.pixabay.com/photo/2016/10/22/01/54/wood-1759566_960_720.jpg",
};

function MainScreen({ navigation }) {
  
  const [foreground, requestForeground] = Location.useForegroundPermissions();
  const [count, setCount] = useState(0);
  const [initalCount, setInitalCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const { multiplier, setMultiplier } = useContext(MultiplierContext);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [mDate, setMDate] = useState(new Date());
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [places, setPlaces] = useState([]);

  const randomWidth = useSharedValue(10);

  const recommendedSteps = 4000;
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config),
    };
  });

  const logCoords = async () => {
    const { latitude, longitude } = (await Location.getCurrentPositionAsync())
      .coords;
    return latitude, longitude;
  };

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      return Pedometer.watchStepCount((result) => {
        console.log("live steps", result.steps);
        setCurrentStepCount(result.steps);
      });
    } else {
      setCount(-1);
    }
  };
  const getSteps = async (old_date) => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const pastStepCountResult = await Pedometer.getStepCountAsync(
        old_date,
        end
      );
      console.log(
        "checking this time",
        old_date.toLocaleTimeString(),
        old_date.toISOString()
      );
      if (pastStepCountResult) {
        setCount((prevCount) => prevCount + pastStepCountResult.steps);
        setInitalCount(
          (prevInitalCount) => prevInitalCount + pastStepCountResult.steps
        );
        setCount2((prevSetCount2) => prevSetCount2 + pastStepCountResult.steps);
        console.log(pastStepCountResult.steps);
      }
    }
  };
  if (foreground === null || foreground.status !== "granted") {
    requestForeground();
  }
  const checkLocationPerms = () => {
    console.log(foreground);
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log("Error clearing AsyncStorage: ", error.message);
    }
  };
  const storeSteps = async () => {
    //https://reactnative.dev/docs/asyncstorage code is from here but the package has been removed, using AsyncStorage from '@react-native-async-storage/async-storage'; works
    try {
      //(requires install) -npm install @react-native-async-storage/async-storage
      await AsyncStorage.setItem("@count", count.toString());
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const loadSteps = async () => {
    try {
      const value = await AsyncStorage.getItem("@count");
      if (value !== null) {
        setCount(parseInt(value));
        setCount2(parseInt(value));
        setInitalCount(parseInt(value));
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const storeDate = async () => {
    try {
      const newdate = new Date();
      await AsyncStorage.setItem("@date", newdate.toISOString());
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const loadOldDate = async () => {
    try {
      const value = await AsyncStorage.getItem("@date");
      if (value !== null) {
        const date = new Date(Date.parse(value));
        if (Platform.OS === "ios") {
          await getSteps(date);
        }
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const getTimes = () => {
    const days_with_rem =
      (mDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    setDays(Math.floor(days_with_rem));
    const hours_with_rem = (days_with_rem - Math.floor(days_with_rem)) * 24;
    setHours(Math.floor(hours_with_rem));
    const mins_with_rem = (hours_with_rem - Math.floor(hours_with_rem)) * 60;
    setMinutes(Math.floor(mins_with_rem));
  };
  const loadMonsterDate = async () => {
    try {
      const value = await AsyncStorage.getItem("@mdate");
      if (value !== null) {
        const date = new Date(Date.parse(value));
        setMDate(date);
      } else {
        const mdate = new Date();
        mdate.setDate(mdate.getDate() + 7);
        await AsyncStorage.setItem("@mdate", mdate.toISOString());
        setMDate(mdate);
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
      if (days <= 0 && hours <= 0 && minutes <= 0) {
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
    const value = initalCount + currentStepCount - count2;
    setCount2(count2 + value);
    setCount(count + Math.ceil(value * multiplier));
    console.log(
      "count with multiplier: ",
      count,
      " count no multiplier: ",
      count2
    );
  }, [currentStepCount]);
  useEffect(() => {
    if (count >= recommendedSteps) {
      alert('Max value reached!');
    }
  }, [count]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(0); // Reset the count to 0 every 24 hours
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={backgroundimage}
      fadeDuration={1000}
      style={styles.background}
    >
      <View style={styles.titleContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>
            Days: {days} Hours: {hours} Minutes: {minutes}
          </Text>
          <Text style={styles.text}>Steps: {count}</Text>
          <Text style={styles.text}>Multiplier: {multiplier}</Text>
          <View style={styles.buttonContainer}>
            <Button title="clear" onPress={clearStorage} />
            <Button title="check permissions" onPress={checkLocationPerms} />
            <Button title="log coords" onPress={logCoords} />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Animated.View
              style={[
                {
                  width: 100,
                  height: 80,
                  backgroundColor: "black",
                  margin: 30,
                },
                style,
              ]}
            />
            <Button
              title="toggle"
              onPress={() => {
                randomWidth.value = Math.random() * 350;
              }}
            />
               <CircularProgress
                  value={count}
                  radius={120}
                  duration={2000}
                  progressValueColor={'white'}
                  maxValue={recommendedSteps}
                  title= "Steps"
                  titleColor={'white'}
                  titleStyle={{fontWeight: 'bold'}}
                  activeStrokeColor={'aqua'}
                  activeStrokeSecondaryColor={'grey'}
                  inActiveStrokeColor={'#9b59b6'}
                  inActiveStrokeOpacity={0.5}
                  inActiveStrokeWidth={40}
                  activeStrokeWidth={20}
                
  
  
      />

          </View>
        </View>
      </View>
  
      <TouchableHighlight
        style={styles.circle}
        underlayColor="lightgrey"
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons
          style={styles.cogs}
          name={"settings-outline"}
          size={25}
          color={"grey"}
        />
      </TouchableHighlight>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  background: {
    flex: 1,
    fadeDuration: 1000,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  circle: {
    width: 65,
    height: 65,
    borderRadius: 100 / 2,
    backgroundColor: "white",
    position: "absolute",
    top: 30,
    right: 30,
  },
  cogs: {
    position: "absolute",
    left: 20,
    right: 0,
    top: 20,
    bottom: 0,
  },
  logo: {
    width: 100,
    height: 100,
    alignItems: "center",
  },

  titleContainer: {
    position: "absolute",
    top: 30,
  },
});
export default MainScreen;
