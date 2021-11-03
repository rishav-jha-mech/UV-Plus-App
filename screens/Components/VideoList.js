import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import bytesConverter from '../Scripts/bytesConverter'
import RNFetchBlob from 'rn-fetch-blob'
import WritePermission from '../Scripts/WritePermission'

const VideoList = ({ title, info, source }) => {

    const navigation = useNavigation(); // This is a hook and cannot be used as a scripts file

    // The Future is here

    const startDownloading = (url, ext, platform) => {
        DownloadScript(url, title, ext, platform)
        alert("Download Started Check Notification For Progress");
    }
    const DownloadScript = (url, title, ext, platform) => {

        const SAVE_FILE_TO = RNFetchBlob.fs.dirs.DownloadDir + "/UV Downloader/"
        var FileName = `${title}.${ext}`

        if (platform == "fb") { FileName = `Facebook Media.${ext}` }

        if (WritePermission()) {
            const { config, fs } = RNFetchBlob
            let options = {
                fileCache: true,
                addAndroidDownloads: {
                    title: (title + '.' + ext),
                    useDownloadManager: true,
                    notification: true,
                    path: (SAVE_FILE_TO + FileName),
                    description: 'Media',
                },
            }
            config(options).fetch('GET', url, { 'Cache-Control': 'no-store', 'Transfer-Encoding': 'Chunked' })
                .then(res => {
                    console.log('response -> ', JSON.stringify(res, null, 4))
                    alert("Media Downloaded Successfully")
                    navigation.navigate("Home")
                })
                .catch(error => { // Smartest Decision Till Date 😂😎😎😎😎
                    alert("Can't download th File directly, click on the three dots button to download the file.\n\nThe file will be stored in the Downloads Folder of your device")
                    navigation.navigate("Plain Web", {
                        url: url
                    })
                    console.log(error) // if i dont print this then i will get a unhandled promise error
                })
        }
    }
    const [filesize, setFilesize] = useState(0)
    const [format, setFormat] = useState()
    const [ext, setExt] = useState()

    // Hooks for checking the platform
    const [youtube, setYoutube] = useState(false)
    const [facebook, setFacebook] = useState(false)
    const [instagram, setInstagram] = useState(false)
    const [arp, setArp] = useState(false)
    const [sago, setSago] = useState(false)
    const [shwe, setShwe] = useState(false)
    const [unknown, setUnknown] = useState(false)

    // Hooks for showing video only
    const [video, setVideo] = useState(false)

    useEffect(() => {
        // Checking the source of the video file
        if (source == 'youtube') { setYoutube(true); Youtube(info) }
        else if (source == 'facebook') { setFacebook(true); Facebook(info); }
        else if (source == 'Instagram') { setInstagram(true) } //Instagram gives only a single file so no need of a seperate function
        else if (source == '') { setArp(true); Arp(info) } // Has only 2 streams High and Low Quality name will not be disclosed in the Source Code
        else if (source == '') { setSago(true); Sago(info) } // Has Many high quality videos with audio embedded except some videos with certain format_id containing hls cant be downloaded
        else if (source == '') { setShwe(true); Shwe(info) } // Has only 2 streams High and Low Quality name will not be disclosed in the Source Code
        else { setUnknown(true) } // This will plainly render all the video streams 
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
        if (info.abr == 0 && info.asr != null && info.ext != "3gp") { // Only two streams i.e. 360px and 720px with audio are available 😌😥
            setVideo(true);
            // Change file size from bytes to KB,MB,or GB
            setFilesize(bytesConverter(info.filesize));
        }
    }
    const Facebook = (info) => {
        // if(info.format_note != "DASH audio"){ This will show all the Video files both with or without embeded audio
        if (info.format_note != "DASH video" && info.format_note != "Dash audio" && info.ext != "m4a") {
            setVideo(true);
            if (info.format_id == "dash_sd_src") {
                setFormat("SD Quality Video")
            }
            else if (info.format_id == "dash_hd_src") { setFormat("HD Quality Video") }
            else if (info.format_id.includes("sd_src_no_ratelimit")) { setFormat("SD High Quality Video") }
            else if (info.format_id.includes("hd_src_no_ratelimit")) { setFormat("HD High Quality Video") }
            else if (info.format_id.includes("sd")) { setFormat("SD Video") }
            else if (info.format_id.includes("hd")) { setFormat("HD Video") }
            else { setFormat(info.format) }
        }
    }
    const Arp = (info) => {
        if (info.protocol == "https") {
            setVideo(true);
            if (info.format_id == "mp4-high") { setFormat("high quality") }
            else if (info.format_id == "mp4-low") { setFormat("low quality") }
        }
    }
    const Sago = (info) => {
        if (!(info.format_id).includes("hls")) {
            setVideo(true)
            var Localformat = info.format
            Localformat = Localformat.slice(0, Localformat.search("-"))
            setFormat(Localformat)
        }
    }
    const Shwe = (info) => {
        if (info.protocol == "https") {
            setVideo(true);
            if (info.format_id == "high") { setFormat("high quality") }
            else if (info.format_id == "low") { setFormat("low quality") }
        }
    }
    return (youtube && video) ? (
        <Pressable
            style={styles.Container}
            onPress={() => { startDownloading(info.url, info.ext) }}
        >
            <Text style={[styles.TheText, styles.format]}> {format ? format : 'Not Present'} </Text>
            <Text style={styles.TheText}> {ext}</Text>
            <Text style={styles.TheText}> {filesize ? filesize : 'undefined'}</Text>
        </Pressable>
    ) :
        (facebook && video) ? (
            <Pressable
                style={styles.Container}
                onPress={() => { startDownloading(info.url, info.ext, "fb") }}
            >
                <Text style={[styles.TheText, styles.format]}> {format} </Text>
                <Text style={styles.TheText}> {info.ext}</Text>
            </Pressable>
        ) :
            (instagram) ? (
                <Pressable
                    style={styles.Container}
                    onPress={() => { startDownloading(info.url, info.ext) }}
                >
                    <Text style={[styles.TheText, styles.format]}> ({info.height} x {info.width}) Video </Text>
                    <Text style={styles.TheText}> {info.ext}</Text>
                </Pressable>
            ) :
                (arp && video) ? (
                    <Pressable
                        style={styles.Container}
                        onPress={() => { startDownloading(info.url, info.ext) }}
                    >
                        <Text style={[styles.TheText, styles.format]}> {format} </Text>
                        <Text style={styles.TheText}> {info.ext} </Text>
                    </Pressable>
                ) :
                    (sago && video) ? (
                        <Pressable
                            style={styles.Container}
                            onPress={() => { startDownloading(info.url, info.ext) }}
                        >
                            <Text style={[styles.TheText, styles.format]}> {format} </Text>
                            <Text style={styles.TheText}> {info.ext} </Text>
                        </Pressable>
                    ) : (shwe && video) ? (
                        <Pressable
                            style={styles.Container}
                            onPress={() => { startDownloading(info.url, info.ext) }}
                        >
                            <Text style={[styles.TheText, styles.format]}> {format} </Text>
                            <Text style={styles.TheText}> {info.ext} </Text>
                        </Pressable>
                    ) :
                        (unknown) ? (
                            <Pressable
                                style={styles.Container}
                                onPress={() => { startDownloading(info.url, info.ext) }}
                            >
                                <Text style={[styles.TheText, styles.format]}> {info.format} </Text>
                                <Text style={styles.TheText}> {info.ext} </Text>
                                <Text style={styles.TheText}> {info.filesize} </Text>
                            </Pressable>
                        ) : (<></>)
}

export default VideoList


const styles = StyleSheet.create({
    Container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    TheText: {
        flex: 1,
        marginVertical: 3,
        backgroundColor: "#ff56",
        textAlign: 'center',
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    format: {
        textTransform: 'capitalize',
        textAlign: 'left'
    },
    nf: {
        color: '#fff',
        backgroundColor: 'orangered',
        textAlign: 'center',
        paddingVertical: 10,
        fontWeight: '700'
    }
})


