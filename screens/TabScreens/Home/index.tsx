import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants';
import ReadPermission from '../../Scripts/ReadPermission';
import Banner from './Banner'; // Every thing happens here !
import Recent from './Recent';



const Home: React.FC = () => {
    const [perm, setPerm] = useState<boolean>(false)
    ReadPermission().then((res: any) => setPerm(res));
    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
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
    btn: {
        backgroundColor: Colors.PrimaryColor,
        marginBottom: 20.0,
        paddingHorizontal: 16.0,
        paddingVertical: 16.0,
        borderRadius: 8.0
    }
})