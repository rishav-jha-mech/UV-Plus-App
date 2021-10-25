import React,{ useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import bytesConverter from '../Scripts/bytesConverter'

const VideoList = ( { info, source } ) => {

    const [filesize, setFilesize] = useState(0)
    const [format, setFormat] = useState()
    const [ext, setExt] = useState()

    // Hooks for checking the platform
    const [youtube, setYoutube] = useState(false)
    const [facebook, setFacebook] = useState(false)
    const [instagram, setInstagram] = useState(false)
    
    // Hooks for showing video only
    const [audio, setAudio] = useState(false)

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
        if (info.height != null && info.ext == "mp4" && info.filesize != null) {
            setAudio(true);
            // Change file size from bytes to KB,MB,or GB
            setFilesize(bytesConverter(info.filesize));
        }
    }

    return (youtube && audio) ?(
        <View style={styles.Container}>
            <Text style={[styles.TheText,styles.format]}> {format ? format : 'Not Present'} </Text>
            <Text style={styles.TheText}> {ext}</Text>
            <Text style={styles.TheText}> {filesize ? filesize : 'undefined'}</Text>
        </View>
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
