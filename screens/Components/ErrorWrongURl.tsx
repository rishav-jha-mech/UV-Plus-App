import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import t from 'twrnc';
import { Colors } from '../constants';
import { useNavigation } from '@react-navigation/native';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome5'

type ErrorWrongURlProps = {
    message: string
}

const ErrorWrongURl: React.FC<ErrorWrongURlProps> = ({ message }) => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={[t`flex-1`, { backgroundColor: Colors.WhiteColor }]}>
            <View style={[t`h-16 justify-center`, { backgroundColor: Colors.PrimaryColor }]}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={t`p-2`}
                >
                    <FontawesomeIcon name='arrow-left' size={24} color={Colors.WhiteColor} />
                </TouchableOpacity>
            </View>
            <View style={t`flex-1 items-center justify-center`}>
                <Text style={[t`text-4xl font-semibold`, {
                    color: Colors.PrimaryColor
                }]}>
                    {

                        message.includes('500') ?
                            `Error occured ${message}` :
                            'Network Error'
                    }

                </Text>
                <Text style={t`text-white`}>
                    {message.includes('500') ? 'Entered URL is not supported' : message.includes('Network Error') ? 'Switch on your Mobile Data or Wifi to use the internet' : message}
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default ErrorWrongURl