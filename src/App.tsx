import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from './AuthProvider'
import { Container } from './components/Container'

const App = (): JSX.Element => (
  <AuthProvider>
    <SafeAreaProvider>
      <Container />
    </SafeAreaProvider>
  </AuthProvider>
)

export default App
