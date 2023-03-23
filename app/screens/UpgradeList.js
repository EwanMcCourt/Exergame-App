import { StyleSheet, StatusBar,SafeAreaView,ImageBackground, View, Image, Text, Button,TouchableOpacity, TouchableHighlight } from 'react-native';
import UpgradeButton from './UpgradeButton';


function UpgradeList({spec, upgradeFunc}) {
    const levels = 4
    const steps = 1/(levels + 1)

    return( <View>
        {[...Array(levels).keys()].map(key => 
        {   console.log("key" + key)
            return(
                <UpgradeButton key = {key} message = {"Level " + (key+1)} spec = { spec } step = {steps} upgradeFunction = {upgradeFunc}></UpgradeButton>)

            })}
   </View>
    )
}
export default UpgradeList;
