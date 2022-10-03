import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FileIcon from '../../Components/FileIcon';
import OpenFile from '../../Scripts/OpenFile';
import styles from './styles';
import RNFS from 'react-native-fs';
import formatFormatter from '../../Scripts/formatFormatter';
import { CreateThumbnail } from '../../Scripts/Thumbnail';
import { Thumbnail } from 'react-native-create-thumbnail';
import { pLog, pPrettyPrint } from '../../constants';

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


const VideoThumbCard: React.FC<FileIconCardProps> = ({ data }) => {
    const { name, path } = data;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [thumbPath, setThumbPath] = useState<string>('');

    useEffect(() => {
        // pPrettyPrint({ name, path });
        CreateThumbnail(path).then((res: Thumbnail) => {
            // pPrettyPrint(res);
            setThumbPath(`${res.path}`);
            setLoading(false);
        }).catch(() => {
            setLoading(false);
            setError(true);
        })
    }, [])


    const ext = formatFormatter(name);

    return (<>

        {error ? <></> :
            <TouchableOpacity
                activeOpacity={0.85}
                style={loading ? styles.card : videoStyles.card}
                onPress={() => OpenFile(path, name)}
            >
                {loading ?
                    <>
                        <View style={styles.iconContainer}>
                            <FileIcon ext={ext} size={50.0} />
                        </View>
                        <Text
                            numberOfLines={2}
                            style={styles.cardFileName}
                        >
                            {name}
                        </Text>
                    </>
                    : <Image source={{ uri: thumbPath }} style={videoStyles.thumb} />}
            </TouchableOpacity>
        }
    </>);
}

const videoStyles = StyleSheet.create({
    card: {
        height: 150,
        width: 140,
        backgroundColor: '#fff',
        marginHorizontal: 8.0,
        marginVertical: 20.0,
        elevation: 4.0,
        borderRadius: 6.0,
        overflow: 'hidden'
    },
    thumb: {
        height: '100%',
    }
})

export { FileIconCard, VideoThumbCard };