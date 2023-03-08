import React from 'react';
import { StyleSheet, Text, View,Dimensions, Button,StatusBar, Image,ImageBackground,Platform,TextInput, SafeAreaView, TouchableNativeFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';





//Screens
import WelcomeScreen from './app/screens/WelcomeScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import MapScreen from './app/screens/MapScreen';
import MonsterScreen from './app/screens/MonsterScreen';
import MainScreen from './app/screens/MainScreen';
import CastleScreen from './app/screens/CastleScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function Home() {
  return (
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
        backgroundColor: 'white',
      
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: 'bold',
      },
      tabBarInactiveTintColor: 'grey',
      tabBarActiveTintColor: 'red',
    })}
  >
    <Tab.Screen
      name="Main"
      component={MainScreen}
      options={{ tabBarLabel: 'Home' }}
    />
    <Tab.Screen
      name="MapScreen"
      component={MapScreen}
      options={{ tabBarLabel: 'Map' }}
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
  </Tab.Navigator>
  
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
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator> 
    </NavigationContainer>
   
  );
}