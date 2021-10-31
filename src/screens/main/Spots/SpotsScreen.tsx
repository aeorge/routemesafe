import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSpots } from '../../../SpotProvider'
import { SpotList } from './components/SpotList'
import { Spacer } from '../../../components/Spacer'

export const SpotsScreen = (): JSX.Element => {
  const { spots } = useSpots()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <StatusBar barStyle='dark-content' />
        <Spacer height={16} />
        <Text style={styles.heading}>Spots</Text>
        <Spacer height={16} />
        <SpotList spots={spots} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
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
