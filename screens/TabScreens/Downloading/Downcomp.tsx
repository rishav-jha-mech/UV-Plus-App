import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Circle } from 'react-native-progress';
import bytesConverter from '../../Scripts/bytesConverter';
import { kBlueColor, kGreenColor, kRedColor } from '../../constants';
import OpenFile from '../../Scripts/OpenFile';
import RNFS from 'react-native-fs';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DownloadingParams } from '../../types';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { useAppDispatch } from '../../hooks';
import { removeDownloading } from '../../REDUX/DownloadSilce';


type DownCompProp = {
    data: DownloadingParams
}

const Downcomp: React.FC<DownCompProp> = ({ data }) => {

    const { id, filename, fileSize, downSize, status } = data;
    const [progress, setProgress] = useState(0);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (downSize > 0) {
            setProgress((downSize / fileSize))
        }
    }, [downSize])
    const ext = filename.toString().slice(filename.toString().lastIndexOf('.') + 1, filename.toString().length);
    return (
        <TouchableOpacity
            style={baby.Container}
            activeOpacity={status == 1 ? 0.5 : 1}
            onPress={() => {
                status == 1 ?
                    OpenFile(RNFS.DownloadDirectoryPath + `/UV Downloader/${filename}`, filename) : null;
            }}
        >
            <View>
                <Circle
                    size={60}
                    progress={progress}
                    color={
                        status == 0 ? kBlueColor
                            : status == 1 ? kGreenColor
                                : kRedColor
                    }
                    thickness={3}
                    showsText={true}
                    textStyle={{ fontSize: 14.0, fontWeight: '600' }}
                    strokeCap={"round"}
                />
            </View>
            <View style={baby.textContainer}>
                <Text style={baby.bigText} numberOfLines={1}>
                    {filename}
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        {
                            status == -1 ?
                                <Text style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 12, color: kRedColor, fontWeight: '600' }}>Error Downloading</Text>
                                </Text>
                                :
                                <Text style={baby.smolText} numberOfLines={1}>
                                    {bytesConverter(downSize)}/{bytesConverter(fileSize)} | {ext}
                                </Text>
                        }
                    </View>
                    {status == 0
                        ? <Text style={{ fontSize: 12, color: kGreenColor, fontWeight: '600' }}>Downloading</Text> :
                        status == 1 ?
                            <Text style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 12, color: kGreenColor, fontWeight: '600' }}>Completed</Text>
                            </Text>
                            : <></>
                    }
                </View>
            </View>
            {status == -1 ?
                <TouchableOpacity
                    style={baby.crossBtn}
                    onPress={() => dispatch(removeDownloading({ id: id }))}
                >
                    <FontAwesome5Icon name='times-circle' size={24} color={'#333'} />
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