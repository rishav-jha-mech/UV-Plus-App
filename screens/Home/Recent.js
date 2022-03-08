import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import FileIcon from '../Components/FileIcon';
import formatFormatter from '../Scripts/formatFormatter';

const Recent = (props) => {
    if (props.perm === false) {
        return <Permi />
    }
    const PATH = RNFetchBlob.fs.dirs.DownloadDir + '/UV Downloader';
    const [loading, setLoading] = useState(true);
    const [fileStats, setFileStats] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true);
        ReadFiles();
    }, [PATH]) // When PATH changes component will re render

    const ReadFiles = () => {
        RNFetchBlob.fs.lstat(PATH).then(files => {
            var y = [...files].reverse(); // Reversed the array
            var filesOnlyArray = [];
            y.map((data, index) => {
                if (data.type !== "directory") filesOnlyArray.push(data)
            })
            // console.log(JSON.stringify(y,0,4))
            setFileStats(filesOnlyArray);
            setLoading(false);
        })
            .catch(err => {
                // When the app loads for the first time
                setLoading(false);
                console.error(err)
            });
    }
    const goToWeb = () => {
        navigation.navigate("Stack Web",{theUrl: "https://m.youtube.com"})
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Recent Downloads</Text>
            {loading ? <View style={{ height: 150.0, justifyContent: 'center' }}><ActivityIndicator size={55} color={'#66f'} /></View> :
                <ScrollView
                    style={styles.cardContainer}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {
                        fileStats.length === 0 ?
                            <Text
                                style={{
                                    paddingVertical: 24.0,
                                    textAlign: 'center',
                                }}>
                                No recent downloads.
                            </Text>
                            :
                            <>
                                {fileStats.map((data, index) => {
                                    if (index >= 8) {
                                        return
                                    }
                                    const ext = (formatFormatter(data.filename)).EXTENSION;
                                    return (
                                        <TouchableOpacity
                                            activeOpacity={0.25}
                                            key={index}
                                            style={styles.card}
                                        >
                                            <View style={styles.iconContainer}>
                                                <FileIcon ext={ext} size={50.0} />
                                            </View>
                                            <Text
                                                numberOfLines={2}
                                                style={styles.cardFileName}
                                            >
                                                {data.filename}
                                            </Text>
                                        </TouchableOpacity>);
                                })}
                                <View
                                    activeOpacity={0.25}
                                    style={[styles.card,{justifyContent:'space-between'}]}
                                >
                                    <Text style={styles.heading}>Want to download more ?</Text>
                                    <TouchableOpacity style={styles.Btn} onPress={() => goToWeb()}>
                                        <Text style={styles.BtnText}> Download More</Text>
                                    </TouchableOpacity>
                                </View>
                            </>

                    }
                </ScrollView>
            }
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
        fontWeight: '700'
    },
    card: {
        height: 160,
        width: 140,
        backgroundColor: '#fff',
        marginHorizontal: 8.0,
        marginVertical: 20.0,
        elevation: 8.0,
        paddingHorizontal: 6.0,
        paddingVertical: 14.0,
        borderRadius: 10.0,
    },
    cardFileName: {
        fontSize: 12.0,
        lineHeight: 18.0
    },
    iconContainer: {
        height: '60%',
        marginBottom: 10.0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Btn:{
        paddingVertical: 10.0,
        borderRadius: 8,
        backgroundColor: '#66f',
    },
    BtnText:{
        color: '#fff',
        fontWeight: '700',
        textAlign: 'center',
    },
    heading:{
        fontWeight: '600',
        fontSize: 19.0,
        lineHeight: 25.0,
        textAlign:'center'
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