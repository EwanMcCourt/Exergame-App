import { View } from "react-native";
import UpgradeButton from "./UpgradeButton";
import { useState } from "react";

function UpgradeList({ spec, upgradeFunc }) {
  [upgraded, setUpgraded] = useState(false);
  const levels = 4;
  const steps = 1 / (levels + 1);

  return (
    <View>
      {[...Array(levels).keys()].map((key) => {
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
