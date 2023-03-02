import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, Button,TouchableOpacity, TouchableHighlight } from 'react-native';


const backgroundimage = {uri: "https://live.staticflickr.com/4242/35699339972_4ce24484ee_b.jpg"};
const icon = {uri:"https://cdn3.iconfinder.com/data/icons/nature-animals/512/Bird-512.png"};

function WelcomeScreen(props) {
    return (
         
        <ImageBackground  
        
          source = {backgroundimage}
          fadeDuration={1000}
          
          style = {styles.background}
          >
            <View style = {styles.titleContainer}>
                <Image style = {styles.logo} source = {icon}/>
                <Text> Bird Watching </Text>
            </View>
            <TouchableHighlight style = {styles.loginButton} underlayColor='#d45404' onPress={() => console.log("hi")}> 
                 <View >
               
                  <Text style = {styles.buttonText}>
                      Login
                  </Text>
               
                 </View>
            </TouchableHighlight >
            
            <TouchableHighlight style = {styles.registerButton}underlayColor="#4ca305" onPress={() => console.log("hi")}> 
                 <View >
               
                  <Text style = {styles.buttonText}>
                      Register
                  </Text>
               
                 </View>
            </TouchableHighlight >
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
    buttonText:{
        color: "white",
        fontSize: 30,
        width:"100%",
        height: 70,
        
    },
    loginButton:{
        width:"100%",
        height: 70,
        backgroundColor: "coral",
        alignItems:"center",
        justifyContent: "center",
    },
    logo:{
        width:100,
        height:100,
        alignItems:"center",
        
        
        
    },
    registerButton:{
        width:"100%",
        height: 70,
        backgroundColor: "lightgreen",
        alignItems:"center",
        justifyContent: "center",
    },
    titleContainer:{
        position: "absolute",
        top: 30,
    },
})
export default WelcomeScreen;