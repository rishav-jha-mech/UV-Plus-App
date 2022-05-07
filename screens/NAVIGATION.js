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
    const errorParams = {
      id: payload.id,
      filename: payload.filename
    };
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
        // Check the comments below
        if (res.statusCode == 200){
          alert(payload.filename + ' Was Downloaded Successfully')
          dispatch(downloadedSuccessfully({
            id: payload.id
          }));
        }else{
          raiseError(errorParams);
        }
      }).catch(err => {
        console.error(err);
          raiseError(errorParams);
      });
  }
function raiseError(params) {
    dispatch(errorDownloading({
      id: params.id
    }));
    alert('Error occured while downloading' + params.filename);
}
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