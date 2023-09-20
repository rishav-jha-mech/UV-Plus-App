import { FlashList } from '@shopify/flash-list';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StorageLeft from '../../Scripts/storageLeft';
import { useAppSelector } from '../../hooks';
import Downcomp from './Downcomp';
import t from 'twrnc'
import { Colors, ProdAdIds } from '../../constants';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const Downloading: React.FC = () => {

	const DownloadList = useAppSelector((state) => state.downloadList);
	const [storageStat, setStorageStat] = React.useState<string>('');

	useEffect(() => {
		StorageLeft().then((res: string) => setStorageStat(res))
		// pPrettyPrint(DownloadList)
	}, [DownloadList])

	return (
		<View style={t`flex-1`}>
			<View style={[t`flex-row justify-between items-center px-3`, {
				backgroundColor: Colors.PrimaryColor
			}]}>
				<Text style={t`text-lg text-white py-4.5`}>Downloading</Text>
				<Text style={t`text-xs text-white opacity-75`}>{storageStat}</Text>
			</View>
			{(DownloadList.length === 0) ?
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text style={t`text-black text-center text-base`}>
						No file is being downloaded at the moment
					</Text>
				</View>
				: <FlashList
					data={DownloadList}
					estimatedItemSize={100}
					renderItem={(data) => {
						return <Downcomp key={data.index} data={data.item} />
					}} />
			}
			<BannerAd
				unitId={__DEV__ ? TestIds.BANNER : ProdAdIds.DownloadingBottomAd}
				size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
				requestOptions={{
					requestNonPersonalizedAdsOnly: true,
				}}
			/>
		</View>
	)
}

export default Downloading;