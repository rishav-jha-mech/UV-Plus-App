import { StyleSheet, Alert } from 'react-native'
import deleteFile from '../Scripts/deleteFile';

const deleteFileDialog = ({ name, path, reload }) => {

  Alert.alert(
    "Confirm Delete",
    `Are you sure you want to delete "${name}" `,
    [
      {
        text: "Yes",
        onPress: () => {
          deleteFile(path);
          reload();
        },
      },
      { text: "No", onPress: () => null }
    ]
  );
}

export default deleteFileDialog