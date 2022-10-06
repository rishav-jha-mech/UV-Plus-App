import React from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

type FileIconType = {
    ext: string,
    size: number
}

const FileIcon: React.FC<FileIconType> = ({ ext, size }) => {

    if (
        ext.includes('jpg') ||
        ext.includes('png') ||
        ext.includes('jpeg') ||     // IMAGE EXTENTIONS
        ext.includes('gif') ||
        ext.includes('webm')
    )
        return <FontAwesome5Icon name='file-image' size={size} color={'#ff156f'} />
    else if (

        ext.includes('mp4') ||
        ext.includes('mov') ||
        ext.includes('wmv') ||
        ext.includes('avi') ||     // VIDEO EXTENTIONS
        ext.includes('flv') ||
        ext.includes('mkv') ||
        ext.includes('webm')

    ) return <FontAwesome5Icon name='file-video' size={size} color={'dodgerblue'} />
    else if (
        ext.includes('m4a') ||
        ext.includes('mp3') ||
        ext.includes('wav') ||       // AUDIO EXTENTIONS
        ext.includes('wma') ||
        ext.includes('aac')
    ) return <FontAwesome5Icon name='file-audio' size={size} color={'#66f'} />
    else if (ext.includes('pdf'))      // PDF EXTENTION
        return <FontAwesome5Icon name='file-pdf' size={size} color={'red'} />
    else if (ext.includes('zip'))      // ZIP EXTENTION
        return <FontAwesome5Icon name='file-archive' size={size} color={'dodgerblue'} />
    else
        return <FeatherIcon name='file' size={size} color={'#b0b0b0'} />
}

export default FileIcon