import React from 'react'
import { StyleSheet, Text, View, Image, Button, PermissionsAndroid, Platform } from 'react-native'

const Downloading = () => {

    return (
        <View style={styles.Container}>
            <Text style={{fontSize:25,fontWeight:'700'}}>Comming Soon 🙂</Text>
        </View>
    )
}

export default Downloading

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'#f5f6',
        justifyContent:'center',
        alignItems:'center'
    },
})