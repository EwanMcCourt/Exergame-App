import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

const defaultMap = new Map()
defaultMap.set("attack", [false, false, false, false]);
        defaultMap.set("health", [false, false, false, false]);
        defaultMap.set("defence", [false, false, false, false]);


const UpgradedContext = React.createContext({
  upgraded: defaultMap,
  setUpgraded: () => {},
});
export default UpgradedContext;
