import React, { useState, useEffect, useContext } from 'react'
import { Text, Pressable, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import bytesConverter from '../../Scripts/bytesConverter'
import { ARP, SHWE, SAGO } from '../../env';
import RNFS from 'react-native-fs';
import { AppContext } from '../../context';
import { useAppDispatch } from '../../hooks';
import { startDownloading } from '../../REDUX/DownloadSilce';
import { FormatType } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppParamList } from '../../NAVIGATION';
import { listStyles } from './listStyles';
import { pLog, pPrettyPrint } from '../../constants';


type VideoListType = {
    info: FormatType,
    source: string,
    title: string
}

type downloadingProps = StackNavigationProp<AppParamList, 'Downloading'>;

const VideoList: React.FC<VideoListType> = ({ info, source, title }) => {

    const navigation = useNavigation<downloadingProps>();
    const dispatch = useAppDispatch();
    const { StartDownload } = useContext(AppContext);

    const StartDownloading = (url: string, ext: string) => {
        const filename = `${title}.${ext}`.replace(/[/\\?%*:|"<>]/g, '-');

        RNFS.exists(RNFS.DownloadDirectoryPath + `/UV Downloader/${filename}`)
            .then((exists) => {
                if (exists) {
                    Alert.alert(`${filename} already exists, thus cannot be downloaded. Delete that file and try again`)
                } else {
                    const time = new Date();
                    const id = time.toISOString();
                    const params = {
                        id: id,
                        url: url,
                        filename: filename
                    };
                    dispatch(startDownloading(params));
                    StartDownload(params, dispatch);
                    navigation.navigate('Downloading');
                }
            });
    }

    const [filesize, setFilesize] = useState<string>('')
    const [format, setFormat] = useState<string>('')
    const [ext, setExt] = useState<string>('')

    // Hooks for checking the platform
    const [youtube, setYoutube] = useState<boolean>(false)
    const [facebook, setFacebook] = useState<boolean>(false)
    const [instagram, setInstagram] = useState<boolean>(false)
    const [arp, setArp] = useState<boolean>(false)
    const [sago, setSago] = useState<boolean>(false)
    const [shwe, setShwe] = useState<boolean>(false)
    const [unknown, setUnknown] = useState<boolean>(false)

    // Hooks for showing video only
    const [video, setVideo] = useState<boolean>(false)

    useEffect(() => {
        // Checking the source of the video file
        if (source == 'youtube') { setYoutube(true); Youtube(info) }
        else if (source == 'facebook') { setFacebook(true); Facebook(info); }
        else if (source == 'Instagram') { setInstagram(true) } //Instagram gives only a single file so no need of a seperate function
        else if (source == ARP) { setArp(true); Arp(info) } // Has only 2 streams High and Low Quality name will not be disclosed in the Source Code
        else if (source == SAGO) { setSago(true); Sago(info) } // Has Many high quality videos with audio embedded except some videos with certain format_id containing hls cant be downloaded
        else if (source == SHWE) { setShwe(true); Shwe(info) } // Has only 2 streams High and Low Quality name will not be disclosed in the Source Code
        else { setUnknown(true); Unknown(info) } // This will plainly render all the video streams 
        // For setting up formats and other stuffs before rendering
        setExt(info.ext)
    }, [info])


    const Youtube = (info: FormatType) => {
        // Changing the format string
        var regExp = /\(([^)]+)\)/;
        var Localformat = regExp.exec(info.format);
        setFormat(Localformat![1]);
        // Show Video files only
        // if (info.height != null && info.ext == "mp4" && info.filesize != null) { // This will give us all the Videos with or without Audio embeded this will be used when we Begin using FFMPEG in our project
        if (info.abr == 0 && info.asr != null && info.ext != "3gp") { // Only two streams i.e. 360px and 720px with audio are available 😌😥
            GiveTheFileSize();
            setVideo(true);
        }
    }
    const Facebook = (info: FormatType) => {
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
    const Arp = (info: FormatType) => {
        if (info.protocol == "https") {
            setVideo(true);
            if (info.format_id == "mp4-high") { setFormat("high quality") }
            else if (info.format_id == "mp4-low") { setFormat("low quality") }
        }
    }
    const Sago = (info: FormatType) => {
        if (!(info.format_id).includes("hls")) {
            setVideo(true)
            var Localformat = info.format
            Localformat = Localformat.slice(0, Localformat.search("-"))
            setFormat(Localformat)
        }
    }
    const Shwe = (info: FormatType) => {
        if (info.protocol == "https") {
            setVideo(true);
            if (info.format_id == "high") { setFormat("high quality") }
            else if (info.format_id == "low") { setFormat("low quality") }
        }
    }

    const Unknown = (info: FormatType) => {
        if ((info.height != undefined || info.height != null)) {
            if (info.format_id.includes('hls') === false) {
                pLog(info.height)
                setVideo(true);
                setFormat(`${info.height}X${info.width}`)
            }
        }
    }

    const GiveTheFileSize = (): void => {
        setFilesize(bytesConverter(info.filesize ?? info.filesize_approx));
    }
    return (youtube && video) ? (
        <Pressable
            style={listStyles.Container}
            onPress={() => { StartDownloading(info.url, info.ext) }}
        >
            <Text style={[listStyles.TheText, listStyles.format]}> {format ? format : 'Not Present'} </Text>
            <Text style={listStyles.TheText}> {ext}</Text>
            <Text style={listStyles.TheText}> {filesize ? filesize : 'Unknown'}</Text>
        </Pressable>
    ) :
        (facebook && video) ? (
            <Pressable
                style={listStyles.Container}
                onPress={() => { StartDownloading(info.url, info.ext) }}
            >
                <Text style={[listStyles.TheText, listStyles.format]}> {format} </Text>
                <Text style={listStyles.TheText}> {info.ext}</Text>
                <Text style={listStyles.TheText}> {'Unknown'}</Text>
            </Pressable>
        ) :
            (instagram) ? (
                <Pressable
                    style={listStyles.Container}
                    onPress={() => { StartDownloading(info.url, info.ext) }}
                >
                    <Text style={[listStyles.TheText, listStyles.format]}> ({info.height} x {info.width}) Video </Text>
                    <Text style={listStyles.TheText}> {info.ext}</Text>
                </Pressable>
            ) :
                (arp && video) ? (
                    <Pressable
                        style={listStyles.Container}
                        onPress={() => { StartDownloading(info.url, info.ext) }}
                    >
                        <Text style={[listStyles.TheText, listStyles.format]}> {format} </Text>
                        <Text style={listStyles.TheText}> {info.ext} </Text>
                    </Pressable>
                ) :
                    (sago && video) ? (
                        <Pressable
                            style={listStyles.Container}
                            onPress={() => { StartDownloading(info.url, info.ext) }}
                        >
                            <Text style={[listStyles.TheText, listStyles.format]}> {format} </Text>
                            <Text style={listStyles.TheText}> {info.ext} </Text>
                        </Pressable>
                    ) : (shwe && video) ? (
                        <Pressable
                            style={listStyles.Container}
                            onPress={() => { StartDownloading(info.url, info.ext) }}
                        >
                            <Text style={[listStyles.TheText, listStyles.format]}> {format} </Text>
                            <Text style={listStyles.TheText}> {info.ext} </Text>
                        </Pressable>
                    ) :
                        (unknown && video) ? (
                            <Pressable
                                style={listStyles.Container}
                                onPress={() => { StartDownloading(info.url, info.ext) }}
                            >
                                <Text style={[listStyles.TheText, listStyles.format]}> {format} </Text>
                                <Text style={listStyles.TheText}> {info.ext} </Text>
                                <Text style={listStyles.TheText}> {bytesConverter(info.filesize ?? info.filesize_approx ?? 0)} </Text>
                            </Pressable>
                        ) : (<></>)
}

export default VideoList