import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFileAlt, faFileAudio, faFileImage, faFilePdf, faFileVideo, faFolder } from '@fortawesome/free-solid-svg-icons'

const FileIcon = (props) => {
    const EXT = props.ext;
    if (
        EXT.includes('jpg') ||
        EXT.includes('png') ||
        EXT.includes('jpeg') ||     // IMAGE EXTENTIONS
        EXT.includes('gif') ||
        EXT.includes('webm')
    )
        return <FontAwesomeIcon icon={faFileImage} size={props.size} color={'#ff156f'} />
    else if (

        EXT.includes('mp4') ||
        EXT.includes('mov') ||
        EXT.includes('wmv') ||
        EXT.includes('avi') ||     // VIDEO EXTENTIONS
        EXT.includes('flv') ||
        EXT.includes('mkv') ||
        EXT.includes('webm')

    ) return <FontAwesomeIcon icon={faFileVideo} size={props.size} color={'dodgerblue'} />
    else if (
        EXT.includes('m4a') ||
        EXT.includes('mp3') ||
        EXT.includes('wav') ||       // AUDIO EXTENTIONS
        EXT.includes('wma') ||
        EXT.includes('aac')
    ) return <FontAwesomeIcon icon={faFileAudio} size={props.size} color={'#66f'} />
    else if (EXT.includes('pdf'))      // PDF EXTENTION
        return <FontAwesomeIcon icon={faFilePdf} size={props.size} color={'red'} />
    else
        return <FontAwesomeIcon icon={faFileAlt} size={props.size} color={'#b0b0b0'} />
}

export default FileIcon