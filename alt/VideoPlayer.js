import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import Video from "react-native-video";
import Slider from "rn-range-slider";
import { useNavigation } from '@react-navigation/native';
import Label from './Components/Slider/Label'
import Notch from './Components/Slider/Notch'
import Rail from './Components/Slider/Rail'
import RailSelected from './Components/Slider/RailSelected'
import Thumb from './Components/Slider/Thumb'
import { identifier } from "@babel/types";


const noop = () => { };
const VideoPlayer = ({ route }) => {

    const FILEPATH = route.params.url
    const FILENAME = route.params.name
    const FILESIZE = route.params.size
    const navigation = useNavigation();
    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [togCheckBar, setTogCheckBar] = useState(false)
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [paused, setPaused] = useState(false);
    const [low, setLow] = useState(0)
    // const [playerState, setPlayerState] = useState(PLAYING);
    const renderThumb = useCallback(() => <Thumb />, []);
    const renderRail = useCallback(() => <Rail />, []);
    const renderRailSelected = useCallback(() => <RailSelected />, []);
    const renderLabel = useCallback(value => <Label text={value} />, []);
    const renderNotch = useCallback(() => <Notch />, []);

    const VideoInfo = (data) => {
        // console.log(JSON.stringify(data, null, 5))
        setDuration(Math.floor(data.duration))
    }
    const setTheSeekTime = useCallback((low) => {

        if (togCheckBar) {
            setCurrentTime(low);
            onSeek(low, 0)
        }else{
            console.log("abhie Nahi")
        }
    }, []);

    const handleValueChange = useCallback((low) => {
        if (togCheckBar === true) {
            setCurrentTime(low);
            onSeeking(low)
            console.log(` Time is Set To ${low}`)
        } else {
            // console.log("Kuch Bhi Nahi Hua Low ka value => ",low)
            // console.log(togCheckBar)
        }
    }, []);

    const onSeek = (seek) => {
        videoPlayer?.current.seek(seek);
    };


    const onProgress = (data) => {
        // console.log(JSON.stringify(data,null,5))
        setCurrentTime(Math.round(data.currentTime))
    };

    const onSeeking = (currentTime) => setCurrentTime(currentTime);

    return (
        <Pressable style={styles.Container} >
            <View style={styles.TitleBar}>
                <Text style={styles.Name} numberOfLines={2}>{FILENAME}</Text>
            </View>
            <Video
                onLoad={VideoInfo}
                onProgress={onProgress}
                ref={(ref) => (videoPlayer.current = ref)}
                resizeMode="contain"
                source={{
                    uri: FILEPATH,
                }}
                repeat
                fullscreen={isFullScreen}
                style={styles.backgroundVideo}
                volume={0.25}
            />
            <View style={bottomTabBar.Container}>
                <View style={bottomTabBar.durationNumContainer}>
                    <Text style={bottomTabBar.durationNum}>{currentTime}</Text>
                    <Text style={bottomTabBar.durationNum}>{duration}</Text>
                </View>
                <View style={bottomTabBar.TimeBarContainer}>
                    <Slider
                        min={0}
                        max={28}
                        low={currentTime}
                        step={1}
                        style={styles.slider}
                        disableRange={true}
                        renderThumb={renderThumb}
                        renderRail={renderRail}
                        renderRailSelected={renderRailSelected}
                        renderLabel={renderLabel}
                        renderNotch={renderNotch}
                        onTouchStart={() => { setTogCheckBar(!togCheckBar); console.log("Touch Start") }}
                        // onTouchEnd={(low) => {setTheSeekTime(low);console.log("Touch Ended at ",low)}}
                        onValueChanged={(low) => { setTheSeekTime(low) }}
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
        paddingHorizontal: 18
    },
    toolbar: {
        position: "absolute",
        padding: 15,
        backgroundColor: '#ddd',
        bottom: 0,
    },
});