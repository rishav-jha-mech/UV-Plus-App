import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, Text, Alert } from 'react-native';
import { AppParamList } from '../../NAVIGATION';
import bytesConverter from '../../Scripts/bytesConverter';
import CheckAndStartDownloadingBothVideoAndAudio from '../../Scripts/checkAndDownloadBothVideoAndAudio';
import CheckAndStartDownloading from '../../Scripts/checkAndStartDownload';
import { Colors, pLog, pPrettyPrint } from '../../constants';
import { ARP, SAGO, SHWE } from '../../env';
import { useAppDispatch } from '../../hooks';
import { FormatType } from '../../types';
import { listStyles } from './listStyles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type VideoListItemType = {
    info: FormatType,
    source: string,
    title: string,
    bestAudio?: FormatType,
}

type downloadingProps = NativeStackNavigationProp<AppParamList, 'Downloading'>;

const VideoListItem: React.FC<VideoListItemType> = ({ info, source, title, bestAudio }) => {

    const navigation = useNavigation<downloadingProps>();
    const dispatch = useAppDispatch();
    const CheckAndStart = (url: string, ext: string) => CheckAndStartDownloading(title, ext, url, dispatch, navigation);
    const CheckAndStartVideoAndAudio = (url: string, ext: string) => {
        if (bestAudio) {
            CheckAndStartDownloadingBothVideoAndAudio(title, ext, url, dispatch, navigation, bestAudio)
        } else {
            Alert.alert('Error', 'No audiio available for this video, try to download other video instead')
        }
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

    const [color, setColor] = useState<string>(Colors.SecondaryColor)

    // Hooks for showing video only
    const [video, setVideo] = useState<boolean>(false)

    useEffect(() => {
        // Checking the source of the video file
        if (source.includes('youtube')) { setYoutube(true); Youtube(info) }
        else if (source.includes('facebook')) { setFacebook(true); Facebook(info); }
        else if (source.includes('Instagram')) { setInstagram(true) } //Instagram gives only a single file so no need of a seperate function
        else if (source.includes(ARP)) { setArp(true); Arp(info) } // Has only 2 streams High and Low Quality name will not be disclosed in the Source Code
        else if (source.includes(SAGO)) { setSago(true); Sago(info) } // Has Many high quality videos with audio embedded except some videos with certain format_id containing hls cant be downloaded
        else if (source.includes(SHWE)) { setShwe(true); Shwe(info) } // Has only 2 streams High and Low Quality name will not be disclosed in the Source Code
        else { setUnknown(true); Unknown(info) } // This will plainly render all the video streams 
        // For setting up formats and other stuffs before rendering
        setExt(info?.ext ?? '')
    }, [info])


    const Youtube = (info: FormatType) => {
        // Changing the format string
        var regExp = /\(([^)]+)\)/;
        var Localformat = regExp.exec(info.format);
        setFormat(Localformat !== null ? Localformat[1] : '');
        // Both Video and Audio
        if (info.vcodec !== "none" && info.acodec !== "none") {
            GiveTheFileSize();
            setColor("red")
            setVideo(true);
        }
        if (info.vcodec !== "none" && info.acodec === "none" && info.ext === "mp4") {
            GiveTheFileSize();
            setColor("pink")
            setVideo(true);
        }
    }
    const Facebook = (info: FormatType) => {
        // if(info.format_note != "DASH audio"){ This will show all the Video files both with or without embeded audio
        if (info.vcodec !== "none" && info.acodec !== "none") {
            // pPrettyPrint(info)
            setVideo(true);
            setColor("red")
            GiveTheFileSize();
            if (info.format_id == "dash_sd_src") {
                setFormat("SD Quality Video")
            }
            else if (info.format_id == "dash_hd_src") { setFormat("HD Quality Video") }
            else if (info.format_id.includes("sd_src_no_ratelimit")) { setFormat("SD High Quality Video") }
            else if (info.format_id.includes("hd_src_no_ratelimit")) { setFormat("HD High Quality Video") }
            else if (info.format_id.includes("sd")) { setFormat("SD Video") }
            else if (info.format_id.includes("hd")) { setFormat("HD Video") }
            else { setFormat(info.format) }
        } else if (info?.ext !== 'm4a') {
            setVideo(true)
            setColor("pink")
            GiveTheFileSize();
            setFormat(`${info?.height}X${info?.width}`)
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
            GiveTheFileSize()
        }
    }
    const Shwe = (info: FormatType) => {
        if (info.protocol == "https") {
            pPrettyPrint(info)
            GiveTheFileSize()
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
        setFilesize(bytesConverter(info.filesize ?? info.filesize_approx ?? 0));
    }
    return (filesize === '0 B') ? <></> : (youtube && video) ? (
        <Pressable
            style={[listStyles.Container]}
            onPress={() => {
                color == "red" ? CheckAndStart(info.url, info?.ext ?? '') : CheckAndStartVideoAndAudio(info.url, info?.ext ?? '')
            }}
        >
            <Text style={[listStyles.TheText, listStyles.format]}> {format ? format : 'Not Present'} </Text>
            <Text style={listStyles.TheText}> {ext}</Text>
            <Text style={listStyles.TheText}> {filesize ? filesize : 'Unknown'}</Text>
        </Pressable>
    ) :
        (facebook && video) ? (
            <Pressable
                style={[listStyles.Container]}
                onPress={() => {
                    color == "red" ? CheckAndStart(info.url, info?.ext ?? '') : CheckAndStartVideoAndAudio(info.url, info?.ext ?? '')
                }}
            >
                <Text style={[listStyles.TheText, listStyles.format]}> {format} </Text>
                <Text style={listStyles.TheText}> {info?.ext ?? ''}</Text>
                <Text style={listStyles.TheText}> {filesize == '0 B' ? 'Unknown' : filesize}</Text>
            </Pressable>
        ) :
            (instagram) ? (
                <Pressable
                    style={listStyles.Container}
                    onPress={() => { CheckAndStart(info.url, info?.ext ?? '') }}
                >
                    <Text style={[listStyles.TheText, listStyles.format]}> ({info.height} x {info.width}) Video </Text>
                    <Text style={listStyles.TheText}> {info?.ext ?? ''}</Text>
                </Pressable>
            ) :
                (arp && video) ? (
                    <Pressable
                        style={listStyles.Container}
                        onPress={() => { CheckAndStart(info.url, info?.ext ?? '') }}
                    >
                        <Text style={[listStyles.TheText, listStyles.format]}> {format} </Text>
                        <Text style={listStyles.TheText}> {info?.ext ?? ''} </Text>
                        <Text style={listStyles.TheText}> {filesize == '0 B' ? 'Unknown' : filesize}</Text>
                    </Pressable>
                ) :
                    (sago && video) ? (
                        <Pressable
                            style={listStyles.Container}
                            onPress={() => { CheckAndStart(info.url, info?.ext ?? '') }}
                        >
                            <Text style={[listStyles.TheText, listStyles.format]}> {format} </Text>
                            <Text style={listStyles.TheText}> {info?.ext ?? ''} </Text>
                            <Text style={listStyles.TheText}> {filesize == '0 B' ? 'Unknown' : filesize}</Text>
                        </Pressable>
                    ) : (shwe && video) ? (
                        <Pressable
                            style={listStyles.Container}
                            onPress={() => { CheckAndStart(info.url, info?.ext ?? '') }}
                        >
                            <Text style={[listStyles.TheText, listStyles.format]}> {format} </Text>
                            <Text style={listStyles.TheText}> {info?.ext ?? ''} </Text>
                            <Text style={listStyles.TheText}> {filesize == '0 B' ? 'Unknown' : filesize}</Text>
                        </Pressable>
                    ) :
                        (unknown && video) ? (
                            <Pressable
                                style={listStyles.Container}
                                onPress={() => { CheckAndStart(info.url, info?.ext ?? '') }}
                            >
                                <Text style={[listStyles.TheText, listStyles.format]}> {format} </Text>
                                <Text style={listStyles.TheText}> {info?.ext ?? ''} </Text>
                                <Text style={listStyles.TheText}> {bytesConverter(info.filesize ?? info.filesize_approx ?? 0)} </Text>
                            </Pressable>
                        ) : (<></>)
}

export default VideoListItem