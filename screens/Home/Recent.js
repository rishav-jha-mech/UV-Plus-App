import { faFacebook, faFacebookF, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import FileIcon from '../Components/FileIcon';
import formatFormatter from '../Scripts/formatFormatter';
import OpenFile from '../Scripts/OpenFile';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const Recent = (props) => {
    if (props.perm === false) {
        return <Permi />
    }
    const PATH = RNFetchBlob.fs.dirs.DownloadDir + '/UV Downloader';
    const [loading, setLoading] = useState(true);
    const [fileStats, setFileStats] = useState([]);
    const [videoStats, setVideoStats] = useState([]);
    const [audioStats, setaudioStats] = useState([]);
    const navigation = useNavigation();

    const supWebsites = [
        {
            name: 'Youtube',
            url: 'https://youtube.com',
            icon: faYoutube,
            size: 35,
            colors: ['#FF0000', 'red'],
            color: '#fff'
        },
        {
            name: 'Facebook',
            url: 'https://facebook.com',
            icon: faFacebook,
            size: 35,
            colors: ['#3b5998', '#3b5998'],
            color: '#fff'

        },
        {
            name: 'Instagram',
            url: 'https://instagram.com',
            icon: faInstagram,
            size: 35,
            colors: ['#feda75', '#fa7e1e', '#d62976', '#962fbf', '#4f5bd5'],
            color: '#fff'
        },
        {
            name: 'Twitter',
            url: 'https://twitter.com',
            icon: faTwitter,
            size: 35,
            colors: ['#1DA1F2', '#1DA1F2'],
            color: '#fff'
        },
    ];

    useEffect(() => {
        setLoading(true);
        ReadFiles();
    }, [PATH]) // When PATH changes component will re render

    const ReadFiles = () => {
        RNFetchBlob.fs.lstat(PATH).then(files => {
            var y = [...files].reverse(); // Reversed the array
            var x = y.slice(0, 8);        // 100 Times more performant
            x.map((data, index) => {
                if (data.type !== "directory") {
                    setFileStats(prevValue => [...prevValue, data])
                    let ext = (formatFormatter(data.filename)).EXTENSION;
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
                    style={styles.cardContainer}
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
                                {fileStats.map((data, index) => {
                                    const ext = (formatFormatter(data.filename)).EXTENSION;
                                    return <FileIconCard key={index} filename={data.filename} path={data.path} ext={ext} />
                                })}
                            </>
                    }
                </ScrollView>
            }
            <Text style={styles.header}>Recent Videos</Text>
            {loading ? <Loading /> :
                <ScrollView
                    style={styles.cardContainer}
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
                                {videoStats.map((data, index) => {
                                    const ext = (formatFormatter(data.filename)).EXTENSION;
                                    return <FileIconCard key={index} filename={data.filename} path={data.path} ext={ext} />
                                })}
                            </>
                    }
                </ScrollView>
            }
            <Text style={styles.header}>Recent Audios</Text>
            {loading ? <Loading /> :
                <ScrollView
                    style={styles.cardContainer}
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
                                {audioStats.map((data, index) => {

                                    const ext = (formatFormatter(data.filename)).EXTENSION;
                                    return <FileIconCard key={index} filename={data.filename} path={data.path} ext={ext} />
                                })}
                            </>
                    }
                </ScrollView>
            }
            <Text style={styles.header}>Download Media From</Text>
            <ScrollView
                style={styles.cardContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {supWebsites.map((data, index) => {
                    const { name, icon, url, colors, color, size } = data
                    return <Pressable
                        onPress={() => {
                            navigation.navigate('Stack Web', {
                                'theUrl': url
                            });
                        }}>
                        <LinearGradient
                            key={index}
                            opac
                            colors={colors}
                            angle={4}
                            angleCenter={{ x: 0.5, y: 0.5 }}
                            useAngle={true}
                            style={styles.static}
                        >
                            <TouchableOpacity activeOpacity={0.4}
                                onPress={() => {
                                    navigation.navigate('Stack Web', {
                                        'theUrl': url
                                    });
                                }}
                            >
                                <FontAwesomeIcon icon={icon} size={size} color={color} />
                            </TouchableOpacity>
                        </LinearGradient></Pressable>
                })}
            </ScrollView>
        </View>
    )
}

export default Recent

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12.0,
        marginBottom: 10.0,
    },
    header: {
        fontSize: 17.0,
        fontWeight: '700',
        color: '#333'
    },
    card: {
        height: 150,
        width: 140,
        backgroundColor: '#fff',
        marginHorizontal: 8.0,
        marginVertical: 20.0,
        elevation: 4.0,
        paddingHorizontal: 6.0,
        paddingVertical: 10.0,
        borderRadius: 10.0,
    },
    cardFileName: {
        fontSize: 12.0,
        lineHeight: 18.0,
        height: '40%',
    },
    iconContainer: {
        height: '60%',
        marginBottom: 10.0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontWeight: '600',
        fontSize: 19.0,
        lineHeight: 25.0,
        textAlign: 'center'
    },
    none: {
        paddingVertical: 24.0,
        height: 100.0,
        textAlign: 'center',
    },
    static: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 80,
        borderRadius: 16,
        marginHorizontal: 7,
        marginVertical: 20
    }
})

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
        <View style={{ height: 190.0, justifyContent: 'center' }}><ActivityIndicator size={55} color={'#66f'} /></View>
    );
}

const FileIconCard = (props) => {
    const { index, path, ext, filename } = props
    return (
        <TouchableOpacity
            key={index}
            activeOpacity={0.85}
            style={styles.card}
            onPress={() => OpenFile(path)}
        >
            <View style={styles.iconContainer}>
                <FileIcon ext={ext} size={50.0} />
            </View>
            <Text
                numberOfLines={2}
                style={styles.cardFileName}
            >
                {filename}
            </Text>
        </TouchableOpacity>
    );
}

