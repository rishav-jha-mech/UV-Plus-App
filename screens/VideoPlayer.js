import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Pressable, Dimensions } from "react-native";
import Video from "react-native-video";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCompress, faCompressAlt, faCompressArrowsAlt, faExchangeAlt, faExpand, faExpandAlt, faExpandArrowsAlt, faLock, faLockOpen } from "@fortawesome/free-solid-svg-icons";

const VideoPlayer = ({ route }) => {

    const FILEPATH = route.params.url
    const FILENAME = route.params.name
    const FILESIZE = route.params.size
    const navigation = useNavigation();

    const VideoInfo = (data) => {
        console.log(JSON.stringify(data, null, 5))
        setDuration(Math.floor(data.duration))
    }
    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
    const [message,setMessage] = useState("")

    const onSeek = (seek) => {
        videoPlayer?.current.seek(seek);
    };

    const onPaused = (playerState) => {
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer?.current.seek(0);
    };

    const onProgress = (data) => {
        // Video Player will continue progress even if the video already ended
        if (!isLoading) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoad = (data) => {
        setDuration(data.duration);
        setIsLoading(false);
    };

    const onSeeking = (currentTime) => setCurrentTime(currentTime);

    return (
        <View style={styles.Container}>
            <Text style={styles.Message}>{message}</Text>
            <Video
                onLoad={onLoad}
                onProgress={onProgress}
                paused={paused}
                ref={(ref) => (videoPlayer.current = ref)}
                resizeMode="contain"
                source={{
                    uri: FILEPATH,
                }}
                repeat
                volume={0.6}
                fullscreen={isFullScreen}
                style={styles.backgroundVideo}
            />
            <MediaControls
                style={{ backgroundColor: '#ff1', zIndex: 5 }}
                duration={duration}
                isLoading={isLoading}
                mainColor="#6f00ff"
                onPaused={onPaused}
                onReplay={onReplay}
                onSeek={onSeek}
                onSeeking={onSeeking}
                playerState={playerState}
                progress={currentTime}
            >
                <MediaControls.Toolbar>
                    <View style={styles.Cont}>
                        <Text style={styles.Title} numberOfLines={2} >{FILENAME}</Text>
                        <View style={styles.Toolbar}>
                            <Pressable style={styles.Button} >
                                <FontAwesomeIcon icon={faExpandArrowsAlt} size={24} color={"#fff"} />
                            </Pressable>
                            <Pressable style={styles.Button} onPress={() => {setIsFullScreen(!isFullScreen);isFullScreen ? setMessage("Full Screen Disabled") : setMessage("Full Screen") }}>
                                <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand } size={24} color={"#fff"} />
                            </Pressable>
                        </View>
                    </View>
                </MediaControls.Toolbar>
            </MediaControls>
        </View>

    )
}

export default VideoPlayer

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
    },
    backgroundVideo: {
        flex: 1,
        // aspectRatio: 2/1,
    },
    Cont: {
        flex: 1,
    },
    Title: {
        color: '#fff',
        lineHeight: 32,
        fontSize: 18,
        textAlignVertical: 'center',
        textAlign: 'center',
        // backgroundColor:'#6f00ff',
        paddingVertical: 8,
    },
    Toolbar: {
        position: "absolute",
        bottom: 0,
        top: '130%',
        right: 0,
        height: '80%',
        marginRight: -19,
    },
    Button: {
        padding: 8,
        backgroundColor: '#6f00ff',
        marginVertical:10

    },
    Message:{
        backgroundColor:'#rgba(0,0,0,0.5)',
        top:'15%',
        zIndex:1,
        textAlign:'center',
        color:'#fff',
        textShadowRadius:5,
        fontSize:18,
        letterSpacing:1
    }
});
