import React from 'react'
import { CardStateParams } from '../types'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Pressable, StyleSheet, Text } from 'react-native'

type modalCardProps = {
    cardState: CardStateParams
}

const Card:React.FC<modalCardProps> = ({cardState}) => {
    const {bg, text, iconName, fontColor} = cardState
    return (
        <Pressable style={[styles.Card,bg ? {backgroundColor: bg} : {}]}>
            <FontAwesome5Icon name={iconName} size={110} color={fontColor} />
            <Text style={[styles.Text,{color: fontColor}]}> {text} </Text>
        </Pressable>
    )
}

export default Card


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