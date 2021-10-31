import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from './AuthProvider'
import { SpotProvider } from './SpotProvider'
import { Container } from './components/Container'

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <SpotProvider>
          <Container />
        </SpotProvider>
      </SafeAreaProvider>
    </AuthProvider>
  )
}

export default App
