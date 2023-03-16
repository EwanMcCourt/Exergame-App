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

function UpgradeButton({ message, spec }) {

    let colourScheme ={
        "attack": ["#33ccff","#0099cc"],
        "health": ["red","#990000"],
        "defence": ["#cc33ff","#9900cc"]
    }

  return (
    <TouchableHighlight
      style={{ ...styles.upgradeButton, backgroundColor: colourScheme[spec][0] }}
      underlayColor={colourScheme[spec][1]}
      onPress = { () => {upgrade(message, spec)}}
    >
      <View>
        <Text>{message}</Text>
      </View>
    </TouchableHighlight>
  );
}
function upgrade(message, spec){
    console.log(spec + " is " + message)
}




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
