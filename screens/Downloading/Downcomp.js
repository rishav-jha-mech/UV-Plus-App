import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { Circle } from 'react-native-progress';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const Downcomp = () => {

    const [progress, setProgress] = useState(0)

    useEffect(() => {
    
        setTimeout(() => {
            setProgress((progress + 0.01))
        }, 1000);
    
    }, [progress])

  return (
    <Pressable style={styles.Container}>
        <View style={styles.CircleContainer}>
            <Circle 
                size={60} 
                progress={progress}
                endAngle={0.0}
                thickness={3}
                showsText={true} 
                textStyle={{fontSize: 14.0,fontWeight: '600'}}
                strokeCap={"round"}
            />
        </View>
        <View style={styles.textContainer}>
            <Text style={styles.bigText} numberOfLines={1}>
                THis is a big big big  file name THis is a big big big file name
                THis is a big big big file name
            </Text>
            <Text style={styles.smolText} numberOfLines={1}>
                PKMKB
            </Text>
        </View>
        <View style={styles.eliipBtn}>
            <Pressable>
                <FontAwesomeIcon icon={faEllipsisV} size={23} color={'#333'} />
            </Pressable>
        </View>
    </Pressable>
  )
}

export default Downcomp

const styles = StyleSheet.create({
    Container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal: 2.0,
        paddingVertical: 12.0,
        marginVertical: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        height: 90.0
    },
    textContainer:{
        flex: 1,
        height: '100%',
        paddingHorizontal: 10.0,
        paddingVertical: 2.0,
        justifyContent: 'space-between'
    },
    bigText:{
        color: '#333'
    },
    smolText:{
        fontSize: 12.0
    }
})