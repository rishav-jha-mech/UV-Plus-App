// react-native-media-thumbnail may be used in future commits
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, BackHandler, Modal, Pressable, Text, TouchableOpacity, ActivityIndicator, RefreshControl, TextInput, Keyboard } from 'react-native';
import FileList from './FileList';
import { useNavigation } from '@react-navigation/native';
import RNFS from 'react-native-fs';
import PermissionNotGiven from '../../Components/PermissionNotGiven';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Loading from '../../Components/Loading';
import { FlashList } from '@shopify/flash-list';
import ReadPermission from '../../Scripts/ReadPermission';
import { DOWNLOAD_PATH, kPrimaryColor, modalStyle, pLog } from '../../constants';
import Lottie from 'lottie-react-native';
import RenameFile from '../../Components/renameFileDialog';

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

    useEffect(() => {
        animationRef.current?.play()
    }, [showModal])

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

    // Backhandlers
    const backAction = () => {
        if (shownPath === '0') {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
            navigation.goBack();
            return true;
        }
        if (canGoBackward) {
            setLoading(true);
            PreviousPath();
        }
        return true;
    };
    BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
    );

    return readPerm ? (
        <>
            {/* Flies and Directories */}

            <View style={styles.Container}>
                <View style={styles.Path}>
                    {loading ? // So that user does not click 2-3 times on the same button
                        <TouchableOpacity style={styles.backBtn}>
                            <ActivityIndicator size={20} color={kPrimaryColor} />
                        </TouchableOpacity>
                        : (shownPath === "0") ? <></> : // Or the app will get 'crashed' if the user tries to go before this path
                            <TouchableOpacity style={styles.backBtn} onPress={() => { setLoading(true); PreviousPath(); }}>
                                <FontAwesomeIcon name='angle-left' size={20} color={kPrimaryColor} />
                            </TouchableOpacity>
                    }
                    <Text style={styles.PathText}>
                        {shownPath.replace('0', 'Home')}
                    </Text>
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
            </View>

            {/* Deleting Animation Modal */}

            <Modal style={{ flex: 1 }} visible={showModal} transparent={true} animationType={'fade'}>
                <Pressable style={modalStyle.Container}>
                    <View style={modalStyle.CardGeneric}>
                        <Lottie style={{ height: 200 }} ref={animationRef} source={require('../../assets/lottie/trash.json')} />
                        <Text style={modalStyle.CardText}>{modalText}</Text>
                    </View>
                </Pressable>
            </Modal>

            {/* Rename Modal */}

            <Modal style={{ flex: 1 }} visible={showRenameModal} transparent={true} animationType={'fade'}>
                <Pressable style={modalStyle.Container}>
                    <View style={[modalStyle.CardGeneric, { alignItems: 'flex-start', justifyContent: 'flex-start' }]}>
                        <Text style={modalStyle.h1}>Rename File</Text>
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
                            <TouchableOpacity style={[modalStyle.smolBtn, {}]} onPress={() => RenameFile(newFileName,renameModalPath,ReadFiles,setShowRenameModal)}>
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
        backgroundColor: '#fcfafa',
        justifyContent: 'center',
    },
    Path: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 52.0,
        borderBottomColor: 'rgba(0,0,0,0.075)',
        borderBottomWidth: 1.5
    },
    PathText: {
        flex: 1,
        color: kPrimaryColor,
        fontSize: 16.0,
        fontWeight: '500',
        letterSpacing: 0.5,
        paddingHorizontal: 16.0,
        paddingVertical: 16.0,
        overflow: 'hidden',
        height: 52.0
    },
    backBtn: {
        paddingHorizontal: 16.0,
        paddingVertical: 16.0
    },
    BlankFilePage: {
        backgroundColor: '#fcfafa',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
