import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './Home';
import Downloading from './Downloading';
import Completed from './Completed';
import Web from './Web.js'
import Results from './Results';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faDownload, faHome, faUserNinja } from '@fortawesome/free-solid-svg-icons';


const Tab = createBottomTabNavigator();

const HomeTabNavigation = () => {
  return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faHome} color={color} size={size} />
            ),
            tabBarActiveTintColor: '#ff156f',
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
            tabBarActiveTintColor: '#ff156f',
            tabBarInactiveTintColor: '#999',
          }}
        />
        <Tab.Screen
          name="Completed"
          component={Completed}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faCheckCircle} color={color} size={size} />
            ),
            tabBarActiveTintColor: '#ff156f',
            tabBarInactiveTintColor: '#999',
          }}
        />
      </Tab.Navigator>
  )
}


const NAVIGATION = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home Tab" component={HomeTabNavigation} />
        <Stack.Screen name="Result Tab" component={Results} />
        <Stack.Screen name="Web Tab" component={Web} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default NAVIGATION