import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { Circle } from 'react-native-progress';
import bytesConverter from '../Scripts/bytesConverter';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faCheckCircle, faCheckDouble, faCheckSquare, faExclamationTriangle, faTicketAlt } from '@fortawesome/free-solid-svg-icons';

const Downcomp = (props) => {

    const { id, filename, fileSize, downSize, status } = props.data
    const [progress, setProgress] = useState(0);

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
                    color={
                        status == 0 ? 'dodgerblue'
                            : status == 1 ? 'green'
                                : 'red'
                    }
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
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={baby.smolText} numberOfLines={1}>
                        {bytesConverter(downSize)}/{bytesConverter(fileSize)}
                    </Text>
                    {status == 0
                        ? <Text>Downloading</Text> :
                        status == 1 ?
                            <Text style={{ justifyContent: 'center' }}>
                                <FontAwesomeIcon icon={faCheckCircle} color={'green'} />
                                Completed
                            </Text>
                            :
                            <Text>
                                <FontAwesomeIcon icon={faExclamationTriangle} color={'red'} />
                                Error Downloading
                            </Text>
                    }
                </View>
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
    },

});