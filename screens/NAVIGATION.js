import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDownload, faFolder, faGlobe, faHome, } from '@fortawesome/free-solid-svg-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector, useDispatch } from 'react-redux';
import RNFS from 'react-native-fs';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import Home from './Home';
import Results from './Results';
import Downloads from './Downloads';
import Downloading from './Downloading'
import Web from './Web';
import StackWeb from './Stackweb';
import { AppContext } from './CONTEXT';
import { setFilesize, setDownloadedFileSize, downloadedSuccessfully, errorDownloading } from './REDUX/actions';

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

const UV = () => {

  const dispatch = useDispatch();

  function StartDownload(payload) {
    alert("Download Started Check Notification For Progress");
    const SAVE_FILE_TO = RNFS.DownloadDirectoryPath + `/UV Downloader/${payload.filename}`;

    let DownloadFileOptions = {
      fromUrl: payload.url,
      toFile: SAVE_FILE_TO,
      progressInterval: 100,
      progressDivider: 1,
      begin: (res) => {
        dispatch(setFilesize({
          id: payload.id,
          fileSize: res.contentLength,
        }));
      },
      progress: (res) => {
        dispatch(setDownloadedFileSize({
          id: payload.id,
          downSize: res.bytesWritten
        }));
      },
    };
    RNFS.downloadFile(DownloadFileOptions, (res) => {
    }).promise
      .then(res => {
        alert(payload.filename + ' Was Downloaded Successfully')
        console.log(JSON.stringify(res,null,4));
        dispatch(downloadedSuccessfully({
          id: payload.id
        }));
      }).catch(err => {
        console.error(err);
        dispatch(errorDownloading({
          id: payload.id
        }));
        alert('Error occured while downloading' + payload.filename);
      });

  }

  return (
    <AppContext.Provider value={{ StartDownload }}>
      <NAVIGATION />
    </AppContext.Provider>
  );
}

export default UV