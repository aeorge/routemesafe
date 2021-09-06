import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SpotList } from './components/SpotList'
import { Spacer } from '../../../components/Spacer'

const data: any[] = []

export const SpotListScreen = (): JSX.Element => (
  <SafeAreaView style={styles.container}>
    <View style={styles.inner}>
      <StatusBar barStyle='dark-content' />
      <Spacer height={16} />
      <Text style={styles.heading}>Spots</Text>
      <Spacer height={16} />
      <SpotList spots={data} />
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    flex: 1,
    alignSelf: 'center',
    width: '90%'
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold'
  }
})
