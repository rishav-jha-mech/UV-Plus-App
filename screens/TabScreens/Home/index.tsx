import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
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