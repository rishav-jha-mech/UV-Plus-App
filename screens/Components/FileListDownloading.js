import React,{ useState,useEffect } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import bytesConverter from '../Scripts/bytesConverter'
import TimeStampToDate from '../Scripts/TimeStampToDate';
import formatFormatter from '../Scripts/formatFormatter'

const FileListDownloading = (data) => { // By default it is sorted by recent old order
    
    // console.log(JSON.stringify(data,null,3))

    const [fileSize, setFileSize] = useState(0)
    const [date, setDate] = useState()
    const [filename, setFilename] = useState("")
    const [ext, setExt] = useState("")

    useEffect(() =>{
        setFileSize(bytesConverter(data.data.size))
        setDate(TimeStampToDate(data.data.lastModified))
        setFilename(formatFormatter(data.data.filename).FILENAME)  // Calling the function to give us the FIle Name
        setExt(formatFormatter(data.data.filename).EXTENSION)  // Calling the function to give us the FIle Extension

    },[])

    return (
        <View style={styles.Container}>
            <Image style={styles.Thumb} source={{uri: 'https://via.placeholder.com/120.png/ddf'}} resizeMode="contain" />
            <View style={styles.infoContainer}>
                <Text style={styles.Title} numberOfLines={2}>{filename}</Text>
                <Text style={styles.SubTitle} numberOfLines={1}>{fileSize}&nbsp;&nbsp;|&nbsp;&nbsp;{ext}&nbsp;&nbsp;|&nbsp;&nbsp;{date}</Text>
            </View>
            <TouchableOpacity style={styles.theButton}>
                <FontAwesomeIcon icon={faEllipsisV} size={18} />
            </TouchableOpacity>
        </View>
    )
}

export default FileListDownloading

const styles = StyleSheet.create({
    Container:{
        backgroundColor:'#ff56',
        flex:1,
        flexDirection:'row',
        // borderBottomColor:'blue',
        borderBottomWidth:1,
        minHeight: 90,
    },
    Thumb:{
        width:'25%',
        // backgroundColor:'aqua'
    },
    infoContainer:{
        // backgroundColor:'tomato',
        flex:1,
        justifyContent:'space-between',
        paddingVertical: 8,
        paddingHorizontal:6
    },
    Title:{
        fontSize: 14,
        lineHeight:21,
        color:'#000'
    },
    SubTitle:{
        fontSize:12
    },
    theButton:{
        width:'8%',
        // backgroundColor:'chartreuse',
        alignItems:'center',
        justifyContent:'center'
    }
})
