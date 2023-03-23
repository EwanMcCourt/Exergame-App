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
import { useEffect, useState, useContext  } from "react";
import * as Location from "expo-location";
import axios from "axios";
import { getDistance } from "geolib";
import MultiplierContext from "./MultiplierContext";


const backgroundimage = {
  uri: "https://cdn.pixabay.com/photo/2016/03/06/06/42/low-poly-1239778_960_720.jpg",
};

function MapScreen({ navigation }) {
  const [places, setPlaces] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const { multiplier, setMultiplier } = useContext(MultiplierContext);
  const radius = 350;
  useEffect(() => {
    const coords = async () => {
      const {latitude ,longitude} = (await Location.getCurrentPositionAsync()).coords;
      return {latitude, longitude};
    };
    const fetchPlaces = async () => {
      const {latitude, longitude} = await coords();
      console.log("trying to get places")
      const query = `[out:json][timeout:25];(node[\"leisure\"=\"park\"][\"name\"](${latitude - 0.03},${longitude - 0.03},${latitude + 0.03},${longitude + 0.03});way[\"leisure\"=\"park\"][\"name\"](${latitude - 0.03},${longitude - 0.03},${latitude + 0.03},${longitude + 0.03});relation[\"leisure\"=\"park\"][\"name\"](${latitude - 0.03},${longitude - 0.03},${latitude + 0.03},${longitude + 0.03}););out body;>;out skel qt;out count 10;`
      //const query = `[out:json][timeout:25];(node[\"leisure\"=\"park\"](${latitude - 0.03},${longitude - 0.03},${latitude + 0.03},${longitude + 0.03});way[\"leisure\"=\"park\"](${latitude - 0.03},${longitude - 0.03},${latitude + 0.03},${longitude + 0.03});relation[\"leisure\"=\"park\"](${latitude - 0.03},${longitude - 0.03},${latitude + 0.03},${longitude + 0.03}););out body;>;out skel qt;out count 10;`
      axios.get(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
        .then((response) => {
          const data = response.data.elements.map((element) => {
            let title = 'empty';
            if (element.tags && element.tags.name) {
              title = element.tags.name;
            }
            return {
              latitude: element.lat,
              longitude: element.lon,
              title: title,
            };
          });
          const filteredData = data.filter((element) => element.latitude !== undefined)
          
          const parks = [];
          for (let i = 0; i < filteredData.length; i++) {
            let isFarEnough = true;
            const { latitude: lat1, longitude: lon1 } = filteredData[i];
            for (let j = 0; j < parks.length; j++) {
              const { latitude: lat2, longitude: lon2 } = parks[j];
              let distance = getDistance({ latitude: lat1, longitude: lon1 }, { latitude: lat2, longitude: lon2 });
              if (distance < 500) {
                isFarEnough = false;
                break;
              }
            }
            if (isFarEnough) {
              parks.push(filteredData[i]);
            } 
          }
          
          //&& element.longitude !== undefined && element.title && element.title !== 'empty'
          setPlaces(parks);
        })
        .catch((error) => console.log(error));
    };
    fetchPlaces();
  }, []);
  
  useEffect(() =>{
    const coords3 = async () => {
      const coord = (await Location.getCurrentPositionAsync()).coords;
      const region =  {latitude: coord.latitude, longitude: coord.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421,} ;
      setUserLocation(region)
    };
    coords3();
  },[]);

  useEffect(() => {
    const coords2 = async () => {
      const coord = (await Location.getCurrentPositionAsync()).coords;
      return coord;
    };
    const  getDist = async () => {
      const coords = await coords2();
      let minDis = 5000;
      for (let i =0; i < places.length; i++){
        const { latitude: lat1, longitude: lon1 } = places[i];
        let distance = getDistance({ latitude: lat1, longitude: lon1 }, coords);
        if (distance < minDis){
          minDis = distance
        }
      }
      if (minDis <= 350){
        //set mult to 2 here
        setMultiplier(2);
      } else {
        //set mult to 1 here
        setMultiplier(1);
      }
      console.log(minDis)

    }
    getDist();
    const interval = setInterval(() => {
      getDist();
    }, 30000);
    return () => clearInterval(interval);
    
  }, [places]);
  return (
    <ImageBackground
      source={backgroundimage}
      fadeDuration={1000}
      style={styles.background}
    >
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={userLocation}
      >
        {places.map(element => (
          <Circle
            key={`${element.latitude},${element.longitude}`}
            center={{
              latitude: element.latitude,
              longitude: element.longitude
            }}
            radius={radius}
            fillColor="rgba(0, 0, 128, 0.1)"
            strokeColor="rgba(0, 0, 128, 0.3)"
            strokeWidth={2}
          />
  ))}
      </MapView>
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
 
  map: {
    width: "100%",
    height: "100%",
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
