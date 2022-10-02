import React, { useState } from 'react'
import { TouchableOpacity, Text, View, Pressable } from 'react-native'
import OpenFile from '../../Scripts/OpenFile';
import FileIcon from '../../Components/FileIcon'
import { kDarkTextColor, kRedColor } from '../../constants'
import deleteFileDialog from '../../Components/deleteFileDialog'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import RNFS from 'react-native-fs';
import TimeStampToDate from '../../Scripts/TimeStampToDate';
import bytesConverter from '../../Scripts/bytesConverter';
import formatFormatter from '../../Scripts/formatFormatter';

type FileType = {
    data: RNFS.ReadDirItem,
    reload: Function,
    setShowModal: Function,
    setModalText: Function,
}

const File: React.FC<FileType> = ({ data, reload, setModalText, setShowModal }) => {

    const { path, name, mtime, size } = data;

    const ext = formatFormatter(name);
    const fileSize = (bytesConverter(size))
    const date = (TimeStampToDate(mtime))

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
                            deleteFileDialog(name, path, reload, setShowModal, setModalText);
                        }
                        }
                    >
                        <View style={styles.iconContainer}>
                            <IonIcon name='trash-outline' size={20} color={kRedColor} />
                        </View>
                        <Text style={{color: kDarkTextColor}}>
                            Delete File
                        </Text>
                    </TouchableOpacity>
                </View>
                : <></>}
        </View>
    );
}

export default File