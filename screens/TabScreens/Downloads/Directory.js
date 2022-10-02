import React from 'react'
import { TouchableOpacity, Text, View, Pressable } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

const Directory = (props) => {
    const { SetThePath, name, date, path } = props;

    return (
        <TouchableOpacity style={styles.Container}
            onPress={() => SetThePath(path)}
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