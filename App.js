import React, { useState, useEffect } from 'react'

import NAVIGATION from './screens/NAVIGATION'
import { AppContext } from './screens/CONTEXT'
import RNFS from 'react-native-fs';


const App = () => {
  const [DownloadList, setDownloadList] = useState([]);

  useEffect(() => {
    // console.log('LIST HAS BEEN CHANGED');
    // console.log(JSON.stringify(DownloadList, null, 4));
    SuperVisor();
  }, [DownloadList])


  const SuperVisor = () =>{
    DownloadList.map((payload)=>{
      if (payload.startDownloading === true && payload.completed === false) {
        function StartDownload() {
          alert("Download Started Check Notification For Progress");
    
          const SAVE_FILE_TO = RNFS.DownloadDirectoryPath + `/UV Downloader/${payload.filename}`;
    
          let DownloadFileOptions = {
            fromUrl: payload.url,
            toFile: SAVE_FILE_TO,
            progressInterval: 800,
            progressDivider: 1,
            begin: (res) => {
              dispatchDownloadEvent('SET_FILE_SIZE', {
                id: payload.id,
                fileSize: res.contentLength,
                startDownloading: false
              })
            },
            progress: (res) => {
              dispatchDownloadEvent('SET_DOWLOADED_FILE_SIZE', {
                id: payload.id,
                downSize: res.bytesWritten
              })
            },
          };
          RNFS.downloadFile(DownloadFileOptions, (res) => {
          }).promise
            .then(res => {
              // console.log(res);
              alert(payload.filename + ' Was Downloaded Successfully')
              dispatchDownloadEvent('DOWNLOADED_SUCCESSFULLY', {
                id: payload.id
              })
            }).catch(err => {
              console.error(err);
              alert('Error occured while downloading' + payload.filename)
            });
        }  
        StartDownload();
      }
    })
  }



  const dispatchDownloadEvent = (actionType, payload) => {
    switch (actionType) {
      case 'START_DOWNLOADING':
        // ---------------------------------------------------------------------------------------------------------------- //
        const params = {
          id: payload.id,
          url: payload.url,
          filename: payload.filename,
          startDownloading: true,
          completed: false,
          fileSize: 0,
          downSize: 0,
        };
        if (DownloadList.length === 0) {
          setDownloadList(prevValue => [...prevValue, params,]);
        } else {
          DownloadList.map((data) => {
            if (data.filename === payload.filename) {
              return
            }
          })
          setDownloadList(prevValue => [...prevValue, params,]);
        }
        // ---------------------------------------------------------------------------------------------------------------- //
        return;
      case 'DOWNLOADED_SUCCESSFULLY':
        var downloadIndex = DownloadList.findIndex((obj => obj.id == payload.id));
        var updatedDownloads = [...DownloadList];
        updatedDownloads[downloadIndex].downSize = updatedDownloads[downloadIndex].fileSize;
        updatedDownloads[downloadIndex].completed = true;
        setDownloadList(updatedDownloads);
        const newArray = DownloadList.filter(items => items.id !== payload.id);
        setDownloadList(newArray);
        return;
      case 'SET_FILE_SIZE':
        try {
          var downloadIndex = DownloadList.findIndex((obj => obj.id == payload.id));
          var updatedDownloads = [...DownloadList];
          updatedDownloads[downloadIndex].fileSize = payload.fileSize;
          updatedDownloads[downloadIndex].startDownloading = payload.startDownloading;
          setDownloadList(updatedDownloads);
        } catch (error) {
          console.error(error);
          // console.error('ERROR SETTING FILE SIZE')
        }
        return;
      case 'SET_DOWLOADED_FILE_SIZE':
        // console.log('SET_DOWLOADED_FILE_SIZE => ',payload.downSize)
        try {
          var downloadIndex = DownloadList.findIndex((obj => obj.id == payload.id));
          var updatedDownloads = [...DownloadList];
          updatedDownloads[downloadIndex].downSize = payload.downSize
          setDownloadList(updatedDownloads);
        } catch (error) {
          console.error(error);
          console.error('ERROR OCCURED WHILE SETTING DOWNSIZE');
      }
      // case 'REMOVE_FROM_DOWNLOAD':
      //   console.log('REMOVE_FROM_DOWNLOAD');
      //   const remove = DownloadList.filter(items => items.id !== payload.id);
      //   setDownloadList(remove);
      //   return;
      default:
        return;
    }
  };
  return (
    <AppContext.Provider value={{ DownloadList, dispatchDownloadEvent }}>
      <NAVIGATION />
    </AppContext.Provider>
  )
}

export default App

// The problem is DownloadList.map will not run if DownloadList is empty, now its obvious, 
// to solve this we have to first check if DoqwnloadList is empty, if it is empty then there is no need of checking, 
// we will just start downloading it and if its the list is greater than zero we will check if it does exists before
// adding it to the list

// The final problem to solve is that we have to defineall the progress and data at once only we otherwise
//  everytime a component is rendered downloadFucntion is callled download wil start again, 
// So the download funciton should be called once only !, but then again i ahve to update the proigress and all



// The most important thing that i leanrt today is useState is asyn chronous, so starte doesnot gets changed immediately
// Whats and even bigger disaster, if you set the state and the try to read it and/or update nothing will happen, or it wont work
// the way you think it is supposed to work, so this is nothing todo with react, you are gonna face the same problem everywhere else
// Remember when Linus Torvalds used to say Asynchronous programming is very complex, now i understand what he meant !

//  I was converting the bytes to kilobytes and mbs and all over here only but then how would i show the progress ? huh ?
// And even if the user is not on the Downloading screen this function will keep running, which is adding unneccessary load
// because on our phones, so yeah, we will store it raw, in bytes