import React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import AltDownFile from './Scripts/AltDownFile'
import downloadFile from './Scripts/downloadFile'

const Downloading = () => {

    const startDownloading = () =>{
        AltDownFile("Kuch Bhi bhai 😁","https://r4---sn-5aap5ojx-jj0z.googlevideo.com/videoplayback?expire=1635425581&ei=zUh6YfmIFYiBjuMP5sKd2Ag&ip=202.78.236.203&id=o-AE4c5CFtmgkAC0TVLsxr3se2w6tO314MAM-4i3RoOWgS&itag=22&source=youtube&requiressl=yes&mh=jT&mm=31%2C29&mn=sn-5aap5ojx-jj0z%2Csn-h5576nss&ms=au%2Crdu&mv=m&mvi=4&pl=24&initcwndbps=1091250&vprv=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=183.484&lmt=1628585667633828&mt=1635402537&fvip=4&fexp=24001373%2C24007246&c=ANDROID&txp=5511222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhANm3Dsj9GQadJaYoN1YThhp4Ibt6679jCtvHA__h9xuiAiBsDVQkE50JDGK8OZFqQ4P1QVy2SfiaGjY-cpGu3XgezQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgR2Aq9H1t_2cnVBE3-l6OVw1MTY3jdPXnIaQlAoPYqckCIQCC1BHC_a3ZDxY9WzOF_nPX0DXdtyrc7xyfMIkKqEg-pg%3D%3D"
        ,"mp4")
        alert("Download Started Check Notification Bar For Progress") // Looks Damn Cool
    }

    return (
        <View style={styles.Container}>
            <Button title="CLick Me !" style={{fontSize:25,fontWeight:'700'}} onPress={() => {startDownloading()}}></Button>
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