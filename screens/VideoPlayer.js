import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from "react-native";
import Video from "react-native-video";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExpand , faCompress , faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons";

const VideoPlayer = ({ route }) => {

    const FILEPATH = route.params.url
    const FILENAME = route.params.name
    const videoPlayer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
    const [message,setMessage] = useState("")
    const [resizeMode, setResizeMode] = useState("contain")
    const [click, setClick] = useState(0)

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

    const SendMessage = (message) =>{
        setMessage(message)
        setTimeout(() => {
            setMessage("")
        }, 2000);
    }

    const VideoArr = ['cover','stretch','contain']
    const ChangeVideoSize = () =>{
        setClick(click+1)
        if (click >=0 && click <=2){SendMessage(VideoArr[click]);setResizeMode(VideoArr[click])}
        else{setClick(1);SendMessage(VideoArr[0]);setResizeMode(VideoArr[0])}
    }

    return (
        <View style={styles.Container}>
            <Text style={styles.Message}>{message}</Text>
            <Video
                onLoad={onLoad}
                onProgress={onProgress}
                paused={paused}
                ref={(ref) => (videoPlayer.current = ref)}
                resizeMode={resizeMode}
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
                            <TouchableOpacity style={styles.Button} onPress={() => {ChangeVideoSize();}}>
                                <FontAwesomeIcon icon={faExpandArrowsAlt} size={24} color={"#fff"} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.Button} onPress={() => {setIsFullScreen(!isFullScreen);isFullScreen ? SendMessage("Full Screen Disabled") : SendMessage("Full Screen") }}>
                                <FontAwesomeIcon icon={isFullScreen ? faCompress : faExpand } size={24} color={"#fff"} />
                            </TouchableOpacity>
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
        top: '110%',
        right: 0,
        height: '80%',
        marginRight: -19,
    },
    Button: {
        padding: 12,
        backgroundColor: '#6f00ff',
        marginVertical:16
    },
    Message:{
        // backgroundColor:'#rgba(0,0,0,0.5)',
        top:'20%',
        zIndex:1,
        textAlign:'center',
        color:'#fff',
        textShadowRadius:5,
        fontSize:16,
        letterSpacing:1,
        textTransform:"capitalize",
        position:'absolute',
        width:'100%'
    }
});
