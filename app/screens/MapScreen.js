import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, Button,TouchableOpacity, TouchableHighlight } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'


const Stack = createStackNavigator();
const backgroundimage = {uri: "https://live.staticflickr.com/4242/35699339972_4ce24484ee_b.jpg"};
const icon = {uri:"https://cdn3.iconfinder.com/data/icons/nature-animals/512/Bird-512.png"};


function MapScreen({ navigation }) {
    return (
        <ImageBackground  
        

        
          source = {backgroundimage}
          fadeDuration={1000}
          
          style = {styles.background}
          >
            <View style = {styles.titleContainer}>
                <Image style = {styles.logo} source = {icon}/>
                <Text> This is the map Screen </Text>
                  
            </View>
            <TouchableHighlight style = {styles.circle} underlayColor="lightgrey" onPress={() => navigation.navigate('Settings')}>
                
            <Ionicons style = {styles.cogs} name={"settings-outline"} size={25} color={"grey"} />
                
            </TouchableHighlight>
                
                  
         
          
           
        </ImageBackground> 
        
    );
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        fadeDuration: 1000,
        justifyContent: "flex-end",
        alignItems:"center",
        
    },
  
    circle: {
        width: 65,
        height: 65,
        borderRadius: 100 / 2,
        backgroundColor: "white",
        position: "absolute",
        top: 30,
        right:30,
       
        
        
    },
    cogs:{
       
        position: 'absolute',
        left: 20,
        right: 0,
        top:20,
        bottom: 0
    },
    logo:{
        width:100,
        height:100,
        alignItems:"center",
        
        
        
    },

    titleContainer:{
        position: "absolute",
        top: 30,
    },
})
export default MapScreen;