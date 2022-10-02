import React from 'react'
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const FileIcon = (props) => {
    const EXT = props.ext;
    if (
        EXT.includes('jpg') ||
        EXT.includes('png') ||
        EXT.includes('jpeg') ||     // IMAGE EXTENTIONS
        EXT.includes('gif') ||
        EXT.includes('webm')
    )
        return <FontAwesome5Icon name='file-image' size={props.size} color={'#ff156f'} />
    else if (

        EXT.includes('mp4') ||
        EXT.includes('mov') ||
        EXT.includes('wmv') ||
        EXT.includes('avi') ||     // VIDEO EXTENTIONS
        EXT.includes('flv') ||
        EXT.includes('mkv') ||
        EXT.includes('webm')

    ) return <FontAwesome5Icon name='file-video' size={props.size} color={'dodgerblue'} />
    else if (
        EXT.includes('m4a') ||
        EXT.includes('mp3') ||
        EXT.includes('wav') ||       // AUDIO EXTENTIONS
        EXT.includes('wma') ||
        EXT.includes('aac')
    ) return <FontAwesome5Icon name='file-audio' size={props.size} color={'#66f'} />
    else if (EXT.includes('pdf'))      // PDF EXTENTION
        return <FontAwesome5Icon name='file-pdf' size={props.size} color={'red'} />
    else if (EXT.includes('zip'))      // ZIP EXTENTION
        return <FontAwesome5Icon name='file-archive' size={props.size} color={'dodgerblue'} />
    else
        return <FeatherIcon name='file' size={props.size} color={'#b0b0b0'} />
}

export default FileIcon