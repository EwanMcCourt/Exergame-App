import React from 'react';
import { StyleSheet, Text, View,Dimensions, Button,StatusBar, Image,ImageBackground,Platform,TextInput, SafeAreaView, TouchableNativeFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';




//Screens
import WelcomeScreen from './app/screens/WelcomeScreen';
import MapScreen from './app/screens/MapScreen';
import MonsterScreen from './app/screens/MonsterScreen';
import MainScreen from './app/screens/MainScreen';
import CastleScreen from './app/screens/CastleScreen';
import MultiplierContext from './app/screens/MultiplierContext';
import {useState} from "react";
import { useRoute } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


function DrawerNav({ navigation }) {
  const route = useRoute();
  return (


    
  <Drawer.Navigator>
    
    <Drawer.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Drawer.Screen name="Logout" component={WelcomeScreen}  options={{ headerShown: false,swipeEnabled: false }}/>
  </Drawer.Navigator>
   
  );
}


function Home({ navigation }) {
  const [multiplier, setMultiplier] = useState(1);
  return (
    <MultiplierContext.Provider value={{ multiplier, setMultiplier }}>
    <Tab.Navigator
    initialRouteName="MainScreen"
    tabBarPosition="bottom"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        let rn = route.name;
  
        if (rn === "MapScreen") {
          iconName = focused ? "map" : "map-outline";
        } else if (rn === "Monster") {
          iconName = focused ? "bug" : "bug-outline";
        } else if (rn === "Castle") {
          iconName = focused ? "shield" : "shield-outline";
        }
          else if (rn === "Main") {
          iconName = focused ? "home" : "home-outline";
        }
  
        return <Ionicons name={iconName} size={25} color={color} />;
      },
      tabBarStyle: {
        backgroundColor: '#2C2C2C',
        borderTopColor: 'grey',
        borderTopWidth: 5,
     
       
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      tabBarInactiveTintColor: 'grey',
      tabBarActiveTintColor: 'aqua',
    })}
  >
    <Tab.Screen
      name="Main"
      component={MainScreen}
      options={{ tabBarLabel: 'Home' }}
    />
    
    <Tab.Screen
      name="Castle"
      component={CastleScreen}
      options={{ tabBarLabel: 'Castle' }}
    />
    <Tab.Screen
      name="Monster"
      component={MonsterScreen}
      options={{ tabBarLabel: 'Monster' }}
    />
    <Tab.Screen
      name="MapScreen"
      component={MapScreen}
      options={{ tabBarLabel: 'Map' }}
    />
  </Tab.Navigator>
  </MultiplierContext.Provider>
  );
}

export default function App() {
  return (
   
    <NavigationContainer>
       
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
      
        <Stack.Screen
          name="DrawerNav"
          component={DrawerNav}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
       
      </Stack.Navigator> 
    </NavigationContainer>
   
  );
}
