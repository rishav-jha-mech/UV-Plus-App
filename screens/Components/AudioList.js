import React,{ useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const AudioList = ( { info } ) => {

    const [stream, setStream] = useState(0)
    const [filesize, setFilesize] = useState(0)
    const [url, setUrl] = useState()
    const [format, setFormat] = useState()
    const [ext, setExt] = useState()

    useEffect(() => {
        // For setting up formats and other stuffs before rendering
        setStream(info.res)
        setUrl(info.url)
        setFilesize(info.filesize)
        setExt(info.ext)

        var regExp = /\(([^)]+)\)/;
        var Localformat = regExp.exec(info.format);
        setFormat(Localformat[1])
    }, [info])

    return (
        <View style={styles.Container}>
            <Text style={[styles.TheText,styles.format]}> {format} </Text>
            <Text style={styles.TheText}> {ext}</Text>
            <Text style={styles.TheText}> {filesize ? filesize : 'undefined'}</Text>
        </View>
    )
}

export default AudioList

const styles = StyleSheet.create({
    Container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    TheText:{
        flex:1,
        marginVertical: 3,
        backgroundColor:"#ff56",
        textAlign:'center',
        paddingHorizontal:12,
        paddingVertical:12,
    },
    format:{
        textTransform:'capitalize',
        textAlign:'left'
    }
})
