import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { Circle } from 'react-native-progress';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import bytesConverter from '../Scripts/bytesConverter';
import RNFS from 'react-native-fs';

const Downcomp = (props) => {

    let { id, url, filename } = props.data
    const [progress, setProgress] = useState(0);
    const [totalsize, setTotal] = useState(0);
    const [downloadedSize,setDownloadedSize] = useState(0);

    useEffect(() => {
        if (progress === 0){
            StartDownload();
        }
    }, [progress])

    function StartDownload() {
        alert("Download Started Check Notification For Progress");

        const SAVE_FILE_TO = RNFS.DownloadDirectoryPath + `/UV Downloader/${filename}`;

        let DownloadFileOptions = {
            fromUrl: url,
            toFile: SAVE_FILE_TO,
            progressInterval: 100,
            progressDivider: 1,
            // background: true,
            begin: (res) => {
                console.log('DOWNLOAD STARTED => ');
                setTotal(bytesConverter(res.contentLength))
                // console.log(JSON.stringify(res, null, 4));
            },
            progress: (res) => {
                // console.log('Progress => ' + ((res.bytesWritten / res.contentLength) * 100));
                setProgress(res.bytesWritten / res.contentLength);
                setDownloadedSize(bytesConverter(res.bytesWritten))
            },
        };
        RNFS.downloadFile(DownloadFileOptions, (res) => {
            console.log('RESULT');
            // console.log(res);
        }).promise
            .then(res => {
                // console.log(res);
                alert(filename + ' Was Downloaded Successfully')
                setProgress(1.0);
                setDownloadedSize(bytesConverter(totalsize));
                props.removeFromDownloads(id);
            }).catch(err => {
                console.error(err);
                alert('Error occured while downloading'+ filename)
            });
    }
    return (
        <Pressable style={baby.Container}>
            <View style={baby.CircleContainer}>
                <Circle
                    size={60}
                    progress={progress}
                    color={(progress < 1) ? 'dodgerblue': '#4BB543'}
                    endAngle={1.0}
                    thickness={3}
                    showsText={true}
                    textStyle={{ fontSize: 14.0, fontWeight: '600' }}
                    strokeCap={"round"}
                />
            </View>
            <View style={baby.textContainer}>
                <Text style={baby.bigText} numberOfLines={1}>
                    {filename}
                </Text>
                <Text style={baby.smolText} numberOfLines={1}>
                    {downloadedSize}/{totalsize}
                </Text>
            </View>
            <View style={baby.eliipBtn}>
                <Pressable>
                    <FontAwesomeIcon icon={faEllipsisV} totalsize={23} color={'#333'} />
                </Pressable>
            </View>
        </Pressable>
    )

}

export default Downcomp

const baby = StyleSheet.create({
    Container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 2.0,
      paddingVertical: 12.0,
      marginVertical: 1,
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0,0,0,0.05)',
      height: 90.0
    },
    CircleContainer:{

    },
    textContainer: {
      flex: 1,
      height: '100%',
      paddingHorizontal: 10.0,
      paddingVertical: 2.0,
      justifyContent: 'space-between'
    },
    bigText: {
      color: '#333'
    },
    smolText: {
      fontSize: 12.0
    }
});