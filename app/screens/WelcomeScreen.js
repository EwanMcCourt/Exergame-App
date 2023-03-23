import React from 'react';
import { StyleSheet, ImageBackground, View, Image, Text, Button,TouchableOpacity, TouchableHighlight } from 'react-native';


const backgroundimage = {uri: "https://c4.wallpaperflare.com/wallpaper/97/833/155/mountains-firewatch-green-forest-wallpaper-preview.jpg"};
const icon = {uri:"http://clipart-library.com/images_k/cinderella-castle-silhouette-vector/cinderella-castle-silhouette-vector-13.png"};

function WelcomeScreen({ navigation }) {
    return (
         
        <ImageBackground  
        
          source = {backgroundimage}
          fadeDuration={1000}
          
          style = {styles.background}
          >
            <View style = {styles.titleContainer}>
                <Image style = {styles.logo} source = {icon}/>
                <Text style = {styles.title}> CastleFit </Text>
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
  height: "10%",
  backgroundColor: "#00b3b3",
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  borderTopColor: '#0d260d',
 
  borderTopWidth: 5,
 
  alignItems: "center",
  justifyContent: "center",
  
  
    },
    logo:{
        width:150,
        height:150,
        
        
    },
    registerButton:{
        width:"95%",
        height: "10%",
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
        fontSize: 40,
    
    },
    titleContainer:{
        position: "absolute",
        top: "5%",
        alignItems:"center",
        justifyContent: "center",
    },
})
export default WelcomeScreen;