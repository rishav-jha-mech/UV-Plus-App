import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'

const Info = (data) => {

    // We have to use pressable container over here otherwise on clicking the card modal will close
    return (
        <Pressable style={styles.Container}>
            <Text style={styles.Title}>Info</Text>
            <Text style={styles.SubTitle}>File Name :  <Text style={styles.Details}>{data.name}</Text></Text>
            <Text style={styles.SubTitle}>Ext :  <Text style={styles.Details}>.{data.ext}</Text></Text>
            <Text style={styles.SubTitle}>File Size :  <Text style={styles.Details}>{data.size}</Text></Text>
            <Text style={styles.SubTitle}>Last Modified :  <Text style={styles.Details}>{data.lastMod}</Text></Text>
        </Pressable>
    )
}

export default Info

const styles = StyleSheet.create({
    Container:{
        backgroundColor:'#fff',
        elevation:10,
        borderRadius:16,
        minWidth:'75%',
        maxWidth:'80%',
        minHeight:'40%',
        zIndex:15,
        paddingVertical:10,
        paddingHorizontal:16
    },
    Title:{
        fontSize:28,
        color:'#000',
        fontWeight:'700',
        marginVertical: 15,
        textTransform:'capitalize',
        letterSpacing:1
    },
    SubTitle:{
        marginVertical:10,
        color:'#6f00ff',
        fontWeight:'800'
    },
    Details:{
        lineHeight:22,
        color:'black',
        fontWeight:'700'
    }
})