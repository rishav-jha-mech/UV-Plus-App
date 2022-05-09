import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { kPrimaryColor } from '../constants'

const ErrorWrongURl = () => {
    return (
        <View style={styles.Container}>
            <View style={styles.Card}>
                <Text style={styles.Text}>Wrong URL Entered</Text>
                <Text style={styles.Text}>Or Try Checking </Text>
                <Text style={styles.Text}>Your Internet Connection</Text>
            </View>
        </View>
    )
}

export default ErrorWrongURl

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor: kPrimaryColor,
        justifyContent:'center',
        alignItems:'center'
    },
    Card:{
        backgroundColor:'#fff',
        elevation: 10,
        borderRadius:16,
        padding: 25,
        minWidth:'75%',
        minHeight:'20%'
    },
    Text:{
        textAlign:'center',
        fontSize:24,
        letterSpacing:0.8,
        fontWeight:'800',
        lineHeight:40,
        color:'#000'
    }
})
