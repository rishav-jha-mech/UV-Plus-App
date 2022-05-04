import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDownload, faFolder, faGlobe, faHome, } from '@fortawesome/free-solid-svg-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Home from './Home';
import Results from './Results';
import Downloads from './Downloads';
import Downloading from './Downloading'
import Web from './Web';
import StackWeb from './Stackweb';

const HomeTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHome} color={color} size={size} />
          ),
          tabBarActiveTintColor: '#66f',
          tabBarInactiveTintColor: '#999',
        }}
      />
      <Tab.Screen
        name="Web"
        component={Web}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faGlobe} color={color} size={size} />
          ),
          tabBarActiveTintColor: '#66f',
          tabBarInactiveTintColor: '#999',
        }}
      />
      <Tab.Screen
        name="Downloads"
        component={Downloads}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faFolder} color={color} size={size} />
          ),
          tabBarActiveTintColor: '#66f',
          tabBarInactiveTintColor: '#999',
        }}
      />
      
      <Tab.Screen
        name="Downloading"
        component={Downloading}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faDownload} color={color} size={size} />
          ),
          tabBarActiveTintColor: '#66f',
          tabBarInactiveTintColor: '#999',
        }}
      />
    </Tab.Navigator>
  )
}

const NAVIGATION = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions=
        {{
          headerShown: false,
        }}>
        <Stack.Screen name="Home Tab" component={HomeTabNavigation} />
        <Stack.Screen name="Stack Web" component={StackWeb} />
        <Stack.Screen name="Result Tab" component={Results} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NAVIGATION