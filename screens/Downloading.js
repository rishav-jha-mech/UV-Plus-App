import React, {useState,useEffect} from 'react'
import { StyleSheet, View, Button, Text } from 'react-native'
import AltDownFile from './Scripts/AltDownFile'
import * as Progress from 'react-native-progress';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Downloading = () => {

    const [percent, setPercent] = useState(0)
    const [complete,setComplete] = useState(false)
    
    useEffect(() => {
        setTimeout(() => {(percent <= 1 && percent >=0)?setPercent(percent+0.01):{};(percent>=1)?setComplete(true):{}}, 25);
    }, [percent])
    const startDownloading = () =>{
        AltDownFile("Kuch Bhi😁","https://r4---sn-5aap5ojx-jj0z.googlevideo.com/videoplayback?expire=1635425581&ei=zUh6YfmIFYiBjuMP5sKd2Ag&ip=202.78.236.203&id=o-AE4c5CFtmgkAC0TVLsxr3se2w6tO314MAM-4i3RoOWgS&itag=22&source=youtube&requiressl=yes&mh=jT&mm=31%2C29&mn=sn-5aap5ojx-jj0z%2Csn-h5576nss&ms=au%2Crdu&mv=m&mvi=4&pl=24&initcwndbps=1091250&vprv=1&mime=video%2Fmp4&cnr=14&ratebypass=yes&dur=183.484&lmt=1628585667633828&mt=1635402537&fvip=4&fexp=24001373%2C24007246&c=ANDROID&txp=5511222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhANm3Dsj9GQadJaYoN1YThhp4Ibt6679jCtvHA__h9xuiAiBsDVQkE50JDGK8OZFqQ4P1QVy2SfiaGjY-cpGu3XgezQ%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgR2Aq9H1t_2cnVBE3-l6OVw1MTY3jdPXnIaQlAoPYqckCIQCC1BHC_a3ZDxY9WzOF_nPX0DXdtyrc7xyfMIkKqEg-pg%3D%3D"
        ,"mp4")
        alert("Download Started Check Notification Bar For Progress") // Looks Damn Cool
    }

    return (
        <View style={styles.Container}>
            
            <Progress.Circle progress={percent} strokeCap={'round'} thickness={6} showsText={true} size={175} style={{marginVertical:80}} textStyle={{fontWeight:'700'}} />
            {complete
            ? 
            <Text style={{fontSize:50,fontWeight:'600',color:'#007bff',textAlignVertical:'center'}}>Completed <FontAwesomeIcon icon={faCheckCircle} color="#007bff" size={35} /></Text>
            :
            <Text style={{fontSize:50,fontWeight:'600',color:'#007bff',textAlignVertical:'center'}}>Loading ...</Text>
            }
            {/* <Button title="CLick Me !" style={{fontSize:25,fontWeight:'700'}} onPress={() => {startDownloading()}}></Button> */}


        </View>
    )
}

export default Downloading

const styles = StyleSheet.create({
    Container:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center'
    },
})

/*
1. Step one download animation showing (0% to 100%)
2. The files will be displayed in a flat list or ScrollView => Object.map(<View></View>)
3. The files will have an id ofc 
    first we need to read the files
    then each file will have 
        an id
        filename => of two lines max
        filesize
        foramat
        date downloaded
        status = ['downloaded','downloading']
        an options button 
            to rename the file
            to delete the file
            to share the file
4. On clicking the file (Audio/Video) it will be opened in the App itself
5. the file having the downloading status will have a hook  recieved / total 

    here recieved will be updated everytime its changed
6. Last but not the least the files will be sorted in a manner that the file which is being downloaded will sray on top

Lets Start Coding ! 🥶🥶🥶🥶🥶
*/