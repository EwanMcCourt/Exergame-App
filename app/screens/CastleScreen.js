import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  View,
  Text,
  TouchableHighlight,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import UpgradeList from "./UpgradeList";
import ProgressBar from "./ProgressBar";
import { useEffect, useState, useContext } from "react";
import CountContext from "./CountContext";
import UpgradedContext from "./UpgradedContext";

// const { count, Setcount } = useContext(CountContext);

const backgroundimage = {
  uri: "https://cdn.pixabay.com/photo/2016/03/06/06/42/low-poly-1239778_960_720.jpg",
};

function CastleScreen({ navigation }) {
  let { upgraded, setUpgraded } = useContext(UpgradedContext);
  [upgraded, setUpgraded] = useState(upgraded);
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

  

      setProgress({
        attack: attackCurrProgress,
        defence: defenseCurrProgress,
        health: healthCurrProgress,
      });
    })();
  };
  const fetchUpgradedMap = () => {
    (async () => {
      let defaultMapJSON = await AsyncStorage.getItem(`UpgradedMap`);
      let defaultMap;
      if (defaultMapJSON !== null) {
        defaultMap = new Map(JSON.parse(defaultMapJSON));
      }
      if (defaultMapJSON === null) {
        defaultMap = new Map();
        defaultMap.set("attack", [false, false, false, false]);
        defaultMap.set("health", [false, false, false, false]);
        defaultMap.set("defence", [false, false, false, false]);
        await AsyncStorage.setItem(
          "UpgradedMap",
          JSON.stringify(Array.from(defaultMap.entries()))
        );
      }
      setUpgraded(defaultMap);
    })();
  };

  useEffect(() => {
    upgrade();
    fetchUpgradedMap();
  }, []);

  const getProgress = async (spec) => {
    let returnVal = await AsyncStorage.getItem(`${spec}Progress`);
    if (
      returnVal === null ||
      parseFloat(returnVal) > 1 ||
      returnVal === "NaN"
    ) {
      await AsyncStorage.setItem(`${spec}Progress`, String(0.2));
      return 0.2;
    }
    return parseFloat(returnVal);
  };

  return (
    <UpgradedContext.Provider value={{ upgraded, setUpgraded }}>
      <ImageBackground
        source={backgroundimage}
        fadeDuration={1000}
        style={styles.container}
      >
        <ScrollView style={styles.scrollView}>
          {/* <Button onPress={clearStorage()} title = "clear"/> */}
          <ProgressBar
            spec="health"
            currentProgress={currentProgresses.health}
            
          />
          <ProgressBar
            spec="attack"
            currentProgress={currentProgresses.attack}
          />
          <ProgressBar
            spec="defence"
            
            currentProgress={currentProgresses.defence}
          />
          <CountContext.Provider value={{ count }}>
            <Text style={styles.text}>Current balance : {count}</Text>
            <TouchableHighlight
              onPress={() => {
                setCount(count + 30000);
              }}
            >
              <View>
                <Text style={styles.text}>Add currency</Text>
              </View>
            </TouchableHighlight>
          </CountContext.Provider>
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
    </UpgradedContext.Provider>
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
    borderBottomColor: "white",

    marginLeft: "5%",
    marginRight: "5%",

    alignItems: "center",
    justifyContent: "center",
  },


  

  upgradeContainer2: {
    width: "100%",
    flexDirection: "row",
    
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "12%",
    
  },

  scrollView: { 

},

  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    borderBottomColor: "white",
  },
});
export default CastleScreen;
