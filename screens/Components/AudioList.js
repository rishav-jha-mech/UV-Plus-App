import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import bytesConverter from '../Scripts/bytesConverter'
import DownloadScript from '../Scripts/DownloadScript'

const AudioList = ({ title, info, source }) => {
    
    const navigation = useNavigation();

    const startDownloading = (url,ext,platform) =>{
        DownloadScript(url,title,ext,platform)
        alert("Download Started Check Notification For Progress");
        navigation.navigate("Home")

    }

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
        if (source == 'youtube') { setYoutube(true); Youtube(info) }
        if (source == 'facebook') { setFacebook(true); Facebook(info) }
        if (source == 'Instagram') { setInstagram(true);}
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
    const Facebook = (info) => {
        if (info.format_note == "DASH audio") {
            setAudio(true)
            setFormat("High Quality Audio")
        }
    }
    return (youtube && audio) ? (
        <Pressable
            style={styles.Container}
            onPress={() => { startDownloading(info.url,info.ext) }}
        >
            <Text style={[styles.TheText, styles.format]}> {format ? format : 'Not Present'} </Text>
            <Text style={styles.TheText}> {ext}</Text>
            <Text style={styles.TheText}> {filesize ? filesize : 'undefined'}</Text>
        </Pressable>
    ) : (facebook && audio) ? (
        <Pressable
            style={styles.Container}
            onPress={() => { startDownloading(info.url,info.ext,"fb") }}
        >
            <Text style={[styles.TheText, styles.format]}> {format} </Text>
            <Text style={styles.TheText}> {info.ext} </Text>
        </Pressable>
    ) : (instagram) ?(
            <Text style={styles.nf}>We Dont Do That Here</Text>
    ) : (<></>)
}

export default AudioList


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    TheText: {
        flex: 1,
        marginVertical: 3,
        backgroundColor: "#ff56",
        textAlign: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
        textAlignVertical:'center'
    },
    format: {
        textTransform: 'capitalize',
        textAlign: 'left'
    },
    nf:{
        fontSize:20,
        paddingVertical:10,
        backgroundColor:'orangered',
        color:'white',
        fontWeight:'800',
        textAlign:'center'
    }
})