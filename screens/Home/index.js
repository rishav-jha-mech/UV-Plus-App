import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import ReadPermission from '../Scripts/ReadPermission';
import { useNavigation } from '@react-navigation/native';
import Banner from './Banner';                                 // Every thing happens here !
import Recent from './Recent';

const Home = () => {
    const [perm, setPerm] = useState()
    const navigator = useNavigation();
    ReadPermission().then(res => setPerm(res));
    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor="#202020"
            />
            <ScrollView >
                <View style={{ backgroundColor: '#fcfcfc', flex: 1 }}>
                    <Banner />
                    <Recent perm={perm} />
                    <View style={{alignItems:'center'}}>
                        <TouchableOpacity 
                            activeOpacity={0.6}
                            style={styles.btn}
                            onPress={() => {
                                navigator.navigate('Stack Web',{
                                    theUrl: 'https://m.youtube.com'
                                })
                            }}
                        >
                            <Text style={{color:'#fff'}}>Download More</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default Home

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
    },
    btn:{
        backgroundColor: '#66f',
        marginBottom: 20.0,
        paddingHorizontal: 16.0,
        paddingVertical: 16.0,
        borderRadius: 8.0
    }
})