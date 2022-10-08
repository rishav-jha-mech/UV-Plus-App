import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground } from 'react-native'
import axios from 'axios'
import Loading from '../../Components/Loading';
import AudioList from './AudioList';
import VideoList from './VideoList';
import ErrorWrongURl from '../../Components/ErrorWrongURl';
import { RouteProp, useRoute } from '@react-navigation/native';
import { AppParamList } from '../../NAVIGATION';
import { kPrimaryColor, pLog, pPrettyPrint, SCREEN_HEIGHT } from '../../constants';
import { formatTime } from '../../Scripts/timeFormatter';
import { FormatType, YTDLP_Options } from '../../types';
import bytesConverter from '../../Scripts/bytesConverter';


const Results = () => {

    const route = useRoute<RouteProp<AppParamList, 'ResultStack'>>();

    const [responseData, setResponseData] = useState<YTDLP_Options>()
    const [formats, setFormats] = useState<Array<FormatType>>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [message, setMessage] = useState<string>('')
    const [source, setSource] = useState<string>('')
    const [duration, setDuration] = useState<string>('')
    const [error, setError] = useState(true) // # Pessimism
    const { url } = route.params;
    const [present, setPresent] = useState(true)
    const [bestAudio, setBestAudio] = useState<FormatType>({ filesize: 0 })

    useEffect(() => {
        ReqData(url)
    }, []);

    useEffect(() => {
        pLog(bestAudio?.filesize)
    }, [bestAudio]);


    const ReqData = (url: string) => {
        axios.post('https://uv-plus.herokuapp.com/', {
            uri: url,
        })
            .then((res: any) => {
                handleRes(res.data)
                // pPrettyPrint(res.data)
            }).catch((error) => {
                pPrettyPrint(error)
                setMessage(error.message)
                setLoading(false);
                setError(true);
            });
    }
    const handleRes = (data: YTDLP_Options) => {
        setResponseData(data)
        setFormats(data.formats)
        setSource(data.source)
        setDuration(formatTime(data.duration))
        setLoading(false)
        if (data.formats.length < 0) { setPresent(false) }
        setError(false)
    }
    return loading ? (
        <View style={styles.Container}>
            <Loading />
        </View>
    ) : (error) ? (
        <ErrorWrongURl message={message} />
    ) : (
        <View style={styles.Container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{responseData?.title}</Text>
            </View>
            <ScrollView>
                <View style={{ position: 'relative' }}>
                    <ImageBackground
                        style={[styles.Thumbnail, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}
                        source={{ uri: responseData?.thumbnail }}
                        blurRadius={10}
                    />
                    <Image style={styles.Thumbnail} source={{ uri: responseData?.thumbnail }} resizeMode={'contain'} />
                    <Text style={styles.DurationHead} numberOfLines={1}>{duration}</Text>
                </View>
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
                                return (<AudioList title={responseData?.title ?? ''} bestAudio={bestAudio} setBestAudio={setBestAudio} source={source} key={index} info={data} />)

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
                                return (<VideoList title={responseData?.title ?? ''} source={source} bestAudio={bestAudio} key={index} info={data} />)
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
    header: {
        paddingHorizontal: 16.0,
        paddingVertical: 8.0,
        backgroundColor: kPrimaryColor,
        elevation: 12
    },
    headerText: {
        fontSize: 18.0,
        color: '#fff'
    },
    Container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    Thumbnail: {
        width: '100%',
        height: SCREEN_HEIGHT / 3,

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
        fontSize: 12,
        fontWeight: '600',
        color: '#fff',
        position: 'absolute',
        backgroundColor: '#000',
        bottom: 0,
        right: 0,
        paddingHorizontal: 8.0,
        paddingVertical: 5.0
    },
    Heading: {
        fontSize: 20,
        paddingVertical: 14.0,
        fontWeight: '800',
        textAlign: 'center',
        backgroundColor: kPrimaryColor,
        color: '#fff',
        letterSpacing: 1.5
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
        // backgroundColor: 'orangered',
        // paddingVertical: 16,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18,
        textTransform: 'capitalize'
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
