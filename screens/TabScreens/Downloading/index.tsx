import { FlashList } from '@shopify/flash-list';
import React from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl, FlatList, Dimensions } from 'react-native'
import { useAppDispatch, useAppSelector } from '../../hooks';
import Downcomp from './Downcomp';

const Downloading: React.FC = () => {

	const DownloadList = useAppSelector((state) => state.downloadList);
	const [loading, setLoading] = React.useState<boolean>(false);
	const dispatch = useAppDispatch();

	return (
		<View style={styles.Container}>
			<Text style={styles.topHeading}>Downloading</Text>
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
	topHeading: {
		fontSize: 22.0,
		fontWeight: '700',
		paddingVertical: 16.0,
		color: '#333',
		borderBottomWidth: 1.0,
		borderBottomColor: 'rgba(0,0,0,0.1)',
		paddingHorizontal: 6.0
	},
	downloadView: {
		flex: 1,
		backgroundColor: '#ff56'
	}
});

const NoDownloading = () => {
	return (
		<View style={{ height: Dimensions.get('window').height / 1.4, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ color: '#333', fontSize: 16.0 }}>No file is getting downloaded at the moment</Text>
		</View>
	);
}