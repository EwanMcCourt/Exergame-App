import { StyleSheet, StatusBar,SafeAreaView,ImageBackground, View, Image, Text, Button,TouchableOpacity, TouchableHighlight } from 'react-native';
import UpgradeButton from './UpgradeButton';


function UpgradeList({spec}) {
    const levels = 4

    return( <View>
        {[...Array(levels).keys()].map(key => 
        { return(
                <UpgradeButton key = {key} message = {"Level " + (key+1)} spec = { spec }></UpgradeButton>)

            })}
   </View>
    )
}
export default UpgradeList;
