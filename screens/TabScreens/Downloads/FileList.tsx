import React from 'react'
import File from './File';
import RNFS from 'react-native-fs';
import Directory from './Directory';

type FileListType = {
    data: RNFS.ReadDirItem,
    setPath: Function,
    setLoading: Function,
    setShowModal: Function,
    setModalText: Function,
}

const FileList: React.FC<FileListType> = ({ data, setPath, setLoading, setModalText, setShowModal }) => { // By default it is sorted by recent old order
    return data.isFile() ? <File data={data} reload={setLoading} setShowModal={setShowModal} setModalText={setModalText} /> : <Directory data={data} setPath={setPath} setShowModal={setShowModal} setModalText={setModalText} />;
}

export default FileList