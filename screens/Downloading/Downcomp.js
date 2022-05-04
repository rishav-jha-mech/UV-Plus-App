import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { Circle } from 'react-native-progress';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { AppContext } from '../CONTEXT';
import bytesConverter from '../Scripts/bytesConverter';

const Downcomp = (props) => {

    const { id, filename, fileSize, downSize } = props.data
    const [progress, setProgress] = useState(0);
    const { dispatchDownloadEvent } = useContext(AppContext);

    useEffect(() => {
        if (downSize > 0) {
            setProgress((downSize / fileSize))
        }
    }, [downSize])

    return (
        <Pressable style={baby.Container}>
            <View style={baby.CircleContainer}>
                <Circle
                    size={60}
                    progress={progress}
                    color={'dodgerblue'}
                    endAngle={1.0}
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
                <Text style={baby.smolText} numberOfLines={1}>
                    {bytesConverter(downSize)}/{bytesConverter(fileSize)}
                </Text>
            </View>
        </Pressable>
    )

}

export default Downcomp

const baby = StyleSheet.create({
    Container: {
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
    CircleContainer: {

    },
    textContainer: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 10.0,
        paddingVertical: 2.0,
        justifyContent: 'space-between'
    },
    bigText: {
        color: '#333'
    },
    smolText: {
        fontSize: 12.0
    }
});