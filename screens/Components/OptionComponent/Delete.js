// import React from 'react'
// import { StyleSheet, Text, Pressable,View,TouchableOpacity } from 'react-native'
// import deleteFile from '../../Scripts/deleteFile'

// const Delete = (data) => {
//     console.log(data.path)
//     return (
//         <Pressable style={styles.Container}>
//             <Text style={styles.Title}>Are you sure you want to delete this file ?</Text>
//             <Text style={styles.SubTitle} noOfLines={3}>File Name :  <Text style={styles.Details}>{data.name}</Text></Text>
//             <Text style={styles.SubTitle}>Ext :  <Text style={styles.Details}>.{data.ext}</Text></Text>
//             <Text style={styles.SubTitle}>File Size :  <Text style={styles.Details}>{data.size}</Text></Text>
//             <View style={styles.ButtonContainer}>
//                 <TouchableOpacity style={styles.theButton} onPress={() => deleteFile(data.path) }>
//                     <Text style={styles.theButtonText}>Delete</Text>
//                 </TouchableOpacity>
//             </View>
//         </Pressable>
//     )
// }

// export default Delete

// const styles = StyleSheet.create({
//     Container:{
//         backgroundColor:'#fff',
//         elevation:10,
//         borderRadius:16,
//         width:'75%',
//         minheight:'43%',
//         zIndex:15,
//         paddingVertical:14,
//         paddingHorizontal:20
//     },
//     Title:{
//         fontSize:21,
//         color:'#000',
//         fontWeight:'700',
//         marginVertical: 12,
//         textTransform:'capitalize',
//         letterSpacing:1
//     },
//     SubTitle:{
//         marginVertical:10,
//         color:'#6f00ff',
//         fontWeight:'800'
//     },
//     Details:{
//         lineHeight:22,
//         color:'black',
//         fontWeight:'700'
//     },
//     ButtonContainer:{
//         alignItems:'flex-end'
//     },
//     theButton:{
//         backgroundColor:'crimson',
//         paddingHorizontal:16,
//         paddingVertical:9,
//         borderRadius: 5
//     },
//     theButtonText:{
//         color:'#fff',
//         fontSize:16,
//         fontWeight:'700',
//         letterSpacing: 0.8
//     }
// })