import React, { useState, useCallback } from 'react'
import Video, { FilterType } from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Pressable, View, Text } from 'react-native'
import Slider from 'rn-range-slider';
const VideoPlayer = ({ route }) => {

    const FILEPATH = route.params.url
    const FILENAME = route.params.name
    const FILESIZE = route.params.size
    const navigation = useNavigation();

    // const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);
    const handleValueChange = useCallback((low, high) => {
        setLow(low);
        setHigh(high);
    }, []);

    const [show, setshow] = useState(false)

    return (
        <Pressable style={styles.Container} onPress={() => { setshow(!show) }} >

            {show ?
                <View style={styles.TitleBar}>
                    <Text style={styles.Name} numberOfLines={2}>{FILENAME}</Text>
                </View>
                : <></>}

            <Video source={{ uri: FILEPATH }}   // Can be a URL or a local file.
                style={styles.backgroundVideo}
                fullscreen={true}
                resizeMode={'contain'}
                // resizeMode={'cover'}
                // resizeMode={'stretch'}
                repeat={true}
            // muted={true} 
            />
            <View style={bottomTabBar.Container}>
                <View style={bottomTabBar.durationNumContainer}>
                    <Text style={bottomTabBar.durationNum}>0:00</Text>
                    <Text style={bottomTabBar.durationNum}>69:69</Text>
                </View>
                <View style={bottomTabBar.TimeBarContainer}>
                    <Slider
                        style={styles.slider}
                        min={0}
                        max={100}
                        step={1}
                        floatingLabel
                        renderRail={renderRail}
                        renderRailSelected={renderRailSelected}
                        renderLabel={renderLabel}
                        renderNotch={renderNotch}
                        onValueChanged={handleValueChange}
                    />
                </View>
            </View>

        </Pressable>
    )
}

export default VideoPlayer

const bottomTabBar = StyleSheet.create({
    Container: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#rgba(250,250,250,0.5)',
        height: '20%'
    },
    durationNumContainer: {
        backgroundColor: 'black',
        paddingHorizontal: 14,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    durationNum: {
        color: 'chartreuse',
        fontSize: 13,
        letterSpacing: 1
    },
    TimeBarContainer: {
        padding: 8,
        backgroundColor: 'red'
    }
})
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    backgroundVideo: {
        flex: 1,
        // aspectRatio: 2/1,
    },
    TitleBar: {
        zIndex: 1,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.6)',
        top: 0,
        right: 0,
        left: 0,
    },
    Name: {
        color: '#fff',
        backgroundColor: 'rgba(255,255,255,0.15)',
        flex: 1,
        paddingHorizontal: 4,
        lineHeight: 28,
        fontSize: 18,
        textAlignVertical: 'center',
        textAlign: 'center',
        minHeight: 50,
        paddingVertical: 25,
        paddingHorizontal: 15
    },
});