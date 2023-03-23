import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import CountContext from "./CountContext";
import { StyleSheet, View, Text, TouchableHighlight } from "react-native";
import UpgradedContext from "./UpgradedContext";

function UpgradeButton({ message, spec, step, upgradeFunction, upgraded }) {
  const { count, setCount } = useContext(CountContext);
  const { upgraded: upgradedMap, setUpgraded } = useContext(UpgradedContext);
  console.log(upgradedMap);
  let upgradedArray = upgradedMap.get(spec);
  const [_, levelStr] = message.split(" ");
  const pos = parseInt(levelStr) - 1;
  let price = parseInt(levelStr) * 1000;
  upgraded = upgradedArray[pos];
  let colourScheme = {
    attack: ["#33ccff", "#0099cc"],
    health: ["red", "#990000"],
    defence: ["#cc33ff", "#9900cc"],
  };

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
      backgroundColor: "grey",
    },
  });

  const checkPath = (spec) => {
    if (parseInt(levelStr) !== 1) {
      if (!upgradedMap.get(spec)[parseInt(levelStr) - 2]) {
        return true;
      }
    }
    return false;
  };

  getCSS = function (bool) {
    let result = checkPath(spec, step);
    if (result) {
      upgraded = true;
      return styles.upgradeButtonUpgraded;
    }
    if (count < price) {
      upgraded = true;
      return styles.upgradeButtonUpgraded;
    }
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
      upgradedArray[pos] = true;
      upgradedMap.set(spec, upgradedArray);
      setUpgraded(upgradedMap);
      await AsyncStorage.setItem(
        "UpgradedMap",
        JSON.stringify(Array.from(upgradedMap.entries()))
      );
      await AsyncStorage.setItem(`${spec}Progress`, String(newVal));
      console.log("count = ", count, " price = ", price);
      setCount(count - price);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableHighlight
      style={this.getCSS(upgraded)}
      underlayColor={colourScheme[spec][1]}
      disabled={upgraded}
      onPress={async () => {
        await upgrade(spec, step);
        upgradeFunction();
      }}
    >
      <View>
        <Text>{message}</Text>
        <Text style={{ fontSize: 10 }}>Cost: {price}</Text>
      </View>
    </TouchableHighlight>
  );
}

export default UpgradeButton;
