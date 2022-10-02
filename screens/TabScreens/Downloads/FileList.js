import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Pressable } from 'react-native'
import bytesConverter from '../../Scripts/bytesConverter'
import TimeStampToDate from '../../Scripts/TimeStampToDate';
import formatFormatter from '../../Scripts/formatFormatter'
import OpenFile from '../../Scripts/OpenFile';
import FileIcon from '../../Components/FileIcon'
import { kBlueColor, kRedColor } from '../../constants'
import deleteFileDialog from '../../Components/deleteFileDialog'
import IonIcon from 'react-native-vector-icons/Ionicons';

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
        <Directory name={name} fileSize={fileSize} date={date} path={data.data.path} reload={() => data.reload()} SetThePath={(path) => data.setthepath(path)} />
    );
}

export default FileList

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#fcfafa',
        flex: 1,
        flexDirection: 'row',
        height: 95.0,
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
    },
    dropdown: {
        backgroundColor: '#fff',
        elevation: 5,
        position: 'absolute',
        bottom: 6.0,
        right: 36.0,
        borderRadius: 6.0,
        paddingVertical: 4.0,
        minWidth: 140.0
    },
    dropdownbtn: {
        paddingVertical: 10.0,
        paddingHorizontal: 10.0,
    },
    iconContainer: {
        paddingRight: 6.0,
    }
});

const File = (props) => {
    const { path, ext, reload, fileSize, date, name } = props;
    const [showOptions, setShowOptions] = useState(false);
    return (
        <View style={{ overflow: 'visible' }}>
            <TouchableOpacity
                style={styles.Container}
                activeOpacity={0.75}
                onPress={() => {
                    showOptions ? setShowOptions(!showOptions) :
                        OpenFile(path)
                }}>
                <View style={styles.fileIcon}>
                    <FileIcon size={40.0} ext={ext} />
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.Title} numberOfLines={2}>{name}</Text>
                    <Text style={styles.SubTitle} numberOfLines={1}>{fileSize ? fileSize : 'Unknown'}&nbsp;&nbsp;|&nbsp;&nbsp;{ext ? ext : 'Unknown'}&nbsp;&nbsp;|&nbsp;&nbsp;{date ? date : 'Unknown'}</Text>
                </View>
                <Pressable
                    style={styles.elipsi}
                    onPress={() => {
                        setShowOptions(!showOptions);
                    }}
                >
                    <IonIcon name='ellipsis-vertical' color={'#666'} size={20} />
                </Pressable>
            </TouchableOpacity>
            {showOptions ?
                <View style={styles.dropdown}>
                    <TouchableOpacity
                        style={styles.dropdownbtn}
                        activeOpacity={0.65}
                        onPress={() => {
                            deleteFileDialog({name: name,path: path,reload: reload});
                        }
                        }
                    >
                        <Text>
                            <View style={styles.iconContainer}>
                                <IonIcon name='trash-outline' size={12} color={kRedColor} />
                            </View>
                            Delete File
                        </Text>
                    </TouchableOpacity>
                </View>
                : <></>}
        </View>
    );
}

const Directory = (props) => {
    const { SetThePath, name, date, path } = props;

    return (
        <TouchableOpacity style={styles.Container}
            onPress={() => SetThePath(path)}
        >
            <View style={styles.fileIcon}>
                <IonIcon name='ios-folder-outline' size={30.0} color={'#fdb900'} />
            </View>
            <View style={styles.dataContainer}>
                <Text style={styles.Title} numberOfLines={1}>{name}</Text>
                <Text style={styles.SubTitle} numberOfLines={1}>Folder&nbsp;&nbsp;|&nbsp;&nbsp;{date ? date : 'Unknown'}</Text>
            </View>
        </TouchableOpacity>
    );
}