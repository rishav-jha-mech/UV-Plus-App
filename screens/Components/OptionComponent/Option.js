import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { faInfoCircle, faPen, faShareAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import OptionList from './OptionList'
import IfTheFileExists from '../../Scripts/fileExists'
import FileDoesNotExist from '../FileDoesNotExist'

const Option = (data) => {

    const FILE_NAME = data.filename
    const FILE_PATH = data.path
    const FILE_EXTENSION = data.ext
    const FILE_LASTMOD = data.last_mod
    const FILE_EXISTS = IfTheFileExists(FILE_PATH)

    // console.log(FILE_NAME)
    // console.log(FILE_PATH)
    // console.log(FILE_EXTENSION)
    // console.log(FILE_LASTMOD)

    const [showOption, setShowOption] = useState(true);
    const [showRename, setShowRename] = useState(false);
    // For share we wont be using useState hook cuz its not required
    const [ShowDelete, setShowDelete] = useState(false);
    const [ShowInfo, setShowInfo] = useState(false);

    return FILE_EXISTS ?(
        <>
            <View style={styles.Option}>

                <TouchableOpacity style={styles.OptionBtn}>
                    <OptionList icon={faPen} title="Rename" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.OptionBtn}>
                    <OptionList icon={faTrashAlt} title="Delete" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.OptionBtn}>
                    <OptionList icon={faShareAlt} title="Share" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.OptionBtn}>
                    <OptionList icon={faInfoCircle} title="Info" />
                </TouchableOpacity>

            </View>
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
        justifyContent: 'space-between',
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
