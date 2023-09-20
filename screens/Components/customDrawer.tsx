import { DrawerContentScrollView } from '@react-navigation/drawer'
import { DrawerContentComponentProps } from '@react-navigation/drawer/lib/typescript/src/types'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import t from 'twrnc'
import { Colors, MAIL_ID, PRIVACY_POLICY_URL, ProdAdIds } from '../constants'
import { Alert, Linking } from 'react-native'
import AntIcon from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'
import IoniIcon from 'react-native-vector-icons/Ionicons'
import onShare from '../Scripts/onsShare'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'

const CustomDrawer = (props: DrawerContentComponentProps) => {
    const insets = useSafeAreaInsets();

    const btnStyle = [t`mx-3 rounded flex-row bg-blue-50 my-1.5 py-3.5 px-4 border border-blue-100`,]
    const btnText = [t`text-gray-600 font-semibold`]
    return (
        <DrawerContentScrollView
            contentContainerStyle={{
                paddingTop: insets.top,
            }}
            style={t`flex-1`}
            {...props}
        >
            <View
                style={[t`h-60 mb-4 justify-center items-center`, { backgroundColor: Colors.PrimaryColor }]}>
                <View
                    style={[t`mx-auto h-30 w-30 justify-center items-center rounded-full opacity-90`, { overflow: 'hidden', backgroundColor: Colors.SecondaryColor }]}>
                    <Image
                        source={require('../assets/img/logo.png')}
                        style={t`w-28 h-28`}
                        resizeMode='contain'
                        resizeMethod='resize'
                    />
                </View>
                <Text style={t`text-white font-bold tracking-wide text-center text-2xl mt-6`}>UV Downloader</Text>
            </View>
            {/* <TouchableOpacity
                style={[btnStyle]}
                onPress={() => { kerror('Feature Not Impletemented yet') }}
            >
                <MCIcon style={t`mr-3`} name='advertisements-off' color={Colors.PrimaryColor} size={20} />
                <Text style={[btnText]}>Remove ads</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
                style={[btnStyle]}
                onPress={() => {
                    //To open the Google Play Store
                    Linking.openURL(`market://details?id=Once Published This Will Work !`).catch(err => Alert.alert('Please check for the Google Play Store'));
                }}
            >
                <AntIcon style={t`mr-3`} name='staro' color={Colors.PrimaryColor} size={20} />
                <Text style={[btnText]}>Rate this app</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[btnStyle]}
                onPress={() => onShare()}
            >
                <IoniIcon style={t`mr-3`} name='share-social-sharp' color={Colors.PrimaryColor} size={20} />
                <Text style={[btnText]}>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[btnStyle]}
                onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
            >
                <FeatherIcon style={t`mr-3`} name='shield' color={Colors.PrimaryColor} size={19} />
                <Text style={[btnText]}>Privacy Policy</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={[btnStyle]}
                onPress={() => Linking.openURL(`mailto:${MAIL_ID}`)}
            >
                <FeatherIcon style={t`mr-3`} name='mail' color={Colors.PrimaryColor} size={19} />
                <Text style={[btnText]}>Contact us</Text>
            </TouchableOpacity>
            <View style={t`mt-4`}>
                <BannerAd
                    unitId={__DEV__ ? TestIds.BANNER : ProdAdIds.DrawerBottomAd}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>
        </DrawerContentScrollView>
    )
}

export default CustomDrawer