import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

const Rename = (data) => {

    return (
        <View style={styles.Container}>
            <Text style={styles.Title}>rename file</Text>
            <TextInput placeholder="Rename File" defaultValue={data.name} style={styles.Input} />
            <View style={styles.infoContainer}>
                <Text style={styles.SubTitle}>Ext :  .{data.ext}</Text>
                <Text style={styles.SubTitle}>File Size :  {data.size}</Text>
                <Text style={styles.SubTitle}>Last Modified :  {data.lastMod}</Text>
            </View>
            <View style={styles.ButtonContainer}>
                <TouchableOpacity style={styles.theButton}>
                    <Text style={styles.theButtonText}>Rename</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Rename

const styles = StyleSheet.create({
    Container:{
        backgroundColor:'#fff',
        elevation:10,
        borderRadius:16,
        height: 335,
        width:'75%',
        zIndex:15,
        paddingVertical:14,
        paddingHorizontal:20
    },
    Title:{
        fontSize:20,
        color:'#000',
        fontWeight:'700',
        marginVertical: 20,
        textTransform:'capitalize'
    },
    Input:{
        borderWidth: 0.5,
        borderColor:'#6f00ff',
        borderRadius: 6
    },
    SubTitle:{
        marginVertical:10,
        color:'#000',
        fontWeight:'600'
    },
    infoContainer:{
        paddingVertical:12
    },
    ButtonContainer:{
        alignItems:'flex-end'
    },
    theButton:{
        backgroundColor:'#6f00ff',
        paddingHorizontal:16,
        paddingVertical:9,
        borderRadius: 5
    },
    theButtonText:{
        color:'#fff',
        fontSize:16,
        fontWeight:'700',
        letterSpacing: 0.5
    }
})