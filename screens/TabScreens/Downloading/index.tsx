import React, { useEffect } from 'react'
import { FlashList } from '@shopify/flash-list';
import { StyleSheet, Text, View, ScrollView, RefreshControl, FlatList, Dimensions } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../hooks';
import StorageLeft from '../../Scripts/storageLeft';
import Downcomp from './Downcomp';
import { pPrettyPrint } from '../../constants';

const Downloading: React.FC = () => {

	const DownloadList = useAppSelector((state) => state.downloadList);
	const [storageStat, setStorageStat] = React.useState<string>('');

    useEffect(() => {
        StorageLeft().then((res: string) => setStorageStat(res))
		// pPrettyPrint(DownloadList)
    }, [DownloadList])

	return (
		<View style={styles.Container}>
			<View style={styles.topContainer}>
				<Text style={styles.topHeading}>Downloading</Text>
				<Text style={styles.space}>{storageStat}</Text>
			</View>
			{(DownloadList.length === 0) ?
				<NoDownloading />
				: <FlashList
					data={DownloadList}
					estimatedItemSize={100}
					renderItem={(data) => {
						return <Downcomp key={data.index} data={data.item} />
					}} />
			}
		</View>
	)
}

export default Downloading

const styles = StyleSheet.create({
	Container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingHorizontal: 10.0
	},
	topContainer:{
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1.0,
		borderBottomColor: 'rgba(0,0,0,0.1)',
		paddingVertical: 16.0,
		paddingHorizontal: 4.0,
	},
	topHeading: {
		fontSize: 20.0,
		fontWeight: '700',
		color: '#333',
	},
	space:{
		color: '#333',
		fontSize: 12.0,
		fontWeight: '600',
	},
	downloadView: {
		flex: 1,
		backgroundColor: '#ff56'
	}
});

const NoDownloading = () => {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ color: '#333', fontSize: 16.0, marginHorizontal: 16.0, textAlign: "center" }}>No file is getting downloaded at the moment</Text>
		</View>
	);
}