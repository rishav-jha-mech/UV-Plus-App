import React from 'react'
import { TouchableOpacity, Text, View, Pressable } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import RNFS from 'react-native-fs';
import TimeStampToDate from '../../Scripts/TimeStampToDate';

type DirectoryType = {
    data: RNFS.ReadDirItem,
    setPath: Function,
    setShowModal: Function,
    setModalText: Function
}


const Directory: React.FC<DirectoryType> = ({ data, setPath }) => {

    const { name, mtime, path } = data;
    const date = (TimeStampToDate(mtime))

    return (
        <TouchableOpacity style={styles.Container}
            onPress={() => setPath(path)}
        >
            <View style={styles.fileIcon}>
                <IonIcon name='ios-folder' size={30.0} color={'#fdb900'} />
            </View>
            <View style={styles.dataContainer}>
                <Text style={styles.Title} numberOfLines={1}>{name}</Text>
                <Text style={styles.SubTitle} numberOfLines={1}>Folder&nbsp;&nbsp;|&nbsp;&nbsp;{date ? date : 'Unknown'}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Directory