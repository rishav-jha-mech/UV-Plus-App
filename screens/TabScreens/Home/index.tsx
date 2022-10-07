import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView, StatusBar, Alert } from 'react-native'
import { kPrimaryColor, pLog, pPrettyPrint } from '../../constants';
import ReadPermission from '../../Scripts/ReadPermission';
import Banner from './Banner';                                 // Every thing happens here !
import Recent from './Recent';


const Home: React.FC = () => {
    const [perm, setPerm] = useState<boolean>(false)
    ReadPermission().then((res: any) => setPerm(res));

    return (
        <>
            <StatusBar
                animated={true}
                backgroundColor={kPrimaryColor}
            />
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
        backgroundColor: kPrimaryColor,
        marginBottom: 20.0,
        paddingHorizontal: 16.0,
        paddingVertical: 16.0,
        borderRadius: 8.0
    }
})