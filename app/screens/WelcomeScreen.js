import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, Button,TouchableOpacity, TouchableHighlight } from 'react-native';


const backgroundimage = {uri: "https://w0.peakpx.com/wallpaper/287/911/HD-wallpaper-trex-dinosaur-trex-tyrannosaurus.jpg"};
const icon = {uri:"http://clipart-library.com/images/6cr54jKgi.gif"};

function WelcomeScreen({ navigation }) {
    return (
         
        <ImageBackground  
        
          source = {backgroundimage}
          fadeDuration={1000}
          
          style = {styles.background}
          >
            <View style = {styles.titleContainer}>
                <Image style = {styles.logo} source = {icon}/>
                <Text style = {styles.title}> MonsterFit </Text>
            </View>
            <TouchableHighlight style = {styles.loginButton} underlayColor='#fb9250' onPress={() => navigation.navigate('Map')}> 
                 <View >
               
                  <Text style = {styles.buttonText}>
                      Login
                  </Text>
               
                 </View>
            </TouchableHighlight >
            
            <TouchableHighlight style = {styles.registerButton}underlayColor="#800000" onPress={() => console.log("hi")}> 
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
  
     
        
    },
    loginButton:{
        width:"100%",
        height: 70,
        
        backgroundColor: "#d45404",
        alignItems:"center",
        justifyContent: "center",
    },
    logo:{
        width:100,
        height:100,
        left:45,
        
    },
    registerButton:{
        width:"100%",
        height: 70,
        backgroundColor: "#330000",
        alignItems:"center",
        justifyContent: "center",
    },
    title:{
        fontWeight:"bold",
        color:"white",
        fontSize:35,
       
    },
    titleContainer:{
        position: "absolute",
        top: 30,
        
    },
})
export default WelcomeScreen;