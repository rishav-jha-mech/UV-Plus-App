import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const Success = () => {
    return (
        <Pressable style={styles.Card}>
            <FontAwesomeIcon icon={faCheckCircle} size={110} color={'#4bb543'} />
            <Text style={styles.Text}> Successfully Copied the link </Text>
        </Pressable>
    )
}

export default Success


const styles = StyleSheet.create({
    Card: {
        backgroundColor: '#fff',
        minHeight: '30%',
        minWidth: '65%',
        borderRadius: 16,
        elevation: 8,
        padding: 16,
        justifyContent:'center',
        alignItems:'center'
    },
    Text:{
        color:'#4bb543',
        fontWeight:'700',
        fontSize: 20,
        letterSpacing:0.6,
        marginTop: '8%'
    }

})