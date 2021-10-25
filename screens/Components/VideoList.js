import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const VideoList = ( { info } ) => {


    return (
        <Text style={styles.TheText}> info.ext </Text>
    )
}

export default VideoList

const styles = StyleSheet.create({
    TheText:{
        fontSize:16,
        backgroundColor:'white',
        marginVertical:5
    }
})
