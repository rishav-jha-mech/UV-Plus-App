import React from 'react'
import Video from 'react-native-video';
import { StyleSheet, Text, View } from 'react-native'

const VideoPlayer = ({ route }) => {

    const FILEPATH = route.params.url
    console.info(FILEPATH)
    return (

        <Video source={{ uri: FILEPATH }}   // Can be a URL or a local file.
            style={styles.backgroundVideo} />
    )
}

export default VideoPlayer

// Later on in your styles..
const styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});