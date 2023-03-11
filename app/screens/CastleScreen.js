import React from 'react';
import { StyleSheet, StatusBar,SafeAreaView,ImageBackground, View, Image, Text, Button,TouchableOpacity, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const backgroundimage = {uri: "https://live.staticflickr.com/4242/35699339972_4ce24484ee_b.jpg"};
const icon = {uri:"https://cdn3.iconfinder.com/data/icons/nature-animals/512/Bird-512.png"};


function CastleScreen({navigation}) {
    return (    
<ImageBackground  source = {backgroundimage}
          fadeDuration={1000}
          
         style={styles.container}>
  <ScrollView style={styles.scrollView}>
    <View style={styles.upgradeContainer}  >
        <TouchableHighlight style = {styles.upgradeButton}>
            <View>
                <Text>Level 1</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style = {styles.upgradeButton}>
            <View>
                <Text>Level 2</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style = {styles.upgradeButton}>
            <View>
                <Text>Level 3</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style = {styles.upgradeButton}>
            <View>
                <Text>Level 4</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style = {styles.upgradeButton}>
            <View>
                <Text>Level 5</Text>
            </View>
        </TouchableHighlight>
    </View>    
   </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems:"center",
    
  },
  upgradeButton:{
    width:"50%",
    height: 125,
    marginRight:"25%",
    marginTop:"35%",
    backgroundColor: "#d45404",
    alignItems:"center",
    justifyContent: "center",
},
upgradeContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    marginBottom:35,
    
  },
  scrollView: {
 
    
  },
  text: {
    fontSize: 42,
  },
});
export default CastleScreen;