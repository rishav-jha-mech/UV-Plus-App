import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RNFS from 'react-native-fs';
import t from 'twrnc';
import Loading from '../../Components/Loading';
import PermissionNotGiven from '../../Components/PermissionNotGiven';
import RenameFile from '../../Components/renameFileDialog';
import ReadPermission from '../../Scripts/ReadPermission';
import { Colors, DOWNLOAD_PATH, ProdAdIds, modalStyle } from '../../constants';
import FileList from './FileList';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const Downloads: React.FC = () => {

    const [filestats, setFileStats] = useState<Array<RNFS.ReadDirItem>>([]);
    const navigation = useNavigation();
    const [readPerm, setReadPerm] = useState(true);
    const [path, setPath] = useState<string>(DOWNLOAD_PATH);
    const [loading, setLoading] = useState<boolean>(true);
    const canGoBackward = true;
    ReadPermission().then((res: any) => setReadPerm(res));

    // Delete File Modal
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalText, setModalText] = useState<string>('');
    const animationRef = useRef<any>()

    // Rename File Modal
    const [showRenameModal, setShowRenameModal] = useState<boolean>(false);
    const [renameModalPath, setRenameModalPath] = useState<string>('');
    const [newFileName, setNewFileName] = useState<string>('');

    useEffect(() => {
        ReadFiles();
    }, [path])

    // useEffect(() => {
    //     const backAction = () => {
    //         if (shownPath === '0') {
    //             BackHandler.removeEventListener('hardwareBackPress', backAction);
    //             navigation.goBack();
    //             return true;
    //         }
    //         if (canGoBackward) {
    //             setLoading(true);
    //             PreviousPath();
    //         }
    //         return true;
    //     };
    //     BackHandler.addEventListener(
    //         "hardwareBackPress",
    //         backAction
    //     );
    //     return () => {
    //         BackHandler.removeEventListener('hardwareBackPress', backAction);
    //     }
    // }, [])




    const ReadFiles = () => {
        setLoading(true);
        RNFS.readDir(path).then(files => {
            var y = [...files].reverse(); // Reversed the array 
            setFileStats(y)
            setLoading(false)
        })
            .catch(err => {
                // Making the App Downloads folder if it doesnt exist
                RNFS.mkdir(path)
                    .then(() => { ReadFiles(); })
                    .catch((err) => { console.error(err) })
            });
    }
    const PreviousPath = () => { // Implementing the previous folder file system
        var local = path;
        local = local.slice(0, local.lastIndexOf('/'))
        setPath(local)

    }
    var shownPath = path
    shownPath = shownPath.slice((shownPath.indexOf('0')), shownPath.length)

    return readPerm ? (
        <>
            {/* Flies and Directories */}

            <View style={styles.Container}>
                <View style={[t`flex-row`, {
                    backgroundColor: Colors.PrimaryColor
                }]}>
                    {/* <View style={t`items-center justify-center mr-3`}>
                        {loading ?
                            <TouchableOpacity style={t`p-2`}>
                                <ActivityIndicator size={20} color={Colors.WhiteColor} />
                            </TouchableOpacity>
                            : (shownPath === "0") ? <></> : // Or the app will get 'crashed' if the user tries to go before this path
                                <TouchableOpacity style={t`p-2`} onPress={() => { setLoading(true); PreviousPath(); }}>
                                    <FontAwesomeIcon name='angle-left' size={28} color={Colors.WhiteColor} />
                                </TouchableOpacity>
                        }
                    </View> */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Text style={t`text-white text-base flex-1 py-5 px-3`}>
                            {shownPath.replace('0', 'Home')}
                        </Text>
                    </ScrollView>
                </View>
                {loading ?
                    <Loading />
                    : (loading === false && filestats.length === 0) ?
                        <View style={styles.BlankFilePage} >
                            <Text style={{ fontSize: 22, marginTop: 30, fontWeight: '700', letterSpacing: 0.7 }}>No Files Present</Text>
                        </View> :
                        <FlashList
                            data={filestats}
                            refreshControl={
                                <RefreshControl
                                    refreshing={loading}
                                    onRefresh={() => ReadFiles()}
                                />
                            }
                            ListFooterComponent={() => (filestats.length !== 0 ? <View style={t`flex-row items-center justify-center`}>
                                <FontAwesome5 name='arrow-down' color={Colors.DarkTextColor} style={t`mr-2`} />
                                <Text style={t`my-4 text-black text-sm text-center`}>Pull down to refresh</Text>
                            </View> : null)}
                            estimatedItemSize={100}
                            renderItem={(info) => {
                                return (
                                    <FileList
                                        key={info.index}
                                        data={info.item}
                                        setPath={setPath}
                                        setLoading={ReadFiles}
                                        setShowModal={setShowModal}
                                        setModalText={setModalText}
                                        setRenameModalPath={setRenameModalPath}
                                        setNewFileName={setNewFileName}
                                        setShowRenameModal={setShowRenameModal}
                                    />
                                );
                            }}
                        />
                }
                <BannerAd
                    unitId={__DEV__ ? TestIds.BANNER : ProdAdIds.DownloadsBottomAd}
                    size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>

            {/* Deleting Animation Modal */}

            <Modal style={{ flex: 1 }} visible={showModal} transparent={true} animationType={'fade'}>
                <Pressable style={modalStyle.Container}>
                    <View style={modalStyle.CardGeneric}>
                        <ActivityIndicator size={40} color={Colors.PrimaryColor} />
                        <Text style={modalStyle.CardText}>{modalText}</Text>
                    </View>
                </Pressable>
            </Modal>

            {/* Rename Modal */}

            <Modal style={{ flex: 1 }} visible={showRenameModal} transparent={true} animationType={'fade'}>
                <Pressable style={modalStyle.Container}>
                    <View style={[modalStyle.CardGeneric, { alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
                        <Text style={t`text-xl mb-8 font-semibold text-black`}>Rename File</Text>
                        <TextInput
                            autoFocus={true}
                            placeholder='Enter File Name'
                            style={modalStyle.Input}
                            onChangeText={(text) => setNewFileName(text)}
                            multiline={true}
                            value={newFileName}
                        />
                        <View style={{ flexDirection: 'row', marginTop: 12.0, width: '100%', justifyContent: 'flex-end' }}>
                            <TouchableOpacity
                                style={[modalStyle.smolBtn, { marginRight: 12.0 }]}
                                onPress={() => setShowRenameModal(false)}
                            >
                                <Text style={modalStyle.smolBtnText}>CANCEL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[modalStyle.smolBtn, {}]} onPress={() => RenameFile(newFileName, renameModalPath, ReadFiles, setShowRenameModal)}>
                                <Text style={modalStyle.smolBtnText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>


        </>)
        : <PermissionNotGiven />
}

export default Downloads

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: Colors.WhiteColor,
        justifyContent: 'center',
    },
    BlankFilePage: {
        backgroundColor: Colors.WhiteColor,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
