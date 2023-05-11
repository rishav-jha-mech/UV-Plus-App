import { Alert } from 'react-native'
import { pError, pLog } from '../constants';
import RNFS from 'react-native-fs';


const  deleteFileDialog = async (name: string, path: string, reload: Function,setShowModal: Function, setModalText: Function) => {
	Alert.alert(
		"Confirm Delete",
		`Are you sure you want to delete "${name}" `,
		[
			{
				text: "Yes",
				onPress: async () => {
					setModalText(`Deleting File with Filename "${name}"`);
					setShowModal(true);
					let exists = await RNFS.exists(path);
					if (exists) {
						try {
							await RNFS.unlink(path);
							// pLog(`File with Filename "${name}" deleted successfully`);
							setTimeout(() => { // yaar yeh file delete hone me itna time kyu lag raha .........
								setModalText('');
								setShowModal(false);
								reload();
							}, 1500);

							// Alert.alert('File Deleted', `"${name}" has been deleted successfully`);
						} catch (err) {
							setModalText('');
							setShowModal(false);
							pError(err);
							Alert.alert('Error', 'Something went wrong');
						}
					} else {
						setModalText('');
						setShowModal(false);
						Alert.alert('Error', 'File does not exist');
					}
				},
			},
			{ text: "No", onPress: () => null }
		]
	);
}

export default deleteFileDialog