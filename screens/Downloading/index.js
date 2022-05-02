import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl, FlatList, Dimensions } from 'react-native'
import Downcomp from './Downcomp';
import RNFS from 'react-native-fs';

const Downloading = (props) => {

  const [DownloadList, setDownloadList] = useState([]);

  useEffect(() => {
    Supervisor()
  }, [])

  const Supervisor = () => {

    if (props.route.params !== undefined) {
      console.log('SUPERVISOR CALLED filename => ', props.route.params.filename);

      const { url, filename } = props.route.params;
      console.log('Path recieved => ', filename);
      const date = new Date();
      const id = date.toISOString();

      const PATH = RNFS.DownloadDirectoryPath + `/UV Downloader/${filename}`
      RNFS.exists(PATH)
        .then((exists) => {
          console.log('RNFS RAN')
          if (exists) {
            console.log('This does exists & the path is => ', PATH);
            return
          }
          // Here we were setting the download list after checking that if the file already exists or not AGAIN !
          // But now nothing such will happen, the only thing we will dop here, is , check using useContext if there something geting dowloaded in the bg,
          // Then removing it, will not happen from here, it will happen directly from the child !
          // setDownloadList(prevValue => [...prevValue, { id: id, url: url, filename: filename },]);

          console.log('SET THE DOWNLOAD LIST')
        });
    }
  }
  const removeFromDownloads = (id) => {
    const newArray = DownloadList.filter(items => items.taskid == id);
    setDownloadList(newArray);
  }


  return (
    <View style={styles.Container}>
      <Text style={styles.topHeading}>Downloading</Text>

      {(DownloadList.length === 0) ?
        <NoDownloading />
        : <FlatList data={DownloadList} renderItem={(data, index) => {
          console.log(data.item)
          // return (<>
          //   <Text>Filename : {data.item.filename}</Text>
          //   <Text>URL : {data.item.filename}</Text>
          //   <Text>Task id: {data.item.id}</Text>
          // </>);
          return <Downcomp data={data.item} removeFromDownloads={(id) => removeFromDownloads(id)} />
        }} />
      }


    </View>
  )
}

export default Downloading

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10.0
  },
  topHeading: {
    fontSize: 22.0,
    fontWeight: '700',
    paddingVertical: 16.0,
    color: '#333',
    borderBottomWidth: 1.0,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 6.0
  },
  downloadView: {
    flex: 1,
    backgroundColor: '#ff56'
  }
});

const NoDownloading = () => {
  return (
    <View style={{ height: Dimensions.get('window').height / 1.4, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#333', fontSize: 16.0 }}>No file is getting downloaded at the moment</Text>
    </View>
  );
}
/* An array which stores the downloading objects
   {
     id: 1,
     filename: 'musicvideo.mp4',
     path: 'path to video',
     status: 0, // 0 means downloading -1 means pending, no more than 5 downloads can occur simultaneously
     progress: 0, // This will keep on changing
   }
   This object will come from results tab's video/audio component
   For now making this additional state of checking if the file is getting downloaded or not
*/