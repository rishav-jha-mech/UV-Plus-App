import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisV, faFolder } from '@fortawesome/free-solid-svg-icons'
import bytesConverter from '../Scripts/bytesConverter'
import TimeStampToDate from '../Scripts/TimeStampToDate';
import formatFormatter from '../Scripts/formatFormatter'
import FileIcon from '../Components/FileIcon'
import OpenFile from '../Scripts/OpenFile';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable'
import deleteFile from '../Scripts/deleteFile'

const FileList = (data) => { // By default it is sorted by recent old order

    const { isFile, name, size, mtime } = data.data

    if (isFile()) {
        var ext = formatFormatter(name);
    }

    const fileSize = (bytesConverter(size))
    const date = (TimeStampToDate(mtime))

    return (isFile()) ? (

        <File name={name} fileSize={fileSize} date={date} ext={ext} path={data.data.path} reload={() => data.reload()} />
    ) : (
        <Directory name={name} fileSize={fileSize} date={date} path={data.data.path} SetThePath={(path) => data.setthepath(path)} SetTheLoading={(state) => data.settheloading(state)} />
    );
}

export default FileList

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#fcfafa',
        flex: 1,
        flexDirection: 'row',
        height: 74.0,
    },
    fileIcon: {
        paddingLeft: 18.0,
        paddingRight: 12.0,
        justifyContent: 'center',
        alignContent: 'center',
    },
    dataContainer: {
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
        paddingHorizontal: 14.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Modal: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    elipsi: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8.0,
        backgroundColor: '#f56'
    }
});

const File = (props) => {
    return (
        <TouchableOpacity style={styles.Container} onPress={() => OpenFile(props.path)}>
            <View style={styles.fileIcon}>
                <FileIcon size={40.0} ext={props.ext} />
            </View>
            <View style={styles.dataContainer}>
                <Text style={styles.Title} numberOfLines={1}>{props.name}</Text>
                <Text style={styles.SubTitle} numberOfLines={1}>{props.fileSize ? props.fileSize : 'Unknown'}&nbsp;&nbsp;|&nbsp;&nbsp;{props.ext ? props.ext : 'Unknown'}&nbsp;&nbsp;|&nbsp;&nbsp;{props.date ? props.date : 'Unknown'}</Text>
            </View>
            <Pressable
                style={styles.elipsi}
                onPress={() => {
                    deleteFile(props.path);
                    props.reload;
                }}
            >
                <FontAwesomeIcon icon={faEllipsisV} />
            </Pressable>
        </TouchableOpacity>
    );
}

const Directory = (props) => {

    return (
        <TouchableOpacity style={styles.Container}
            onPress={() => { props.SetThePath(props.path); props.SetTheLoading(true) }}
        >
            <View style={styles.fileIcon}>
                <FontAwesomeIcon icon={faFolder} size={40.0} color={'#fdb900'} />
            </View>
            <View style={styles.dataContainer}>
                <Text style={styles.Title} numberOfLines={1}>{props.name}</Text>
                <Text style={styles.SubTitle} numberOfLines={1}>Folder&nbsp;&nbsp;|&nbsp;&nbsp;{props.date ? props.date : 'Unknown'}</Text>
            </View>
        </TouchableOpacity>
    );
}