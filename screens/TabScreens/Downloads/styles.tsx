import { StyleSheet } from "react-native";
import { Colors } from "../../constants";


export const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#fcfafa',
        flex: 1,
        flexDirection: 'row',
        height: 85,
        borderBottomColor: 'rgba(0,0,0,0.12)',
        borderBottomWidth: 1
    },
    fileIcon: {
        paddingLeft: 18.0,
        paddingRight: 12.0,
        justifyContent: 'center',
        alignContent: 'center',
    },
    dataContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingVertical: 8,
        paddingHorizontal: 10
    },
    Title: {
        fontSize: 14,
        lineHeight: 21,
        color: '#000'
    },
    SubTitle: {
        fontSize: 12
    },
    theButton: {
        paddingHorizontal: 14.0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    Modal: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    elipsi: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12.0,
    },
    dropdown: {
        backgroundColor: '#fff',
        elevation: 5,
        position: 'absolute',
        bottom: 6.0,
        right: 44.0,
        borderRadius: 6.0,
        paddingVertical: 4.0,
        minWidth: 140.0
    },
    dropdownbtn: {
        paddingVertical: 6.0,
        paddingHorizontal: 10.0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconContainer: {
        paddingRight: 6.0,
    }
});
