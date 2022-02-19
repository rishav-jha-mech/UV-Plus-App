import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ReadPermission from '../Scripts/ReadPermission';
import Banner from './Banner'
const Home = () => {
    ReadPermission()
        
    return (
        <>
        <View style={{backgroundColor: '#fcfcfc',flex:1}}>
            <Banner />
            <View style={styles.Container}>
                <View style={{ paddingHorizontal: 16.0 }}>
                    <Text style={{ fontWeight: '700', fontSize: 16 }}>Your Recent Downloads</Text>
                </View>
            </View>
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