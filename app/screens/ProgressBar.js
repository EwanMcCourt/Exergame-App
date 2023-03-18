import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, StyleSheet } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import * as Progress from "react-native-progress";
function ProgressBar({ spec, currentProgress }) {
  let colourScheme = {
    attack: ["#33ccff"],
    health: ["red"],
    defence: ["#cc33ff"],
  };
  
    


  return (
    <View>
      <Text style={styles.text}>
        {spec} {Math.round(currentProgress * 100)/100}
      </Text>
      <Progress.Bar
        progress={currentProgress}
        width={200}
        color={colourScheme[spec][0]}
        height={20}
        borderRadius={10}
      />
    </View>
  );
}


export default ProgressBar;

const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    borderBottomColor: "white",
  },
});
