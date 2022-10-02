import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-react-native';
import { View, ActivityIndicator, Image } from 'react-native'

const Loading = () => {

    const animationRef = useRef()

    useEffect(() => {
        animationRef.current?.play()
    }, [])


    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Lottie
                ref={animationRef}
                source={require('../assets/lottie/loading.json')}
            />
        </View>
    )
}

export default Loading