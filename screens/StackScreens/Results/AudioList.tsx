import React, { useState, useEffect, useContext } from 'react';
import { Text, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import bytesConverter from '../../Scripts/bytesConverter';
import RNFS from 'react-native-fs';
import { AppContext } from '../../context';
import { useAppDispatch } from '../../hooks';
import { startDownloading } from '../../REDUX/DownloadSilce';
import { FormatType } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppParamList } from '../../NAVIGATION';
import { listStyles } from './listStyles';
import CheckAndStartDownloading from '../../Scripts/checkAndStartDownload';
import { pLog, pPrettyPrint } from '../../constants';

type AudioListType = {
    info: FormatType,
    source: string,
    title: string,
    bestAudio?: FormatType,
    setBestAudio: Function
}

type downloadingProps = StackNavigationProp<AppParamList, 'Downloading'>;


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
    const [unknown, setUnknown] = useState<boolean>(false)

    // Hooks for showing Audio only
    const [audio, setAudio] = useState(false)

    useEffect(() => {
        // Checking the source of the audio file
        if (source == 'youtube') { setYoutube(true); Youtube(info) }
        else if (source == 'facebook') { setFacebook(true); Facebook(info) }
        else if (source == 'Instagram') { setInstagram(true); }
        else { setUnknown(true); Unknown(info); }
        // For setting up formats and other stuffs before rendering
        setExt(info.ext)
    }, [info])


    const Youtube = (info: FormatType) => {
        // Changing the format string
        var regExp = /\(([^)]+)\)/;
        var Localformat = regExp.exec(info.format);
        setFormat(Localformat![1]);
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
            setFilesize(bytesConverter(info.filesize));
        }
    }
    const Facebook = (info: FormatType) => {
        if (info.format_note == "DASH audio") {
            setAudio(true)
            setFormat("High Quality Audio")
        }
    }
    const Unknown = (info: FormatType) => {
        setAudio(true)
        setFormat("Unknown")
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
    ) : (<></>)
}

export default AudioList