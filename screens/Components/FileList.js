import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import bytesConverter from '../Scripts/bytesConverter'
import TimeStampToDate from '../Scripts/TimeStampToDate';
import formatFormatter from '../Scripts/formatFormatter'
import { useNavigation } from '@react-navigation/native';
import Option from './OptionComponent/Option'

const FileList = (data) => { // By default it is sorted by recent old order

    const navigation = useNavigation();
    // console.log(JSON.stringify(data,null,3))

    const [showmodal, setShowModal] = useState(false)
    if (data.data.type == "file") {
        var filename = (formatFormatter(data.data.filename)).FILENAME
        var fileSize = data.data.size
        var date = data.data.lastModified
        var ext = (formatFormatter(data.data.filename)).EXTENSION;
    }else if (data.data.type == "directory"){
        var filename = (data.data.filename)
        var fileSize = data.data.size
        var date = data.data.lastModified
    }
    // console.log(JSON.stringify(data.data, null, 4))

    fileSize = (bytesConverter(data.data.size))
    date = (TimeStampToDate(data.data.lastModified))

    const ViewVideo = () => {
        navigation.navigate("Video", {
            url: (data.data.path),
            name: filename,
            size: fileSize,
        })
    }
    return (data.data.type == "file") ? ( //Render only when the type is file cuz this is file list for the directories part seperate list will be mde
        <Pressable style={styles.FileContainer} onPress={ViewVideo}>
            <Image style={styles.Thumb} source={{ uri: 'https://via.placeholder.com/120.png/ddf' }} resizeMode="contain" />
            <View style={styles.dataContainer}>
                <Text style={styles.Title} numberOfLines={2}>{filename}</Text>
                <Text style={styles.SubTitle} numberOfLines={1}>{fileSize ? fileSize : 'Unknown'}&nbsp;&nbsp;|&nbsp;&nbsp;{ext ? ext : 'Unknown'}&nbsp;&nbsp;|&nbsp;&nbsp;{date ? date : 'Unknown'}</Text>
            </View>
            <TouchableOpacity style={styles.theButton} onPress={() => setShowModal(!showmodal)}>
                <FontAwesomeIcon icon={faInfoCircle} size={20} color={'#6f00ff'} />
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
    ) : (
        <Pressable style={styles.DirectoryContainer} 
            onPress={() => {data.setthepath(data.data.path);console.log("File Is Clicked")}}
            >
            <Image style={styles.Thumb} source={{ uri: 'https://via.placeholder.com/120.png/6f00ff' }} resizeMode="contain" />
            <View style={styles.dataContainer}>
                <Text style={styles.Title} numberOfLines={1}>{filename}</Text>
                <Text style={styles.SubTitle} numberOfLines={1}>{fileSize ? fileSize : 'Unknown'}&nbsp;&nbsp;|&nbsp;&nbsp;Folder&nbsp;&nbsp;|&nbsp;&nbsp;{date ? date : 'Unknown'}</Text>
            </View>
            <TouchableOpacity style={styles.theButton} onPress={() => setShowModal(!showmodal)}>
                <FontAwesomeIcon icon={faInfoCircle} size={20} color={'#6f00ff'} />
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
    FileContainer: {
        backgroundColor: '#ff56',
        flex: 1,
        flexDirection: 'row',
        // borderBottomColor:'blue',
        borderBottomWidth: 1,
        minHeight: 100,
    },
    Thumb: {
        width: '25%',
        // backgroundColor:'aqua'
    },
    dataContainer: {
        // backgroundColor:'tomato',
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 6
    },
    Title: {
        fontSize: 14,
        lineHeight: 21,
        color: '#000'
    },
    SubTitle: {
        fontSize: 12
    },
    theButton: {
        width: '12%',
        backgroundColor: 'chartreuse',
        alignItems: 'center',
        justifyContent: 'center'
    },
    Modal: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    DirectoryContainer:{
        backgroundColor: '#f5f6',
        flex: 1,
        flexDirection: 'row',
        // borderBottomColor:'blue',
        borderBottomWidth: 1,
        minHeight: 100,
    }
})


/*
1. I have to do string manipulation here
*/