import React, { useState } from 'react'
import { StyleSheet, View, Text, ScrollView, StatusBar, TouchableOpacity } from 'react-native'
import ReadPermission from '../Scripts/ReadPermission';
import Banner from './Banner';                                 // Every thing happens here !
import Recent from './Recent';


const Home = () => {
    const [perm, setPerm] = useState()
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