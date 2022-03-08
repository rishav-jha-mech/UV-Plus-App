import React, { useState } from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import ReadPermission from '../Scripts/ReadPermission';
import Banner from './Banner';                                 // Every thing happens here !
import Recent from './Recent';

const Home = () => {
    const [perm,setPerm] = useState()
    ReadPermission().then(res => {setPerm(res);console.log(res)});
    return (
        <>
        <StatusBar
            animated={true}
            backgroundColor="#202020"
        />
        <View style={{backgroundColor: '#fcfcfc',flex:1}}>
            <Banner />                                          
            <Recent perm={perm} />
        </View>
        </>
    );
}

export default Home

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
    },
})