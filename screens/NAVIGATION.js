import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from './Home';
import Results from './Results';
import Downloads from './Downloads';
import VideoPlayer from './VideoPlayer';

const NAVIGATION = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Downloads" component={Downloads} />
        <Stack.Screen name="Result Tab" component={Results} />
        <Stack.Screen name="Video" component={VideoPlayer} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default NAVIGATION