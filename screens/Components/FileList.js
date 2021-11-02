import React,{ useState,useEffect } from 'react'
import { Image, Pressable, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEllipsisV, faInfo, faInfoCircle, faPen, faShareAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import bytesConverter from '../Scripts/bytesConverter'
import TimeStampToDate from '../Scripts/TimeStampToDate';
import formatFormatter from '../Scripts/formatFormatter'
import { useNavigation } from '@react-navigation/native';


const FileList = (data) => { // By default it is sorted by recent old order

    const navigation = useNavigation();
    // console.log(JSON.stringify(data,null,3))

    const [fileSize, setFileSize] = useState(0)
    const [date, setDate] = useState(0)
    const [filename, setFilename] = useState("")
    const [ext, setExt] = useState("")
    const [showmodal, setShowModal] = useState(false)

    useEffect(() =>{
        try{
        setFileSize(bytesConverter(data.data.size))
        setDate(TimeStampToDate(data.data.lastModified)) //last modified time
        setFilename(formatFormatter(data.data.filename).FILENAME)  // Calling the function to give us the FIle Name
        setExt(formatFormatter(data.data.filename).EXTENSION)  // Calling the function to give us the FIle Extension
        }catch{error => 
            console.log(error)
        }
    },[])

    const ViewVideo = () =>{
        navigation.navigate("Video",{
            url: (data.data.path),
            name : filename,
            size: fileSize,
        })
    }

    return (
        <Pressable style={styles.Container} onPress={ViewVideo}>
            <Image style={styles.Thumb} source={{uri: 'https://via.placeholder.com/120.png/ddf'}} resizeMode="contain" />
            <View style={styles.dataContainer}>
                <Text style={styles.Title} numberOfLines={2}>{filename}</Text>
                <Text style={styles.SubTitle} numberOfLines={1}>{fileSize}&nbsp;&nbsp;|&nbsp;&nbsp;{ext}&nbsp;&nbsp;|&nbsp;&nbsp;{date}</Text>
            </View>
            <TouchableOpacity style={styles.theButton} onPress={() => setShowModal(!showmodal)}>
                <FontAwesomeIcon icon={faEllipsisV} size={18} />
            </TouchableOpacity>

            <Modal visible={showmodal} transparent={true} animationType={"fade"}>
                <Pressable style={styles.Modal} onPress={() => setShowModal(!showmodal)}>
                    <View style={styles.Option}>
                        <TouchableOpacity style={styles.OptionBtn}>
                            <View style={styles.font}>
                                <FontAwesomeIcon icon={faPen} size={16} color={'#555'} />
                            </View>
                            <Text style={styles.OptionTxt}> Rename</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.OptionBtn}>
                            <View style={styles.font}>
                                <FontAwesomeIcon icon={faTrashAlt} size={16} color={'#555'} />
                            </View>
                            <Text style={styles.OptionTxt}> Delete</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.OptionBtn}>
                            <View style={styles.font}>
                                <FontAwesomeIcon icon={faShareAlt} size={16} color={'#555'} />
                            </View>
                            <Text style={styles.OptionTxt}> Share</Text>
                        </TouchableOpacity>

                        
                        <TouchableOpacity style={styles.OptionBtn}>
                            <View style={styles.font}>
                                <FontAwesomeIcon icon={faInfoCircle} size={16} color={'#555'} />
                            </View>
                            <Text style={styles.OptionTxt}> Info</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </Pressable>
    )
}

export default FileList

const styles = StyleSheet.create({
    Container:{
        backgroundColor:'#ff56',
        flex:1,
        flexDirection:'row',
        // borderBottomColor:'blue',
        borderBottomWidth:1,
        minHeight: 100,
    },
    Thumb:{
        width:'25%',
        // backgroundColor:'aqua'
    },
    dataContainer:{
        // backgroundColor:'tomato',
        flex:1,
        justifyContent:'space-between',
        paddingVertical: 8,
        paddingHorizontal:6
    },
    Title:{
        fontSize: 14,
        lineHeight:21,
        color:'#000'
    },
    SubTitle:{
        fontSize:12
    },
    theButton:{
        width:'12%',
        backgroundColor:'chartreuse',
        alignItems:'center',
        justifyContent:'center'
    },
    Modal:{
        backgroundColor: 'rgba(0,0,0,0.05)',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
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


/*
1. I have to do string manipulation here
*/