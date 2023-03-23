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
import UpgradeButton from "./UpgradeButton";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const check = (spec, message) => {
  (async () => {
    if ((await AsyncStorage.getItem(`${(spec, message)}Upgraded`)) === null) {
      await AsyncStorage.setItem(`${(spec, message)}Upgraded`, String(false));
      returnVal = await AsyncStorage.getItem(`${(spec, message)}Upgraded`);
      setUpgraded(Boolean(returnVal));
    } else {
      returnVal = await AsyncStorage.getItem(`${(spec, message)}Upgraded`);
      setUpgraded(Boolean(returnVal));
    }
  })();
};

function UpgradeList({ spec, upgradeFunc }) {
  [upgraded, setUpgraded] = useState(false);
  const levels = 4;
  const steps = 1 / (levels + 1);

  return (
    <View>
      {[...Array(levels).keys()].map((key) => {
        check(spec, "Level " + (key + 1));
        return (
          <UpgradeButton
            message={"Level " + (key + 1)}
            spec={spec}
            step={steps}
            upgradeFunction={upgradeFunc}
            upgraded={upgraded}
          ></UpgradeButton>
        );
      })}
    </View>
  );
}

export default UpgradeList;
