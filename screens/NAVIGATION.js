import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './Home';
import Results from './Results';
import Downloads from './Downloads';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDownload, faHome,  } from '@fortawesome/free-solid-svg-icons';
import VideoPlayer from './Components/VideoPlayer';


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
          name="Downloads"
          component={Downloads}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faDownload} color={color} size={size} />
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home Tab" component={HomeTabNavigation} />
        <Stack.Screen name="Result Tab" component={Results} />
        <Stack.Screen name="Video" component={VideoPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


export default NAVIGATION