import React,{ useState, useEffect } from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import bytesConverter from '../Scripts/bytesConverter'

const AudioList = ( { info, source } ) => {

    const navigation = useNavigation();
    // This is temporary in future clicking on the button will start the download itself
    const SendToWebPage = (url) => { 
        navigation.navigate('Web Tab', {
          urlToMedia: url,
        });
    }
    //
    const [filesize, setFilesize] = useState(0)
    const [format, setFormat] = useState()
    const [ext, setExt] = useState()

    // Hooks for checking the platform
    const [youtube, setYoutube] = useState(false)
    const [facebook, setFacebook] = useState(false)
    const [instagram, setInstagram] = useState(false)
    
    // Hooks for showing Audio only
    const [audio, setAudio] = useState(false)

    useEffect(() => {
        // Checking the source of the audio file
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
        // Show Audio files only
        if (info.height == null) {
            setAudio(true);
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

export default AudioList


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
