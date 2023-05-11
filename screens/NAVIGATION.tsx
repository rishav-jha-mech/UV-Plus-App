import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OctiIcon from 'react-native-vector-icons/Octicons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Home from './TabScreens/Home';
import Results from './StackScreens/Results';
import Downloads from './TabScreens/Downloads';
import Downloading from './TabScreens/Downloading'
import Web from './TabScreens/Web';
import StackWeb from './StackScreens/Stackweb';
import { AppContext } from './context';
import StartDownload from './Scripts/Download';
import { kPrimaryColor } from './constants';


export type AppParamList = {
  HomeTab: undefined;
  Web: undefined;
  Downloads: undefined;
  Downloading: undefined;
  ResultStack: { url: string };
  WebStack: { url: string };
}



const HomeTabNavigation:React.FC<AppParamList> = () => {
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
            <OctiIcon name='home' color={color} size={size} />
          ),
          tabBarActiveTintColor: kPrimaryColor,
          tabBarInactiveTintColor: '#999',
        }}
      />
      <Tab.Screen
        name="Web"
        component={Web}
        options={{
          tabBarIcon: ({ color, size }) => (
            <OctiIcon name='globe' color={color} size={size} />
          ),
          tabBarActiveTintColor: kPrimaryColor,
          tabBarInactiveTintColor: '#999',
        }}
      />
      <Tab.Screen
        name="Downloads"
        component={Downloads}
        options={{
          tabBarIcon: ({ color, size }) => (
            <IonIcon name='ios-folder-outline' color={color} size={size} />
          ),
          tabBarActiveTintColor: kPrimaryColor,
          tabBarInactiveTintColor: '#999',
        }}
      />

      <Tab.Screen
        name="Downloading"
        component={Downloading}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FeatherIcon name='download' color={color} size={size} />
          ),
          tabBarActiveTintColor: kPrimaryColor,
          tabBarInactiveTintColor: '#999',
        }}
      />
    </Tab.Navigator>
  )
}

const NAVIGATION:React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions=
        {{
          headerShown: false,
        }}>
        <Stack.Screen name="Home Tab" component={HomeTabNavigation} />
        <Stack.Screen name="WebStack" component={StackWeb} />
        <Stack.Screen name="ResultStack" component={Results} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const UV:React.FC = () => {

  return (
    <AppContext.Provider value={{ StartDownload }}>
      <NAVIGATION />
    </AppContext.Provider>
  );
}

export default UV

/*
So logically the response for download file should have some error, because the status code is 403,
but it does not throws an error thats why, while downloading files some files were getting downloaded without
any change in their filesize, and progress. this is fixed in this commit.
{
    "bytesWritten": 41777937,
    "statusCode": 200,
    "jobId": 1
}
{
    "bytesWritten": 0,
    "statusCode": 403,
    "jobId": 2
}

*/