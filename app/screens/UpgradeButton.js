import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
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

function UpgradeButton({ message, spec, step, upgradeFunction, upgraded }) {
  console.log(upgraded)
  let colourScheme = {
    attack: ["#33ccff", "#0099cc"],
    health: ["red", "#990000"],
    defence: ["#cc33ff", "#9900cc"],
  };
  // useEffect(() => {
  //   check();
  //   console.log("upgraded = ", upgraded);
  // }, []);
  const styles = StyleSheet.create({
    upgradeButtonNotUpgraded: {
      width: 75,
      height: 75,
      margin: "5%",
      alignItems: "center",
      justifyContent: "center",
      borderColor: "white",
      borderRadius: 10,
      borderWidth: 2,
      backgroundColor: colourScheme[spec][0],
    },
    upgradeButtonUpgraded: {
      width: 75,
      height: 75,
      margin: "5%",
      alignItems: "center",
      justifyContent: "center",
      borderColor: "white",
      borderRadius: 10,
      borderWidth: 2,
      backgroundColor: "yellow",
    },
  });

  getCSS = function (bool) {
    console.log("bool: ", bool, "for :", message, spec);
    if (!bool) {
      return styles.upgradeButtonNotUpgraded;
    } else {
      return styles.upgradeButtonUpgraded;
    }
  };
  async function upgrade(spec, step) {
    await upgradeAtr(spec, step);
  }

  const upgradeAtr = async (spec, step) => {
    try {
      let newVal =
        parseFloat(await AsyncStorage.getItem(`${spec}Progress`)) + step;
      await AsyncStorage.setItem(`${(spec, message)}Upgraded`, String(true));
      await AsyncStorage.setItem(`${spec}Progress`, String(newVal));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableHighlight
      style={this.getCSS(upgraded)}
      underlayColor={colourScheme[spec][1]}
      onPress={async () => {
        await upgrade(spec, step);
        upgradeFunction();
      }}
    >
      <View>
        <Text>{message}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default UpgradeButton;
