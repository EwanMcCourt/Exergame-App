import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
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

function UpgradeButton({ message, spec, step, upgradeFunction }) {
  let colourScheme = {
    attack: ["#33ccff", "#0099cc"],
    health: ["red", "#990000"],
    defence: ["#cc33ff", "#9900cc"],
  };

  return (
    <TouchableHighlight
      style={{
        ...styles.upgradeButton,
        backgroundColor: colourScheme[spec][0],
      }}
      underlayColor={colourScheme[spec][1]}
      onPress={async() => {
        await upgrade(spec, step);
        upgradeFunction()
      }}
    >
      <View>
        <Text>{message}</Text>
      </View>
    </TouchableHighlight>
  );
}
async function upgrade(spec, step) {
  await upgradeAtr(spec, step);
}


const upgradeAtr = async (spec, step) => {
  try {
    let newVal =
      parseFloat(await AsyncStorage.getItem(`${spec}Progress`)) + step;
    await AsyncStorage.setItem(`${spec}Progress`, String(newVal));
  } catch (error) {
    console.log(error);
  }
};

export default UpgradeButton;

const styles = StyleSheet.create({
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
});
