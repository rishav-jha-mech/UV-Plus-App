
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ActivityIndicator, Pressable } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import RNFS from 'react-native-fs';
import formatFormatter from '../../Scripts/formatFormatter';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { DOWNLOAD_PATH, kPrimaryColor, supWebsites } from '../../constants';
import { VideoThumbCard, FileIconCard, RecentThumbCard } from './FileIconCard';
import styles from './styles'
import { StackNavigationProp } from '@react-navigation/stack';
import { AppParamList } from '../../NAVIGATION';

type RecentCompTypes = {
    perm: boolean
}



type webStackProps = StackNavigationProp<AppParamList, 'WebStack'>;

const Recent: React.FC<RecentCompTypes> = ({ perm }) => {
    if (perm === false) {
        return <Permi />
    }
    const [loading, setLoading] = useState<boolean>(true);
    const [fileStats, setFileStats] = useState<Array<RNFS.ReadDirItem>>([]);
    const [videoStats, setVideoStats] = useState<Array<RNFS.ReadDirItem>>([]);
    const [audioStats, setaudioStats] = useState<Array<RNFS.ReadDirItem>>([]);
    const navigation = useNavigation<webStackProps>();

    useEffect(() => {
        setLoading(true);
        ReadFiles();
    }, [DOWNLOAD_PATH]) // When DOWNLOAD_PATH changes component will re render

    const ReadFiles = () => {
        RNFS.readDir(DOWNLOAD_PATH).then(files => {
            const y = [...files].reverse(); // Reversed the array
            const x = y.slice(0, 16);        // 100 Times more performant
            x.map((data: RNFS.ReadDirItem, index) => {
                if (data.isFile()) {
                    setFileStats(prevValue => [...prevValue, data])
                    let ext = (formatFormatter(data.name));
                    if (
                        ext === 'mp4' ||
                        ext === 'webm' ||
                        ext === 'avi' ||
                        ext === 'mkv'
                    ) {
                        setVideoStats(prevValue => [...prevValue, data])
                    }
                    if (
                        ext === 'mp3' ||
                        ext === 'm4a'
                    ) {
                        setaudioStats(prevValue => [...prevValue, data])
                    }
                }
            })
            // console.log(JSON.stringify(y,0,4))
            setLoading(false);
        })
            .catch(err => {
                // When the app loads for the first time
                setLoading(false);
                console.error(err);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Recent Downloads</Text>
            {loading ? <Loading /> :
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        fileStats.length === 0 ?
                            <Text
                                style={styles.none}
                            >
                                No recent downloads.
                            </Text>
                            :
                            <>
                                {fileStats.map((data, index) => <RecentThumbCard key={index} data={data} />)}
                            </>
                    }
                </ScrollView>
            }
            <Text style={styles.header}>Recent Videos</Text>
            {loading ? <Loading /> :
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        videoStats.length === 0 ?
                            <Text
                                style={styles.none}
                            >
                                No recent videos.
                            </Text>
                            :
                            <>
                                {videoStats.map((data, index) => <VideoThumbCard key={index} data={data} />)}
                            </>
                    }
                </ScrollView>
            }
            <Text style={styles.header}>Recent Audios</Text>
            {loading ? <Loading /> :
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        audioStats.length === 0 ?
                            <Text
                                style={styles.none}
                            >
                                No recent audios.
                            </Text>
                            :
                            <>
                                {audioStats.map((data, index) => <FileIconCard key={index} data={data} />)}
                            </>
                    }
                </ScrollView>
            }
            <Text style={styles.header}>Download Media From</Text>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {supWebsites.map((data, index) => {
                    const { name, icon, url, colors, color, size } = data
                    return <Pressable
                        key={index}
                        onPress={() => {
                            navigation.navigate('WebStack', {
                                url: url
                            });
                        }}>
                        <LinearGradient
                            colors={colors}
                            angle={4}
                            angleCenter={{ x: 0.5, y: 0.5 }}
                            useAngle={true}
                            style={styles.static}
                        >
                            <TouchableOpacity activeOpacity={0.4}
                                onPress={() => {
                                    navigation.navigate('WebStack', {
                                        url: url
                                    });
                                }}
                            >
                                <FontAwesomeIcon name={icon} size={size} color={color} />
                            </TouchableOpacity>
                        </LinearGradient></Pressable>
                })}
            </ScrollView>
        </View>
    )
}

export default Recent


const Permi = () => {

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Recent Downloads</Text>
            <View style={{ height: 140, paddingVertical: 16.0, alignItems: 'center', justifyContent: 'space-around' }}>
                <Text
                    style={{
                        fontSize: 16,
                        textAlign: 'center',
                        lineHeight: 24
                    }}>
                    File Permission not Given can't show recent downloads, try giving permission in settings or reinstalling the app
                </Text>
            </View>
        </View>
    );
}
const Loading = () => {
    return (
        <View style={{ height: 190.0, justifyContent: 'center' }}><ActivityIndicator size={55} color={kPrimaryColor} /></View>
    );
}