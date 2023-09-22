import analytics from '@react-native-firebase/analytics';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AdEventType, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome5';
import t from 'twrnc';
import ErrorWrongURl from '../../Components/ErrorWrongURl';
import Loading from '../../Components/Loading';
import { AppParamList } from '../../NAVIGATION';
import { formatTime } from '../../Scripts/timeFormatter';
import { Colors, ProdAdIds, SCREEN_HEIGHT, pPrettyPrint } from '../../constants';
import { SERVER_URL } from '../../env';
import { FormatType, YTDLP_Options } from '../../types';
import AudioListItem from './AudioListItem';
import VideoListItem from './VideoListItem';

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
    const navigation = useNavigation();

    useEffect(() => {
        ReqData(url)
    }, []);

    const showAD = async () => {
        const interstitialAd = await InterstitialAd.createForAdRequest(
            __DEV__ ?
                TestIds.INTERSTITIAL
                : ProdAdIds.ResultInterstitial
        );

        interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
            if (__DEV__ && ProdAdIds.ShowInterStitialAdsOnDebug) {
                interstitialAd.show();
            }
        });

        interstitialAd.load();
    }

    useEffect(() => {
        const timer = setInterval(() => {
            showAD();
        }, 8000);
        return () => {
            clearTimeout(timer);
        }
    }, [])
    useEffect(() => {
    }, [bestAudio]);


    const ReqData = async (url: string): Promise<void> => {
        try {
            const res: AxiosResponse<YTDLP_Options, any> = await axios.post(SERVER_URL, {
                uri: url,
            })
            handleRes(res?.data)
            await analytics().logEvent('API_Call_Successful', {
                url: url,
                data: res.data
            })
        }
        catch (e: any) {
            pPrettyPrint(e)
            setMessage(e?.message)
            setLoading(false);
            setError(true);
            await analytics().logEvent('API_Call_Unsuccessful', {
                url: url,
                error: e
            })
        }
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
        <SafeAreaView style={t`flex-1 bg-white`}>
            <View style={[t`h-16 justify-center`, { backgroundColor: Colors.PrimaryColor }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={t`p-2`}
                >
                    <FontawesomeIcon name='arrow-left' size={24} color={Colors.WhiteColor} />
                </TouchableOpacity>
            </View>
            <Loading />
        </SafeAreaView>
    ) : (error) ? (
        <ErrorWrongURl message={message} />
    ) : (
        <SafeAreaView style={t`flex-1 bg-whtie`}>
            <View style={t`h-16`}>
                <ScrollView
                    style={[t`flex-row`, { backgroundColor: Colors.PrimaryColor }]}
                    horizontal
                    contentContainerStyle={t`items-center`}
                >
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={t`p-2 mr-2`}
                    >
                        <FontawesomeIcon name='arrow-left' size={24} color={Colors.WhiteColor} />
                    </TouchableOpacity>
                    <Text style={t`text-white text-lg`}>{responseData?.title}</Text>
                </ScrollView>
            </View>
            <ScrollView style={t`flex-1`}>
                <View style={{ position: 'relative' }}>
                    <ImageBackground
                        style={[styles.Thumbnail, { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }]}
                        source={{ uri: responseData?.thumbnail }}
                        blurRadius={10}
                    />
                    <Image style={styles.Thumbnail} source={{ uri: responseData?.thumbnail }} resizeMode={'contain'} />
                    <Text style={t`absolute bottom-0 right-0 bg-black text-white text-sm py-2 px-3 rounded-l`} numberOfLines={1}>{duration}</Text>
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
                                return (<AudioListItem title={responseData?.title ?? ''} bestAudio={bestAudio} setBestAudio={setBestAudio} source={source} key={index} info={data} />)

                            })}
                        </ScrollView>
                    </View>
                    : <Text style={t`py-8 text-center text-lg text-black font-semibold`}>No audio results present</Text>}
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
                                if (data.filesize == 0 || data.filesize_approx == 0) {
                                    // pPrettyPrint({ data })
                                }
                                return (<VideoListItem title={responseData?.title ?? ''} source={source} bestAudio={bestAudio} key={index} info={data} />)
                            })}
                        </ScrollView>
                    </View>
                    : <Text style={t`py-8 text-center text-lg text-black font-semibold`}>No video results present</Text>}
            </ScrollView>
        </SafeAreaView>
    )
}

export default Results

const styles = StyleSheet.create({
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
    Heading: {
        fontSize: 20,
        paddingVertical: 14.0,
        fontWeight: '800',
        textAlign: 'center',
        backgroundColor: Colors.PrimaryColor,
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
