import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FileIcon from '../../Components/FileIcon';
import OpenFile from '../../Scripts/OpenFile';
import styles from './styles';

type FileIconCardProps = {
    index: number,
    DOWNLOAD_PATH: string,
    ext: string,
    filename: string,
}
const FileIconCard:React.FC<FileIconCardProps> = ({index, DOWNLOAD_PATH, ext, filename}) => {
    return (
        <TouchableOpacity
            key={index}
            activeOpacity={0.85}
            style={styles.card}
            onPress={() => OpenFile(DOWNLOAD_PATH)}
        >
            <View style={styles.iconContainer}>
                <FileIcon ext={ext} size={50.0} />
            </View>
            <Text
                numberOfLines={2}
                style={styles.cardFileName}
            >
                {filename}
            </Text>
        </TouchableOpacity>
    );
}

export default FileIconCard;