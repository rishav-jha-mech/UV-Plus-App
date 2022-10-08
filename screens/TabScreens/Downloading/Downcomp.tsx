import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Circle } from 'react-native-progress';
import bytesConverter from '../../Scripts/bytesConverter';
import { kBlueColor, kDarkTextColor, kGreenColor, kRedColor } from '../../constants';
import OpenFile from '../../Scripts/OpenFile';
import RNFS, { stat } from 'react-native-fs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DownloadingParams } from '../../types';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useAppDispatch } from '../../hooks';
import { removeDownloading } from '../../REDUX/DownloadSilce';


type DownCompProp = {
    data: DownloadingParams
}

const Downcomp: React.FC<DownCompProp> = ({ data }) => {

    const { id, filename, fileSize, downSize, status, audioDownSize, audioFileSize } = data;
    const [progress, setProgress] = useState(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (downSize > 0) {
            setProgress((downSize / fileSize))
        }
    }, [downSize])
    const ext = filename.slice(filename.toString().lastIndexOf('.') + 1, filename.toString().length);
    return (
        <TouchableOpacity
            style={baby.Container}
            activeOpacity={status == 'Downloaded' ? 0.5 : 1}
            onPress={() => {
                status == 'Downloaded' ?
                    OpenFile(RNFS.DownloadDirectoryPath + `/UV Downloader/${filename}`, filename) : null;
            }}
        >
            <View>
                <Circle
                    size={60}
                    progress={progress}
                    color={
                        status == 'Downloading'
                            || status == 'Dowloading Video'
                            || status == 'Downloading Audio'
                            || status == 'Mergin Audio and Video' ? kBlueColor
                            : status == 'Downloaded' ? kGreenColor
                                : kRedColor
                    }
                    thickness={3}
                    showsText={true}
                    textStyle={{ fontSize: 14.0, fontWeight: '600' }}
                    strokeCap={"round"}
                />
            </View>
            <View style={baby.textContainer}>
                <Text style={[baby.bigText, { color: status == 'Error' ? kRedColor : kDarkTextColor }]} numberOfLines={1}>
                    {filename}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        {
                            status == 'Error' ?
                                <Text style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 12, color: kRedColor, fontWeight: '600' }}>Error Downloading</Text>
                                </Text>
                                :
                                <Text style={baby.smolText} numberOfLines={1}>
                                    {bytesConverter(downSize + (audioFileSize === undefined ? 0 : audioFileSize) )}/{bytesConverter(fileSize + (audioFileSize == undefined ? 0 : audioFileSize))} | {ext}
                                </Text>
                        }
                    </View>
                    {status == 'Downloading'
                        ? <Text style={{ fontSize: 12, color: kGreenColor, fontWeight: '600' }}>Downloading</Text> :
                        status == 'Downloaded' ?
                            <Text style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, color: kGreenColor, fontWeight: '600' }}>Completed</Text>
                            </Text>
                            : status == 'Error' ? <></> :
                                <Text style={{ fontSize: 12, color: kGreenColor, fontWeight: '600' }}>{status}</Text>
                    }
                </View>
            </View>
            {status == 'Error' ?
                <TouchableOpacity
                    style={baby.crossBtn}
                    onPress={() => dispatch(removeDownloading({ id: id }))}
                >
                    <FontAwesome5Icon name='times-circle' size={24} color={kRedColor} />
                </TouchableOpacity>
                : <></>}
        </TouchableOpacity>
    )

}

export default Downcomp

const baby = StyleSheet.create({
    Container: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 2.0,
        paddingVertical: 12.0,
        marginVertical: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        height: 90.0
    },
    textContainer: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10.0,
        paddingVertical: 2.0,
        justifyContent: 'space-between',
    },
    bigText: {
        color: '#333',
        fontWeight: '600'
    },
    smolText: {
        fontSize: 11.0,
        fontWeight: '600'
    },
    crossBtn: {
        padding: 10.0,
    }
});