import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import ReadPermission from '../Scripts/ReadPermission';
import { useNavigation } from '@react-navigation/native';
import Banner from './Banner';                                 // Every thing happens here !
import Recent from './Recent';
import RNFS from 'react-native-fs';


const Home = () => {
    const [perm, setPerm] = useState()
    const navigator = useNavigation();
    ReadPermission().then(res => setPerm(res));
    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor="#202020"
            />
            <ScrollView >
                <View style={{ backgroundColor: '#fcfcfc', flex: 1 }}>
                    <Banner />
                    <Recent perm={perm} />
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            style={styles.btn}
                            onPress={() => {
                                var path = RNFS.DownloadDirectoryPath + '/UV Downloader/Yo bithc.mp4';
                                var options = {
                                        fromUrl: 'https://rr1---sn-5aap5ojx-jj0z.googlevideo.com/videoplayback?expire=1646867353&ei=ON8oYoOuOZCbg8UP7f-NoA4&ip=103.102.116.66&id=o-AHBVbmjLeGbsgZQK2-cmTa_mR4zXFuKthACuPtRtHH9f&itag=22&source=youtube&requiressl=yes&mh=SP&mm=31%2C29&mn=sn-5aap5ojx-jj0z%2Csn-cvh7knzs&ms=au%2Crdu&mv=m&mvi=1&pcm2cms=yes&pl=24&initcwndbps=947500&vprv=1&mime=video%2Fmp4&ratebypass=yes&dur=183.902&lmt=1574877289589053&mt=1646845278&fvip=4&fexp=24001373%2C24007246&c=ANDROID&txp=5531432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAMvmu5ThnHvYChPyI6KizvcpG5HQPPaoO29NSg3mkHMyAiAh6rohE1gvMsVh9HV__oakxvVLAZrSQfyPJRAK0l73IQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRAIgeRoWJOXWRxir6WKTpkktAVUMfJNZYFVDKzX_QGJ7Af4CIEuTJ4vd6cw85dblNHtMLrFwOZmvz7-kiRBAZH0lud8A',          // URL to download file from
                                        toFile: path,          // Local filesystem path to save the file to
                                        progressInterval: 100,
                                        progressDivider: 1,
                                        begin: (res) => {console.log('Download began => \n\n\n'+res);},
                                        progress: (res) => {
                                            console.log('Progress => ' + ((res.bytesWritten/res.contentLength)*100));
                                        },
                                }
                                navigator.navigate('Stack Web',{
                                    theUrl: 'https://m.youtube.com'
                                })
                            }}
                        >
                            <Text style={{color:'#fff'}}>Download More</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default Home

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
    },
    btn:{
        backgroundColor: '#66f',
        marginBottom: 20.0,
        paddingHorizontal: 16.0,
        paddingVertical: 16.0,
        borderRadius: 8.0
    }
})