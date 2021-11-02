import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

// Icon will be imported at the parent component only
// Remeber we have to send the icon as a object not as a string
// Or we will get an error

// There is a reasobn why <></> tags are used instead of <View></View> i.e. Design.

const OptionList = (props) => {
    return (
        <> 
            <View style={List.font}>
                <FontAwesomeIcon icon={props.icon} size={22} color={'#555'} />
            </View>
            <Text style={List.OptionTxt}> {props.title} </Text>
        </>
    )
}

export default OptionList

const List = StyleSheet.create({
    OptionBtn: {
        marginVertical: 5,
        paddingHorizontal: 8,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    OptionTxt: {
        color: '#555',
        fontWeight: '700',
        fontSize: 26,
        letterSpacing: 1,
        flex: 6
    },
    font: {
        flex: 1,
    }
})