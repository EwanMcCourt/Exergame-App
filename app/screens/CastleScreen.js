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
    <View style={styles.upgradeContainer1}  >
        <TouchableHighlight style = {styles.upgradeButton}>
            <View>
                <Text>Build Castle</Text>
            </View>
        </TouchableHighlight>
        
        
       
    </View>  
    <View style={styles.upgradeContainer1}  >
        <TouchableHighlight style = {styles.upgradeButton}>
            <View>
                <Text>Join the Fight</Text>
            </View>
        </TouchableHighlight>
       
    </View>
    <View style={styles.upgradeContainer2}  >
        
        
            <View style={styles.headers}>
                <Text style={styles.text}>Health</Text>
            </View>
       
            <View style={styles.headers}>
                <Text style={styles.text}>Attack</Text>
            </View>

            <View style={styles.headers}>
                <Text style={styles.text}>Multiplier</Text>
            </View>
    </View>
    <View style={styles.upgradeContainer2}  >
        
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: 'red' }}>
            <View>
                <Text>Level 1</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#33ccff' }}>
            <View>
                <Text>Level 1</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#cc33ff' }}>
            <View>
                <Text>Level 1</Text>
            </View>
        </TouchableHighlight>
    </View>
    <View style={styles.upgradeContainer2}  >
        
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: 'red' }}>
            <View>
                <Text>Level 2</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#33ccff' }}>
            <View>
                <Text>Level 2</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight  style={{ ...styles.upgradeButton, backgroundColor: '#cc33ff' }}>
            <View>
                <Text>Level 2</Text>
            </View>
        </TouchableHighlight>
    </View>
    <View style={styles.upgradeContainer2}  >
        
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: 'red' }}>
            <View>
                <Text>Level 3</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#33ccff' }}>
            <View>
                <Text>Level 3</Text>
            </View>
        </TouchableHighlight>
    
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#cc33ff' }}>
            <View>
                <Text>Level 3</Text>
            </View>
        </TouchableHighlight>
    </View>
    <View style={styles.upgradeContainer2}  >
        
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: 'red' }}>
            <View>
                <Text>Level 4</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#33ccff' }}>
            <View>
                <Text>Level 4</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#cc33ff' }}>
            <View>
                <Text>Level 4</Text>
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
  headers:{
    width:75,
    height: 75,
    
    
    marginLeft:"5%",
    marginRight:"5%",

   
    alignItems:"center",
    justifyContent: "center",
},
 
  upgradeButton:{
    width:75,
    height: 75,
    
    margin:"5%",

    backgroundColor: "#d45404",
    alignItems:"center",
    justifyContent: "center",
},
upgradeContainer1: {
    width: "100%",
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"center",
    marginBottom:35,
    
    
  },

 
  upgradeContainer2: {
    width: "100%",
    flexDirection: "row",
    alignItems:"center",
    justifyContent:"flex-start",
    marginBottom:35,
     left:10,
    
  },
 

  scrollView: {
 
    
  },
  text: {
    fontSize: 15,
    fontWeight:'bold',
    color:"white",
    borderBottomColor:"white",
  },
});
export default CastleScreen;