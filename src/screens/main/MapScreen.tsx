import React from 'react'
import { StyleSheet, View } from 'react-native'
import MapboxGL from '@react-native-mapbox-gl/maps'

MapboxGL.setAccessToken('')

export const MapScreen = (): JSX.Element => (
  <View style={styles.container}>
    <MapboxGL.MapView style={styles.map} styleURL={MapboxGL.StyleURL.Light} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  }
})
