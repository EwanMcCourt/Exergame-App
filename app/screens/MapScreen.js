import React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  Text,
  TouchableHighlight,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapView, { Circle } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from 'axios';

const backgroundimage = {
  uri: "https://live.staticflickr.com/4242/35699339972_4ce24484ee_b.jpg",
};
const icon = {
  uri: "https://cdn3.iconfinder.com/data/icons/nature-animals/512/Bird-512.png",
};

function MapScreen({ navigation }) {
  const [places, setPlaces] = useState([]);
  const center = {
    latitude: 51.505,
    longitude: -0.09,
  };
  const radius = 500;
  useEffect(() => {
    const coords = async () => {
      const {latitude ,longitude} = (await Location.getCurrentPositionAsync()).coords;
      return {latitude, longitude};
    };
    const fetchPlaces = async () => {
      const {latitude, longitude} = await coords();
      console.log("trying to get places")
      const query = `[out:json][timeout:25];(node[\"leisure\"=\"park\"](${latitude - 0.01},${longitude - 0.01},${latitude + 0.01},${longitude + 0.01});way[\"leisure\"=\"park\"](${latitude - 0.01},${longitude - 0.01},${latitude + 0.01},${longitude + 0.01});relation[\"leisure\"=\"park\"](${latitude - 0.01},${longitude - 0.01},${latitude + 0.01},${longitude + 0.01}););out body;>;out skel qt;out count 10;`
      axios.get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
        .then((response) => {
          const data = response.data.elements.map((element) => {
            return {
              latitude: element.lat,
              longitude: element.lon,
              title: element.tags ? element.tags.name || 'Unnamed park/garden' : 'Unnamed park/garden',
            };
          });
          const filteredData = data.filter((element) => element.latitude !== undefined || element.longitude !== undefined);
          const parks = filteredData.slice(0,10);
          
          setPlaces(parks);
        })
        .catch((error) => console.log(error));
    };
    fetchPlaces();
  }, []);
  return (
    <ImageBackground
      source={backgroundimage}
      fadeDuration={1000}
      style={styles.background}
    >
      <View style={styles.titleContainer}>
        <Image style={styles.logo} source={icon} />
        <Text> This is the map Screen </Text>
      </View>
      <MapView
        style={styles.map}
        showsUserLocation={true}
      >
        {places.map(element => (
          <Circle
            key={`${element.latitude},${element.longitude}`}
            center={{
              latitude: element.latitude,
              longitude: element.longitude
            }}
            radius={radius}
            fillColor="rgba(255, 0, 0, 0.2)" // 20% transparent
            strokeColor="rgba(255, 0, 0, 0.5)" // 50% transparent
            strokeWidth={2}
          />
  ))}
      </MapView>
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
  map: {
    width: "100%",
    height: "100%",
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
export default MapScreen;
