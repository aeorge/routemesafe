import React from 'react'
import { Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '../../AuthProvider'

export const SettingsScreen = (): JSX.Element => {
  const { signOut } = useAuth()

  const handleSignOut = () => signOut()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <StatusBar barStyle='dark-content' />
        <Pressable onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%'
  },
  signOutButton: {
    alignItems: 'center',
    width: '100%',
    height: 48,
    padding: 12,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'transparent',
    backgroundColor: '#E2E8F0'
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DB2777'
  }
})
