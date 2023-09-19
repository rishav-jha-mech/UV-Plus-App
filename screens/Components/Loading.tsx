import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../constants';

const Loading = () => {

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size={40} color={Colors.PrimaryColor} />
        </View>
    )
}

export default Loading