import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { faInfoCircle, faPen, faShareAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import IfTheFileExists from '../../Scripts/fileExists'
import FileDoesNotExist from '../FileDoesNotExist'
import Info from './Info'

// Imports below will be uncommented once these packages by community actually works !
// import OptionList from './OptionList'
// import Delete from './Delete'
// import Rename from './Rename'

const Option = (data) => {

    const FILE_NAME = data.filename
    const FILE_PATH = data.path
    const FILE_EXTENSION = data.ext
    const FILE_LASTMOD = data.last_mod
    const FILE_SIZE = data.size

    const FILE_EXISTS = IfTheFileExists(FILE_PATH)

    const [showOption, setShowOption] = useState(true);
    // const [showRename, setShowRename] = useState(false);
    // For share we wont be using useState hook cuz its not required
    // const [ShowDelete, setShowDelete] = useState(false);
    // const [ShowInfo, setShowInfo] = useState(false);

    return FILE_EXISTS ?(
        <>
            <Info name={FILE_NAME} ext={FILE_EXTENSION} size={FILE_SIZE} lastMod={FILE_LASTMOD} />

            {/* 
            <View style={styles.Option}>
                <TouchableOpacity style={styles.OptionBtn}  onPress={() => {setShowOption(false);setShowRename(true)}} >
                    <OptionList icon={faPen} title="Rename" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.OptionBtn} onPress={() => {setShowOption(false);setShowDelete(true)}} >
                    <OptionList icon={faTrashAlt} title="Delete" />
                </TouchableOpacity> *

                <TouchableOpacity style={styles.OptionBtn}>
                    <OptionList icon={faShareAlt} title="Share" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.OptionBtn} onPress={() => {setShowOption(false);setShowInfo(true)}} >
                    <OptionList icon={faInfoCircle} title="Info" />
                </TouchableOpacity>
            </View>
            */}
        {/* : (showRename) ? (<Rename name={FILE_NAME} ext={FILE_EXTENSION} size={FILE_SIZE} lastMod={FILE_LASTMOD} />) */}
        {/* : (ShowDelete) ? (<Delete name={FILE_NAME} ext={FILE_EXTENSION} path={FILE_PATH} size={FILE_SIZE} />) */}
        {/* : (ShowInfo)   ? (<Info name={FILE_NAME} ext={FILE_EXTENSION} size={FILE_SIZE} lastMod={FILE_LASTMOD} />) */}

        </>
    ):
    (
        <FileDoesNotExist />
    )
}
export default Option

const styles = StyleSheet.create({
    Option: {
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        zIndex: 10,
        padding: 12,
        paddingHorizontal: 16,
        elevation: 10,
        borderRadius: 16,
        width: '55%',
        height: '30%'
    },
    OptionBtn: {
        marginVertical: 5,
        paddingHorizontal: 8,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
})
