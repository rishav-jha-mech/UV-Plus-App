import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import axios from 'axios'
import Loading from './Components/Loading';
import AudioList from './Components/AudioList';
import VideoList from './Components/VideoList';
import timeConverter from './Scripts/timeConverter';

const Results = ({ route }) => {
    const [thedata, setTheData] = useState([''])
    const [formats, setFormats] = useState([''])
    const [loading, setLoading] = useState(true)
    const [source, setSource] = useState()
    const [duration, setDuration] = useState(0)
    const [error, setError] = useState(true) // # Pessimism
    const { url } = route.params;
    const [present,setPresent] = useState(true)

    useEffect(() => {
        ReqData(url)
        setLoading(true)
    }, []);

    const ReqData = (url) => {
        axios.post('http://127.0.0.1:6969/', {
            uri: url,
        })
            .then((response) => handleRes(response.data))
            .catch((error) => {
                console.log(error)
                setLoading(false)
                setError(true)
            });
    }
    const handleRes = (data) => {
        setTheData(data)
        setFormats(data.formats)
        setSource(data.source)
        setDuration(timeConverter(data.duration))
        setLoading(false)
        if (data.formats.length < 0){setPresent(false)}
        setError(false)
    }
    return loading ?(
        <View style={styles.Container}>
                <Loading />
        </View>
    )   : (error) ? (
        <View style={styles.Container}>
            <Text>Error Occured</Text>
        </View>
    ) : (
        <View style={styles.Container}>
                <ScrollView>
                    <Text style={styles.Title} numberOfLines={2}> {thedata.title}</Text>
                    <Image style={styles.Thumbnail} source={{ uri: thedata.thumbnail }} resizeMode={'contain'} />
                    <Text style={styles.DuraContainer}> <Text style={styles.DurationHead}>Duration :</Text> {duration}</Text>
                    <Text style={styles.Heading}>Audio</Text>
                    {present ?
                    <View>
                        <ScrollView>
                            {formats.map((data, index) => { // CalBack Function's second Param is the index
                                return (<AudioList title={thedata.title} source={source} key={index} info={data} />)

                            })}
                        </ScrollView>
                    </View>
                    :<Text style={styles.nf}>No audio files present</Text>}
                    <Text style={styles.Heading}>Video</Text>
                    {present ?
                    <View>
                        <ScrollView>
                            {formats.map((data, index) => { // CalBack Function's second Param is the index
                                return (<VideoList title={thedata.title} source={source} key={index} info={data} />)
                            })}
                        </ScrollView>
                    </View>
                    :<Text style={styles.nf}>No video files present</Text>}
                </ScrollView>
            
        </View>
    )
}

export default Results

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: 'white',
    },

    Title: {
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: '#ff56',
        lineHeight: 27,
    },
    Thumbnail: {
        width: '100%',
        minHeight: 275,
        marginVertical: 6,
    },
    Heading: {
        fontSize: 24,
        marginVertical: 4,
        paddingVertical: 8,
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
    DuraContainer: {
        paddingVertical: 16,
        backgroundColor: 'violet',
        paddingHorizontal: 12,
        color: 'white',
        fontSize: 18
    },
    DurationHead: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: 1
    },
    nf: {
        color: '#fff',
        backgroundColor: 'orangered',
        textAlign: 'center',
        paddingVertical: 16,
        fontWeight: '700',
        fontSize:18,
        textTransform:'capitalise'
    }
})
