import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView,Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import Loading from './Components/Loading';
import AudioList from './Components/AudioList';
import VideoList from './Components/VideoList';


const Results = ({ route }) => {
    const [thedata, setTheData] = useState([''])
    const [formats, setFormats] = useState([''])
    const [loading, setLoading] = useState(true)
    const [source, setSource] = useState()
    const [error,setError] = useState(false)
    const navigation = useNavigation();
    const { url } = route.params;

    useEffect(() => {
        ReqData(url)
        setLoading(true)
      },[]);
      
    const ReqData = (url) => {
      axios.post('http://127.0.0.1:6969/', {
        uri: url,
    })
        .then((response) => handleRes(response.data))
        .catch(function (error) {
            console.log(error);
            setError(true)
        });
    }
    const handleRes = (data) =>{
        // console.log(data)
        setTheData(data)
        setFormats(data.formats)
        setSource(data.source)
        setLoading(false)
    }
    return (
        <View style={styles.Container}>
            {loading ?
                    <Loading />
            :
                <ScrollView>
                    <Text style={styles.Title} numberOfLines={2}> {thedata.title}</Text>
                    <Image style={styles.Thumbnail} source={{ uri: thedata.thumbnail }} resizeMode={'contain'} />

                    <Text style={styles.Heading}>Audio</Text>
                    <View>
                        <ScrollView>
                            {formats.map((data, index) => { // CalBack Function's second Param is the index
                                return (<AudioList source={source} key={index} info={data} />)

                            })}
                        </ScrollView></View>
                    <Text style={styles.Heading}>Video</Text>
                    <View>
                        <ScrollView>
                            {formats.map((data, index) => { // CalBack Function's second Param is the index
                                return (<VideoList source={source} key={index} info={data} />)
                            })}
                        </ScrollView></View>
                </ScrollView>
            }
        </View>
    )
}

export default Results

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor:'white',
    },

    Title: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#ff56',
        lineHeight: 27,
    },
    Thumbnail: {
        width: '100%',
        minHeight: 275,
        borderRadius: 6,
        marginVertical: 6,
    },
    Heading: {
        fontSize: 24,
        marginVertical: 4,
        paddingVertical:8,
        fontWeight: '800',
        textAlign: 'center',
        backgroundColor: 'lightblue'
    },
    ListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        marginVertical: 2,
        backgroundColor: '#ff56',
        alignItems: 'center'
    },
})
