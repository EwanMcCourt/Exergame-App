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
import axios from 'axios';

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
  const [count2, setCount2] = useState(0);
  const [mult, setMult] = useState(1);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [mDate, setMDate] = useState(new Date());
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [places, setPlaces] = useState([]);

  const logCoords = async () => {
    const {latitude ,longitude} = (await Location.getCurrentPositionAsync()).coords;
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
        setInitalCount(prevInitalCount => prevInitalCount + pastStepCountResult.steps);
        setCount2(prevSetCount2 => prevSetCount2 + pastStepCountResult.steps);
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
    const value = (initalCount + currentStepCount) - count2;
    setCount2(count2 + value);
    setCount(count + Math.ceil((value * mult)));
    console.log("count with multiplier: ", count, " count no multiplier: ", count2);
  }, [currentStepCount]);

  // useEffect(() => {
  //   const coords = async () => {
  //     const {latitude ,longitude} = (await Location.getCurrentPositionAsync()).coords;
  //     return {latitude, longitude};
  //   };
  //   const fetchPlaces = async () => {
  //     const {latitude, longitude} = await coords();
  //     console.log("trying to get places")
  //     const query = `[out:json][timeout:25];(node[\"leisure\"=\"park\"](${latitude - 0.01},${longitude - 0.01},${latitude + 0.01},${longitude + 0.01});way[\"leisure\"=\"park\"](${latitude - 0.01},${longitude - 0.01},${latitude + 0.01},${longitude + 0.01});relation[\"leisure\"=\"park\"](${latitude - 0.01},${longitude - 0.01},${latitude + 0.01},${longitude + 0.01}););out body;>;out skel qt;out count 10;`
  //     console.log(query);
  //     axios.get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
  //       .then((response) => {
  //         const data = response.data.elements.map((element) => {
  //           return {
  //             latitude: element.lat,
  //             longitude: element.lon,
  //             title: element.tags ? element.tags.name || 'Unnamed park/garden' : 'Unnamed park/garden',
  //           };
  //         });
  //         const filteredData = data.filter((element) => element.latitude !== undefined || element.longitude !== undefined);
  //         const parks = filteredData.slice(0,10);
  //         console.log("api length", filteredData.length)
  //         console.log(parks);
  //       })
  //       .catch((error) => console.log(error));
  //   };
  //   fetchPlaces();
  // }, []);
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
          <Text style={styles.text}>Multiplier: {mult}</Text>
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
