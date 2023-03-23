import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ImageBackground,
  View,
  Image,
  Text,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import * as Progress from "react-native-progress";
import UpgradeList from "./UpgradeList";
import ProgressBar from "./ProgressBar";
import { useEffect, useState, useContext } from "react";
import CountContext from "./CountContext";


const backgroundimage = {
  uri: "https://cdn.pixabay.com/photo/2016/03/06/06/42/low-poly-1239778_960_720.jpg",
};



function CastleScreen({ navigation }) {
  // const clearStorage = async ()=>{
  //     await AsyncStorage.removeItem("attackProgress")
  //     await AsyncStorage.removeItem("healthProgress")
  //     await AsyncStorage.removeItem("defenceProgress")
  // }
  const {count, setCount} = useContext(CountContext);
  [currentProgresses, setProgress] = useState({
    attack: 0.4,
    health: 0.2,
    defence: 0.6,
  });

  const upgrade = () => {
    (async () => {
      const attackCurrProgress = await getProgress("attack");
      const healthCurrProgress = await getProgress("health");
      const defenseCurrProgress = await getProgress("defence");

      console.log("current progress for attack : " + attackCurrProgress);
      console.log("current progress for  health : " + healthCurrProgress);
      console.log("current progress for defense :" + defenseCurrProgress);

      setProgress({
        attack: attackCurrProgress,
        defence: defenseCurrProgress,
        health: healthCurrProgress,
      });
    })();
  };

  useEffect(() => {
    upgrade();
  }, []);

  const getProgress = async (spec) => {
    let returnVal = await AsyncStorage.getItem(`${spec}Progress`);
    if (
      returnVal === null ||
      parseFloat(returnVal) > 1 ||
      returnVal === "NaN"
    ) {
      console.log("null or >1 found");
      await AsyncStorage.setItem(`${spec}Progress`, String(0.2));
      console.log("the value returned is 0.2");
      return 0.2;
    }
    console.log("the value returned is " + returnVal);
    return parseFloat(returnVal);
  };

  return (
    <ImageBackground
      source={backgroundimage}
      fadeDuration={1000}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        {/* <Button onPress={clearStorage()} title = "clear"/> */}
        <ProgressBar spec="health" currentProgress={currentProgresses.health} />
        <ProgressBar spec="attack" currentProgress={currentProgresses.attack} />
        <ProgressBar
          spec="defence"
          currentProgress={currentProgresses.defence}
        />
        <View style={styles.upgradeContainer1}>
          <TouchableHighlight
            style={styles.upgradeButton}
            underlayColor="#996300"
            onPress={() => console.log("hi")}
          >
            <View>
              <Text>Build Castle</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.upgradeContainer1}>
          <TouchableHighlight
            style={styles.upgradeButton}
            underlayColor="#996300"
            onPress={() => console.log("hi")}
          >
            <View>
              <Text>{count}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.upgradeContainer2}>
          <View style={styles.headers}>
            <Text style={styles.text}>Health</Text>
          </View>

          <View style={styles.headers}>
            <Text style={styles.text}>Attack</Text>
          </View>

          <View style={styles.headers}>
            <Text style={styles.text}>Defence</Text>
          </View>
        </View>
        <View style={styles.upgradeContainer2}>
          <UpgradeList spec="health" upgradeFunc={upgrade}></UpgradeList>
          <UpgradeList spec="attack" upgradeFunc={upgrade}></UpgradeList>
          <UpgradeList spec="defence" upgradeFunc={upgrade}></UpgradeList>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: "center",
  },
  headers: {
    width: 75,
    height: 75,

    
   
    borderBottomWidth: 1.5,
    borderBottomColor: 'white',

    marginLeft: "5%",
    marginRight: "5%",

    alignItems: "center",
    justifyContent: "center",
  },

  upgradeButton: {
    width: 75,
    height: 75,

    margin: "5%",

    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderRadius: 10,
    borderWidth: 2,
  },
  upgradeContainer1: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 35,
  },

  upgradeContainer2: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 35,
    left: 10,
  },

  scrollView: {},
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    borderBottomColor: "white",
 
  },
});
export default CastleScreen;
