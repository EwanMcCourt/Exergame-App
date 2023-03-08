import React from "react";
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
import { useEffect, useState } from "react";

const Stack = createStackNavigator();
const backgroundimage = {
  uri: "https://live.staticflickr.com/4242/35699339972_4ce24484ee_b.jpg",
};
const icon = {
  uri: "https://cdn3.iconfinder.com/data/icons/nature-animals/512/Bird-512.png",
};

function MainScreen({ navigation }) {
  const [foreground, requestForeground] = Location.useForegroundPermissions();
  const [count, setCount] = useState(0);
  const [initalCount, setInitalCount] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [mDate, setMDate] = useState(new Date());
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const logCoords = async () => {
    coords = (await Location.getCurrentPositionAsync()).coords;
    console.log(coords);
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
      console.log("AsyncStorage successfully cleared");
    } catch (error) {
      console.log("Error clearing AsyncStorage: ", error.message);
    }
  };
  const storeSteps = async () => {
    console.log("running store steps"); //https://reactnative.dev/docs/asyncstorage code is from here but the package has been removed, using AsyncStorage from '@react-native-async-storage/async-storage'; works
    try {
      //(requires install) -npm install @react-native-async-storage/async-storage
      await AsyncStorage.setItem("@count", count.toString());
      console.log("value set", count);
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const loadSteps = async () => {
    console.log("running load steps");
    try {
      const value = await AsyncStorage.getItem("@count");
      if (value !== null) {
        setCount(parseInt(value));
        setInitalCount(parseInt(value));
        console.log("value retreived at ", parseInt(value));
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const storeDate = async () => {
    console.log("running store date");
    try {
      const newdate = new Date();
      await AsyncStorage.setItem("@date", newdate.toISOString());
      console.log("added current date ", newdate.toISOString());
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const loadOldDate = async () => {
    console.log("running load date");
    try {
      const value = await AsyncStorage.getItem("@date");
      if (value !== null) {
        const date = new Date(Date.parse(value));
        console.log(date.toLocaleTimeString());
        if (Platform.OS === "ios") {
          await getSteps(date);
        }
      }
    } catch (error) {
      console.log("error: ", error.message);
    }
  };
  const getTimes = () => {
    console.log("trying to set days,hours,mins", mDate.toDateString());
    const days_with_rem =
      (mDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24);
    setDays(Math.floor(days_with_rem));
    const hours_with_rem = (days_with_rem - Math.floor(days_with_rem)) * 24;
    setHours(Math.floor(hours_with_rem));
    const mins_with_rem = (hours_with_rem - Math.floor(hours_with_rem)) * 60;
    setMinutes(Math.floor(mins_with_rem));
  };
  const loadMonsterDate = async () => {
    console.log("running load date");
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
      console.log("checking if 0 time left");
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
    setCount(initalCount + currentStepCount);
  }, [currentStepCount]);

  return (
    <ImageBackground
      source={backgroundimage}
      fadeDuration={1000}
      style={styles.background}
    >
      <View style={styles.titleContainer}>
        <Image style={styles.logo} source={icon} />
        <View style={styles.container}>
          <Text style={styles.text}>
            Days: {days} Hours: {hours} Minutes: {minutes}
          </Text>
          <Text style={styles.text}>Steps: {count}</Text>
          <View style={styles.buttonContainer}>
            <Button title="clear" onPress={clearStorage} />
            <Button title="check permissions" onPress={checkLocationPerms} />
            <Button title="log coords" onPress={logCoords} />
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