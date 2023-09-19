import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Pressable, Text } from 'react-native';
import { AppParamList } from '../../NAVIGATION';
import bytesConverter from '../../Scripts/bytesConverter';
import CheckAndStartDownloading from '../../Scripts/checkAndStartDownload';
import { pPrettyPrint } from '../../constants';
import { SAGO } from '../../env';
import { useAppDispatch } from '../../hooks';
import { FormatType } from '../../types';
import { listStyles } from './listStyles';

type AudioListType = {
    info: FormatType,
    source: string,
    title: string,
    bestAudio?: FormatType,
    setBestAudio: Function
}

type downloadingProps = NativeStackNavigationProp<AppParamList, 'Downloading'>;


const AudioList: React.FC<AudioListType> = ({ info, source, title, bestAudio, setBestAudio }) => {

    const navigation = useNavigation<downloadingProps>();
    const dispatch = useAppDispatch();
    const CheckAndStart = (url: string, ext: string) => CheckAndStartDownloading(title, ext, url, dispatch, navigation);

    const [filesize, setFilesize] = useState<string>('')
    const [format, setFormat] = useState<string>('')
    const [ext, setExt] = useState<string>('')

    // Hooks for checking the platform
    const [youtube, setYoutube] = useState<boolean>(false)
    const [facebook, setFacebook] = useState<boolean>(false)
    const [instagram, setInstagram] = useState<boolean>(false)
    const [sago, setSago] = useState<boolean>(false)

    const [unknown, setUnknown] = useState<boolean>(false)

    // Hooks for showing Audio only
    const [audio, setAudio] = useState(false)

    useEffect(() => {
        // Checking the source of the audio file
        if (source == 'youtube') { setYoutube(true); Youtube(info) }
        else if (source == 'facebook') { setFacebook(true); Facebook(info) }
        else if (source == 'Instagram') { setInstagram(true); }
        else if (source.includes(SAGO)) { setSago(true); Sago(info) }
        else { setUnknown(true); Unknown(info); }
        // For setting up formats and other stuffs before rendering
        setExt(info.ext)
    }, [info])


    const Youtube = (info: FormatType) => {
        // Changing the format string
        var regExp = /\(([^)]+)\)/;
        var Localformat = regExp.exec(info.format);
        GiveTheFileSize()
        setFormat(Localformat !== null ? Localformat[1] : '');
        // Show Audio files only
        if (info.height == null && info.ext !== 'webm') {
            // pPrettyPrint(info)
            // Set audio then check if it is the best audio and repeat the process
            if (bestAudio?.filesize !== null || bestAudio?.filesize !== undefined) {
                // pLog('bestAudio.filesize is not null or undefined')
                // pLog('bestAudio.filesize: ' + bestAudio?.filesize)
                if (info.filesize > bestAudio!.filesize) {
                    setBestAudio(info)
                }
            }

            setAudio(true);
            setFilesize(bytesConverter(info.filesize ?? info.filesize_approx));
        }
    }
    const Facebook = (info: FormatType) => {
        if (info.format_note == "DASH audio") {
            setAudio(true)
            GiveTheFileSize()
            setBestAudio(info)
            setFormat("High Quality Audio")
        }
    }
    const Sago = (info: FormatType) => {
        if (info.acodec !== "none") {
            pPrettyPrint(info)
            setFormat("High Quality Audio")
            setAudio(true)
            GiveTheFileSize()
        }
    }
    const Unknown = (info: FormatType) => {
        setAudio(true)
        setFormat("Unknown")
    }

    const GiveTheFileSize = (): void => {
        setFilesize(bytesConverter(info.filesize ?? info.filesize_approx ?? 0));
    }
    return (youtube && audio) ? (
        <Pressable
            style={listStyles.Container}
            onPress={() => { CheckAndStart(info.url, info.ext) }}
        >
            <Text style={[listStyles.TheText, listStyles.format]}> {format ? format : 'Not Present'} </Text>
            <Text style={listStyles.TheText}> {ext}</Text>
            <Text style={listStyles.TheText}> {filesize ? filesize : 'Unknown'}</Text>
        </Pressable>
    ) : (facebook && audio) ? (
        <Pressable
            style={listStyles.Container}
            onPress={() => { CheckAndStart(info.url, info.ext) }}
        >
            <Text style={[listStyles.TheText, listStyles.format]}> {format} </Text>
            <Text style={listStyles.TheText}> {info.ext} </Text>
            <Text style={listStyles.TheText}> {filesize ? filesize : 'Unknown'}</Text>
        </Pressable>
    ) : (instagram) ? (
        <Text style={listStyles.nf}>We Dont Do That Here</Text>
    ) : (sago && audio) ? (
        <Pressable
            style={listStyles.Container}
            onPress={() => { CheckAndStart(info.url, info.ext) }}
        >
            <Text style={[listStyles.TheText, listStyles.format]}> {format} </Text>
            <Text style={listStyles.TheText}> {info.ext} </Text>
            <Text style={listStyles.TheText}> {filesize ? filesize : 'Unknown'}</Text>
        </Pressable>
    ) : (<></>)
}

export default AudioList