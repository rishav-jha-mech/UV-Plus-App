import React, { useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { StyleSheet, Text, View, TextInput, Pressable, Modal, Keyboard, ActivityIndicator, Image, FlatList } from 'react-native'
import axios from 'axios'
import validator from 'validator'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler'

const Home = () => {
    const navigation = useNavigation();

    const [url, setUrl] = useState("")
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState()
    const [modalVisible, setModalVisible] = useState(false);
    const [thumb, setThumb] = useState()
    const [title, setTitle] = useState()
    const [formats, setFormats] = useState([''])
    const [arr, setArr] = useState([''])

    const PostReq = (url) => {
        console.log(url)
        if (!validator.isURL(url) && url == "") { setMessage("Enter A Valid Url 😒"); return; }
        else { setMessage(""); setModalVisible(false); }

        axios.post('http://127.0.0.1:6969/', {
            uri: url,
        })
            .then((response) => handleRes(response.data))
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleRes = (data) => {
        setLoading(false)
        // console.log(data);
        // Thumbnail Title Audio with format & Complete Video with format
        setThumb(data.thumbnail);
        setTitle(data.title);
        setFormats(data.formats)
        // console.log(typeof(data))
        // console.log(typeof(data.formats))
        // console.log(typeof(data.formats[0]))
        // console.log(typeof(data.formats[0].height))
        console.log(formats)
    }
    return (
        <View style={styles.Container}>
            <View style={styles.urlContainer}>
                <TextInput
                    style={styles.Input}
                    placeholder="Enter URL"
                    keyboardType="url"
                    selectionColor="#333"
                    defaultValue={url}
                    onChangeText={(url) => setUrl(url)}
                />
                {/* Pressing this button will send the url to axios */}
                <Pressable
                    style={styles.Search}
                    onPress={() => { PostReq(url); Keyboard.dismiss(); setModalVisible(!modalVisible); }}
                >
                    <FontAwesomeIcon
                        icon={faSearch}
                        size={24}
                        color={"#ff156f"}
                    />
                </Pressable>
            </View>
            {message ?
                <Text style={styles.Message}>
                    {message}
                </Text>
                :
                <Modal
                    transparent={true}
                    visible={true}
                    visible={modalVisible}
                >
                    <Pressable style={styles.ModalContainer} onPress={() => { setModalVisible(!modalVisible); setUrl(""); setLoading(true) }}>
                        <Pressable style={styles.Results}>
                            {loading ? <ActivityIndicator style={{ paddingVertical: '50%' }} size={60} color={"#ff156f"} />
                                :
                                <ScrollView>
                                    <Text style={styles.Title} numberOfLines={2}> {title}</Text>
                                    <Image style={styles.Thumbnail} source={{ uri: thumb }} resizeMode={'contain'} />

                                    <Text style={styles.Heading}>Audio</Text>
                                    <View>
                                    <ScrollView style={[styles.AuScroll]}>
                                        {formats.map((data, index) => { // CalBack Function's second Param is the index
                                            return (
                                                <>
                                                    {(data.height === null) ?
                                                        <Pressable
                                                            key={index}
                                                            style={styles.ListContainer}
                                                            onPress={() => {
                                                                navigation.navigate('Web Tab', {
                                                                    itemId: data.id,
                                                                    urlToMedia: data.url,
                                                                });
                                                            }}
                                                        >
                                                            <Text style={styles.List}>
                                                                {/* {index}  */}
                                                                { data.format.slice(((data.format).search("-"))+2, data.format.length) }
                                                            </Text>
                                                            <Text style={styles.Capsule}>
                                                                {data.ext}
                                                            </Text>
                                                        </Pressable>
                                                        : <></>}
                                                </>
                                            )

                                        })}
                                    </ScrollView></View>
                                    <Text style={styles.Heading}>Video</Text>
                                    <View>
                                    <ScrollView style={[styles.ViAuScroll,styles.ViScroll]}>
                                        {formats.map((data, index) => { // CalBack Function's second Param is the index
                                            return (
                                                <>
                                                    {(data.asr !== null && data.fps != null) ?
                                                        <Pressable
                                                            key={index}
                                                            style={styles.ListContainer}
                                                            onPress={() => {
                                                                navigation.navigate('Web Tab', {
                                                                    itemId: data.id,
                                                                    urlToMedia: data.url,
                                                                });
                                                            }}
                                                        >
                                                            <Text style={styles.List}>
                                                                {/* {index}  */}
                                                                { data.format.slice(((data.format).search("-"))+2, data.format.length) }
                                                            </Text>
                                                            <Text style={styles.Capsule}>
                                                                {data.ext}
                                                            </Text>
                                                        </Pressable>
                                                        : <></>}
                                                </>
                                            )

                                        })}
                                    </ScrollView></View>
                                </ScrollView>
                            }
                        </Pressable>
                    </Pressable>
                </Modal>
            }
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#ddf'
    },
    urlContainer: {
        backgroundColor: 'dodgerblue',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 12
    },
    Input: {
        backgroundColor: '#fff',
        flex: 1,
        borderRadius: 24,
        paddingLeft: 16,
    },
    Search: {
        position: 'absolute',
        alignItems: 'center',
        right: 16,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 25,
    },
    Message: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    ModalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end'
    },
    Results: {
        backgroundColor: '#fff',
        height: '80%',
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    Title: {
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#ff56'
    },
    Thumbnail: {
        width: '100%',
        minHeight: 175,
        borderRadius: 6,
        marginVertical: 12,
        backgroundColor: '#ff156f'
    },
    Heading: {
        fontSize: 24,
        marginVertical: 8,
        fontWeight: '800',
        textAlign: 'center',
        backgroundColor: 'lightblue'
    },
    ListContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        marginVertical: 5,
        backgroundColor: '#ff56',
        alignItems:'center'
    },
    List: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        fontWeight: 'bold',
    },
    Capsule: {
        paddingVertical: 3,
        paddingHorizontal: 8,
        backgroundColor: '#ff156f',
        fontSize: 12,
        fontWeight: '800',
        borderRadius:16,
        color:'#fff'
    },
})
