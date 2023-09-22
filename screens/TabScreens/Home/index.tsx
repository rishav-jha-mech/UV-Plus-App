import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { AdEventType, BannerAd, BannerAdSize, InterstitialAd, TestIds } from 'react-native-google-mobile-ads';
import ReadPermission from '../../Scripts/ReadPermission';
import { ProdAdIds } from '../../constants';
import Banner from './Banner'; // Every thing happens here !
import Recent from './Recent';

const Home: React.FC = () => {
    const [perm, setPerm] = useState<boolean>(false)
    useEffect(() => {
        ReadPermission().then((res: any) => setPerm(res));
    }, [])

    const showAD = async () => {
        const interstitialAd = await InterstitialAd.createForAdRequest(
            __DEV__ ?
                TestIds.INTERSTITIAL
                : ProdAdIds.HomeInterstitial
        );

        interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
            if (__DEV__ && ProdAdIds.ShowInterStitialAdsOnDebug) {
                interstitialAd.show();
            }
        });
        interstitialAd.load();
    }

    useEffect(() => {
        const timer = setInterval(() => {
            showAD();
        }, 30000);
        return () => {
            clearTimeout(timer);
        }
    }, [])

    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ backgroundColor: '#fcfcfc', flex: 1 }}>
                    <Banner />
                    <Recent perm={perm} />
                    <BannerAd
                        unitId={__DEV__ ? TestIds.BANNER : ProdAdIds.HomeBottomAd}
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />
                    <BannerAd
                        unitId={__DEV__ ? TestIds.BANNER : ProdAdIds.HomeBottomAd2}
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />
                </View>
            </ScrollView>
        </>
    );
}

export default Home