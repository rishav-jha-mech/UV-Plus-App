import React,{ useState, useEffect } from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import bytesConverter from '../Scripts/bytesConverter'
import { useNavigation } from '@react-navigation/core'

const VideoList = ( { info, source } ) => {

    const navigation = useNavigation();
    // This is temporary in future clicking on the button will start the download itself
    const SendToWebPage = (url) => { 
        navigation.navigate('Web Tab', {
          urlToMedia: url,
        });
    }

    const [filesize, setFilesize] = useState(0)
    const [format, setFormat] = useState()
    const [ext, setExt] = useState()

    // Hooks for checking the platform
    const [youtube, setYoutube] = useState(false)
    const [facebook, setFacebook] = useState(false)
    const [instagram, setInstagram] = useState(false)
    
    // Hooks for showing video only
    const [audio, setVideo] = useState(false)

    useEffect(() => {
        // Checking the source of the video file
        if (source == 'youtube'){setYoutube(true);Youtube(info)}
        if (source == 'facebook'){setFacebook(true);Facebook(info)}
        if (source == 'Instagram'){setYoutube(true);Instagram(info)}
        // For setting up formats and other stuffs before rendering
        setExt(info.ext)
    }, [info])


    const Youtube = (info) => {
        // Changing the format string
        var regExp = /\(([^)]+)\)/;
        var Localformat = regExp.exec(info.format);
        setFormat(Localformat[1]);
        // Show Video files only
        // if (info.height != null && info.ext == "mp4" && info.filesize != null) { This will give us all the Videos with or without Audio embeded this will be used when we Begin using FFMPEG in our project
        if (info.abr == 0 && info.asr != null && info.ext != "3gp"){ // Only two streams i.e. 360px and 720px with audio are available 😌😥
            setVideo(true);
            // Change file size from bytes to KB,MB,or GB
            setFilesize(bytesConverter(info.filesize));
        }
    }

    return (youtube && audio) ?(
        <Pressable
             style={styles.Container}
             onPress={() => {SendToWebPage(info.url)}}
        >
            <Text style={[styles.TheText,styles.format]}> {format ? format : 'Not Present'} </Text>
            <Text style={styles.TheText}> {ext}</Text>
            <Text style={styles.TheText}> {filesize ? filesize : 'undefined'}</Text>
        </Pressable>
    ):(<></>)
}

export default VideoList


const styles = StyleSheet.create({
    Container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    TheText:{
        flex:1,
        marginVertical: 3,
        backgroundColor:"#ff56",
        textAlign:'center',
        paddingHorizontal:12,
        paddingVertical:12,
    },
    format:{
        textTransform:'capitalize',
        textAlign:'left'
    }
})
