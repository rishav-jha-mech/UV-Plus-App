import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

/* This will have 4 params 
    1. Card Color default white                     => bg
    2. Font                                         => font
    3. Text                                         => text
    4. Font & Text Color (Same colour for both)     => foteco
    Here only no 2, Font will be passed as an object from the parent component.
*/

const Success = (props) => {

    return (
        <Pressable style={[styles.Card,(props.bg) ? {backgroundColor:props.bg} : {}]}>
            <FontAwesomeIcon icon={props.font} size={110} color={props.foteco} />
            <Text style={[styles.Text,{color: props.foteco}]}> {props.text} </Text>
        </Pressable>
    )
}

export default Success


const styles = StyleSheet.create({
    Card: {
        minHeight: '30%',
        minWidth: '65%',
        borderRadius: 16,
        elevation: 8,
        padding: 16,
        justifyContent:'center',
        alignItems:'center'
    },
    Text:{
        fontWeight:'700',
        fontSize: 20,
        letterSpacing:0.6,
        marginTop: '8%'
    }

})