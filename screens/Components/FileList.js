import React,{ useState,useEffect } from 'react'
import { Image, Pressable, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import bytesConverter from '../Scripts/bytesConverter'
import TimeStampToDate from '../Scripts/TimeStampToDate';
import formatFormatter from '../Scripts/formatFormatter'
import { useNavigation } from '@react-navigation/native';
import Option from './OptionComponent/Option'

const FileList = (data) => { // By default it is sorted by recent old order

    const navigation = useNavigation();
    // console.log(JSON.stringify(data,null,3))

    const [fileSize, setFileSize] = useState(0)
    const [date, setDate] = useState(0)
    const [filename, setFilename] = useState("")
    const [ext, setExt] = useState("")
    const [showmodal, setShowModal] = useState(false)

    useEffect(() =>{
        try{
        setFileSize(bytesConverter(data.data.size))
        setDate(TimeStampToDate(data.data.lastModified)) //last modified time
        setFilename(formatFormatter(data.data.filename).FILENAME)  // Calling the function to give us the FIle Name
        setExt(formatFormatter(data.data.filename).EXTENSION)  // Calling the function to give us the FIle Extension
        }catch{error => 
            console.log(error)
        }
    },[])

    const ViewVideo = () =>{
        navigation.navigate("Video",{
            url: (data.data.path),
            name : filename,
            size: fileSize,
        })
    }

    return (
        <Pressable style={styles.Container} onPress={ViewVideo}>
            <Image style={styles.Thumb} source={{uri: 'https://via.placeholder.com/120.png/ddf'}} resizeMode="contain" />
            <View style={styles.dataContainer}>
                <Text style={styles.Title} numberOfLines={2}>{filename}</Text>
                <Text style={styles.SubTitle} numberOfLines={1}>{fileSize}&nbsp;&nbsp;|&nbsp;&nbsp;{ext}&nbsp;&nbsp;|&nbsp;&nbsp;{date}</Text>
            </View>
            <TouchableOpacity style={styles.theButton} onPress={() => setShowModal(!showmodal)}>
                <FontAwesomeIcon icon={faEllipsisV} size={18} />
            </TouchableOpacity>

            <Modal visible={showmodal} transparent={true} animationType={"fade"}>
                <Pressable style={styles.Modal} onPress={() => setShowModal(!showmodal)}>

                    <Option 
                        filename={filename}
                        path={data.data.path}
                        ext={ext}
                        last_mod={date}
                        size={fileSize}
                    />

                </Pressable>
            </Modal>
        </Pressable>
    )
}

export default FileList

const styles = StyleSheet.create({
    Container:{
        backgroundColor:'#ff56',
        flex:1,
        flexDirection:'row',
        // borderBottomColor:'blue',
        borderBottomWidth:1,
        minHeight: 100,
    },
    Thumb:{
        width:'25%',
        // backgroundColor:'aqua'
    },
    dataContainer:{
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
        width:'12%',
        backgroundColor:'chartreuse',
        alignItems:'center',
        justifyContent:'center'
    },
    Modal:{
        backgroundColor: 'rgba(0,0,0,0.05)',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
})


/*
1. I have to do string manipulation here
*/