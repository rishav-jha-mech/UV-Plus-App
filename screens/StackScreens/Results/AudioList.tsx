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
import { listStyles }  from './listStyles';

type AudioListType = {
    info: FormatType,
    source: string,
    title: string
}

type downloadingProps = StackNavigationProp<AppParamList, 'Downloading'>;


const AudioList: React.FC<AudioListType> = ({ info, source, title }) => {

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
    const [youtube, setYoutube] = useState(false)
    const [facebook, setFacebook] = useState(false)
    const [instagram, setInstagram] = useState(false)

    // Hooks for showing Audio only
    const [audio, setAudio] = useState(false)

    useEffect(() => {
        // Checking the source of the audio file
        if (source == 'youtube') { setYoutube(true); Youtube(info) }
        if (source == 'facebook') { setFacebook(true); Facebook(info) }
        if (source == 'Instagram') { setInstagram(true); }
        // For setting up formats and other stuffs before rendering
        setExt(info.ext)
    }, [info])


    const Youtube = (info: FormatType) => {
        // Changing the format string
        var regExp = /\(([^)]+)\)/;
        var Localformat = regExp.exec(info.format);
        setFormat(Localformat![1]);
        // Show Audio files only
        if (info.height == null) {
            setAudio(true);
            // Change file size from bytes to KB,MB,or GB
            setFilesize(bytesConverter(info.filesize));
        }
    }
    const Facebook = (info: FormatType) => {
        if (info.format_note == "DASH audio") {
            setAudio(true)
            setFormat("High Quality Audio")
        }
    }
    return (youtube && audio) ? (
        <Pressable
            style={listStyles.Container}
            onPress={() => { StartDownloading(info.url, info.ext) }}
        >
            <Text style={[listStyles.TheText, listStyles.format]}> {format ? format : 'Not Present'} </Text>
            <Text style={listStyles.TheText}> {ext}</Text>
            <Text style={listStyles.TheText}> {filesize ? filesize : 'undefined'}</Text>
        </Pressable>
    ) : (facebook && audio) ? (
        <Pressable
            style={listStyles.Container}
            onPress={() => { StartDownloading(info.url, info.ext) }}
        >
            <Text style={[listStyles.TheText, listStyles.format]}> {format} </Text>
            <Text style={listStyles.TheText}> {info.ext} </Text>
        </Pressable>
    ) : (instagram) ? (
        <Text style={listStyles.nf}>We Dont Do That Here</Text>
    ) : (<></>)
}

export default AudioList