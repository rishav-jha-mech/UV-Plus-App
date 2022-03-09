import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import Downcomp from './Downcomp';

const Downloading = () => {

  const [loading, setloading] = useState(true);



  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <View style={styles.Container}>
        <Text style={styles.topHeading}>Downloading</Text>
        <Downcomp />
      </View>
    </ScrollView>
  )
}

export default Downloading

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10.0
  },
  topHeading: {
    fontSize: 22.0,
    fontWeight: '700',
    paddingVertical: 16.0,
    color: '#333',
    borderBottomWidth: 1.0,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 6.0
  },
  downloadView: {
    flex: 1,
    backgroundColor: '#ff56'
  }
});