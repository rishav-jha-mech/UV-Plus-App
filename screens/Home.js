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
    const [formats,setFormats] = useState([''])

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
                                    {formats.map((data) =>{
                                        return(
                                            <Pressable style={{marginVertical:15}} 
                                            onPress={() => {
                                              navigation.navigate('Web Tab', {
                                                itemId: data.id,
                                                urlToMedia: data.url,
                                              });
                                            }}
                                          >
                                        <Text>{data.format}</Text>
                                        </Pressable>
                                        )
                                    })}
                                    <Text style={styles.Heading}>Video</Text>
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
        justifyContent: 'center',
    },
    Results: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 16,
        height: 400,
        paddingVertical: 20
    },
    Title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 16,
        backgroundColor: '#ff56'
    },
    Thumbnail: {
        width: '100%',
        minHeight: 175,
        borderRadius: 6,
        marginVertical: 12,
        paddingHorizontal: 8,
        backgroundColor: '#ff156f'
    },
    Heading: {
        fontSize: 24,
        marginHorizontal: 16,
        marginVertical: 8,
        fontWeight: '800',
        textAlign: 'center',
        backgroundColor: 'lightblue'
    }
})
