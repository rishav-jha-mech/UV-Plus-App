import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import Downloading from './Downloading';
import Completed from './Completed';
import Founder from './Founder';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle, faDownload, faHome, faUserAstronaut, faUserFriends, faUserNinja, } from '@fortawesome/free-solid-svg-icons';


const Tab = createBottomTabNavigator();

const NAVIGATION = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
              screenOptions={{
                tabBarStyle: { tabBarActiveTintColor : "#ff156f"},
              }}
            >
                <Tab.Screen
                    name="Home" 
                    component={Home}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                          <FontAwesomeIcon icon={faHome} color={color} size={size} />
                        ),
                      }}
                />
                <Tab.Screen 
                    name="Downloading" 
                    component={Downloading} 
                    options={{
                        tabBarIcon: ({ color, size }) => (
                          <FontAwesomeIcon icon={faDownload} color={color} size={size} />
                        ),
                      }}
                />
                <Tab.Screen
                    name="Completed"
                    component={Completed}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                          <FontAwesomeIcon icon={faCheckCircle} color={color} size={size} />
                        ),
                      }}
                    />
                <Tab.Screen
                    name="Founder"
                    component={Founder}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                          <FontAwesomeIcon icon={faUserNinja} color={color} size={size} />
                        ),
                      }}
                    />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default NAVIGATION