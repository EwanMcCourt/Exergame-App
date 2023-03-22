import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, Button,TouchableOpacity, TouchableHighlight } from 'react-native';


const backgroundimage = {uri: "https://c4.wallpaperflare.com/wallpaper/97/833/155/mountains-firewatch-green-forest-wallpaper-preview.jpg"};
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
            <TouchableHighlight style = {styles.loginButton} underlayColor='#006666' onPress={() => navigation.navigate('Main')}> 
                 <View >
               
                  <Text style = {styles.buttonText}>
                      Login
                  </Text>
               
                 </View>
            </TouchableHighlight >
            
            <TouchableHighlight style = {styles.registerButton}underlayColor="#206020" onPress={() => console.log("hi")}> 
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
        fontWeight: "bold",
        fontSize: 30,
  
     
        
    },
    loginButton:{
        width: "85%",
  height: 70,
  backgroundColor: "#00b3b3",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  borderTopColor: '#0d260d',
 
  borderTopWidth: 5,
 
  alignItems: "center",
  justifyContent: "center",
  
  
    },
    logo:{
        width:100,
        height:100,
        left:45,
        
    },
    registerButton:{
        width:"95%",
        height: 70,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderTopColor: '#0d260d',
       
        borderTopWidth: 5,
        
        
        backgroundColor: "#339933",
        alignItems:"center",
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        color: "black",
        fontSize: 35,
    },
    titleContainer:{
        position: "absolute",
        top: 30,
        
    },
})
export default WelcomeScreen;