import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Loading = () => {
    return (
        <View style={{flex:1,justifyContent:'center'}}>
            <ActivityIndicator size={65} color={'#66f'} />
        </View>
    )
}

export default Loading