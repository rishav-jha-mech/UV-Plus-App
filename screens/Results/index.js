import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import axios from 'axios'
import Loading from '../Components/Loading';
import AudioList from './AudioList';
import VideoList from './VideoList';
import timeConverter from '../Scripts/duration';
import ErrorWrongURl from '../Components/ErrorWrongURl';


const Results = ({ route }) => {
    const [thedata, setTheData] = useState([''])
    const [formats, setFormats] = useState([''])
    const [loading, setLoading] = useState(true)
    const [source, setSource] = useState()
    const [duration, setDuration] = useState(0)
    const [error, setError] = useState(true) // # Pessimism
    const { url } = route.params;
    const [present, setPresent] = useState(true)

    useEffect(() => {
        ReqData(url)
        setLoading(true)
    }, []);

    const ReqData = (url) => {
        axios.post('https://uv-plus.herokuapp.com/', {
            uri: url,
        })
            .then((res) => handleRes(res.data))
            .catch((error) => {
                console.log(error);
                setLoading(false);
                setError(true);
            });
    }
    const handleRes = (data) => {
        setTheData(data)
        setFormats(data.formats)
        setSource(data.source)
        setDuration(timeConverter(data.duration))
        setLoading(false)
        if (data.formats.length < 0) { setPresent(false) }
        setError(false)
    }
    return loading ? (
        <View style={styles.Container}>
            <Loading />
        </View>
    ) : (error) ? (
        <ErrorWrongURl />
    ) : (
        <View style={styles.Container}>
            <ScrollView>
                <Image style={styles.Thumbnail} source={{ uri: thedata.thumbnail }} resizeMode={'contain'} />
                <Text style={styles.Title} numberOfLines={3}>{thedata.title}</Text>
                <Text style={styles.DurationHead} numberOfLines={1}>Duration : {duration}</Text>
                <Text style={styles.Heading}>Audio Streams</Text>
                {present ?
                    <View>
                        <ScrollView>
                            <View style={styles.optContainer}>
                                <Text style={styles.optText}>Quality</Text>
                                <Text style={styles.optText}>Format</Text>
                                <Text style={styles.optText}>Size</Text>
                            </View>
                            {formats.map((data, index) => {
                                return (<AudioList title={thedata.title} source={source} key={index} info={data} />)

                            })}
                        </ScrollView>
                    </View>
                    : <Text style={styles.nf}>No audio files present</Text>}
                <Text style={styles.Heading}>Video Streams</Text>
                {present ?
                    <View>
                        <ScrollView>
                            <View style={styles.optContainer}>
                                <Text style={styles.optText}>Quality</Text>
                                <Text style={styles.optText}>Format</Text>
                                <Text style={styles.optText}>Size</Text>
                            </View>
                            {formats.map((data, index) => {
                                return (<VideoList title={thedata.title} source={source} key={index} info={data} />)
                            })}
                        </ScrollView>
                    </View>
                    : <Text style={styles.nf}>No video files present</Text>}
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
    Thumbnail: {
        width: '100%',
        minHeight: 220.0
    },
    Title: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 27.0,
        paddingHorizontal: 12.0,
        paddingVertical: 8.0,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.1)'
    },
    DurationHead: {
        fontSize: 18,
        fontWeight: '600',
        paddingHorizontal: 12.0,
        paddingVertical: 8.0,
        color: '#000'
    },
    Heading: {
        fontSize: 24,
        marginVertical: 4,
        paddingVertical: 16.0,
        fontWeight: '800',
        textAlign: 'center',
        backgroundColor: '#66f',
        color: '#fff',
    },
    ListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        marginVertical: 2,
        backgroundColor: '#ff56',
        alignItems: 'center'
    },
    nf: {
        color: '#fff',
        backgroundColor: 'orangered',
        textAlign: 'center',
        paddingVertical: 16,
        fontWeight: '700',
        fontSize: 18,
        textTransform: 'capitalise'
    },
    optContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8.0
    },
    optText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: '600',
        color: '#000'
    }
})
