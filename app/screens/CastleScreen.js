import React from 'react';
import { StyleSheet, StatusBar,SafeAreaView,ImageBackground, View, Image, Text, Button,TouchableOpacity, TouchableHighlight } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';

const backgroundimage = {uri: "https://cdn.pixabay.com/photo/2016/10/22/01/54/wood-1759566_960_720.jpg"};
const icon = {uri:"https://cdn3.iconfinder.com/data/icons/nature-animals/512/Bird-512.png"};



function CastleScreen({navigation}) {
    return (    
<ImageBackground  source = {backgroundimage}
          fadeDuration={1000}
          
         style={styles.container}>
  <ScrollView style={styles.scrollView}>
  <Progress.Bar
  progress={0.3}
  width={200}
  color="red"
  height={20}
  borderRadius={10}
/>
<Progress.Bar
  progress={0.6}
  width={200}
  color="#33ccff"
  height={20}
  borderRadius={10}
/>
<Progress.Bar
  progress={0.9}
  width={200}
  color="#cc33ff"
  height={20}
  borderRadius={10}
/>
    
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
        
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: 'red' }} underlayColor='#990000'  onPress={() => console.log("hi")}> 
            <View>
                <Text>Level 1</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#33ccff' }} underlayColor='#0099cc' onPress={() => console.log("hi")}> 
            <View>
                <Text>Level 1</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#cc33ff' }} underlayColor='#9900cc'  onPress={() => console.log("hi")}> 
            <View>
                <Text>Level 1</Text>
            </View>
        </TouchableHighlight>
    </View>
    <View style={styles.upgradeContainer2}  >
        
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: 'red' }} underlayColor='#990000' onPress={() => console.log("hi")}> 
            <View>
                <Text>Level 2</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#33ccff' }} underlayColor='#0099cc' onPress={() => console.log("hi")}> 
            <View>
                <Text>Level 2</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight  style={{ ...styles.upgradeButton, backgroundColor: '#cc33ff' }}  underlayColor='#9900cc'  onPress={() => console.log("hi")}> 
            <View>
                <Text>Level 2</Text>
            </View>
        </TouchableHighlight>
    </View>
    <View style={styles.upgradeContainer2}  >
        
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: 'red' }} underlayColor='#990000' onPress={() => console.log("hi")}> 
            <View>
                <Text>Level 3</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#33ccff' }}  underlayColor='#0099cc' onPress={() => console.log("hi")}> 
            <View>
                <Text>Level 3</Text>
            </View>
        </TouchableHighlight>
    
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#cc33ff' }} underlayColor='#9900cc'  onPress={() => console.log("hi")}> 
            <View>
                <Text>Level 3</Text>
            </View>
        </TouchableHighlight>
    </View>
    <View style={styles.upgradeContainer2}  >
        
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: 'red' }}  underlayColor='#990000' onPress={() => console.log("hi")}> 
            <View>
                <Text>Level 4</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#33ccff' }} underlayColor='#0099cc' onPress={() => console.log("hi")}> 
            <View>
                <Text>Level 4</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={{ ...styles.upgradeButton, backgroundColor: '#cc33ff' }} underlayColor='#9900cc' onPress={() => console.log("hi")}> 
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

    backgroundColor: "orange",
    alignItems:"center",
    justifyContent: "center",
    borderColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    
   
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