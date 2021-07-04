import React from 'react'
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native'

export const SplashScreen = (): JSX.Element => (
  <View style={styles.container}>
    <StatusBar barStyle='dark-content' />
    <ActivityIndicator size='large' color='#DB2777' />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
})
