import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { faInfoCircle, faPen, faShareAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import OptionList from './OptionList'

const Option = (data) => {
    return (
        <View style={styles.Option}>

            <TouchableOpacity style={styles.OptionBtn}>
                <OptionList icon={faPen} title="Rename" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.OptionBtn}>
                <OptionList icon={faTrashAlt} title="Delete" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.OptionBtn}>
                <OptionList icon={faShareAlt} title="Share" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.OptionBtn}>
                <OptionList icon={faInfoCircle} title="Info" />
            </TouchableOpacity>

        </View>
    )
}
export default Option

const styles = StyleSheet.create({
    Option:{
        backgroundColor:'#fff',
        justifyContent:'space-between',
        zIndex:10,
        padding:12,
        paddingHorizontal:16,
        elevation:10,
        borderRadius:4,
        width:'55%',
        height:'30%'
    },
    OptionBtn:{
        marginVertical:5,
        paddingHorizontal:8,
        paddingVertical:8,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
})

const List = StyleSheet.create({
    OptionTxt:{
        color:'#555',
        fontWeight:'700',
        fontSize:18,
        letterSpacing: 1,
        flex:6
    },
    font:{
        flex:1,
    }
})