import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FileIcon from '../../Components/FileIcon';
import OpenFile from '../../Scripts/OpenFile';
import styles from './styles';
import RNFS from 'react-native-fs';
import formatFormatter from '../../Scripts/formatFormatter';

type FileIconCardProps = {
    data: RNFS.ReadDirItem
}
const FileIconCard: React.FC<FileIconCardProps> = ({ data }) => {
    const { name, path } = data;
    const ext = formatFormatter(name);

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            style={styles.card}
            onPress={() => OpenFile(path, name)}
        >
            <View style={styles.iconContainer}>
                <FileIcon ext={ext} size={50.0} />
            </View>
            <Text
                numberOfLines={2}
                style={styles.cardFileName}
            >
                {name}
            </Text>
        </TouchableOpacity>
    );
}

export default FileIconCard;