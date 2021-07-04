import React, { useRef, useState } from 'react'
import {
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput
} from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { AuthenticationStackParamList } from '../../components/Container'
import { useAuth } from '../../AuthProvider'
import { Divider } from '../../components/Divider'
import { Spacer } from '../../components/Spacer'

type SignUpScreenNavigationProp = StackNavigationProp<
  AuthenticationStackParamList,
  'SignUp'
>

type SignUpScreenProps = {
  navigation: SignUpScreenNavigationProp
}

export const SignUpScreen = ({
  navigation
}: SignUpScreenProps): JSX.Element => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const emailRef = useRef<TextInput | null>(null)
  const passwordRef = useRef<TextInput | null>(null)

  const { signUp } = useAuth()

  const handleSignUp = () => signUp(email, password)

  const handleNavigate = () => navigation.navigate('SignIn')

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.image}
      />
      <Spacer height={48} />
      <Text style={styles.text}>RouteMeSafe</Text>
      <Spacer height={32} />
      <Divider />
      <Spacer height={32} />
      <TextInput
        ref={emailRef}
        autoCapitalize='none'
        autoCorrect={false}
        blurOnSubmit={false}
        keyboardType='email-address'
        onChangeText={setEmail}
        onSubmitEditing={() => passwordRef.current?.focus()}
        placeholder='Email'
        placeholderTextColor='#94A3B8'
        returnKeyType='next'
        textContentType='emailAddress'
        style={styles.input}
        value={email}
      />
      <Spacer height={16} />
      <TextInput
        ref={passwordRef}
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={setPassword}
        placeholder='Password'
        placeholderTextColor='#94A3B8'
        returnKeyType='done'
        textContentType='password'
        secureTextEntry
        style={styles.input}
        value={password}
      />
      <Spacer height={32} />
      <Pressable onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </Pressable>
      <Spacer height={16} />
      <Pressable onPress={handleNavigate} style={styles.signInButton}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: '90%'
  },
  image: {
    width: 128,
    height: 128
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    height: 48,
    padding: 12,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#E2E8F0',
    fontSize: 16,
    color: '#0F172A'
  },
  signUpButton: {
    alignItems: 'center',
    width: '100%',
    height: 48,
    padding: 12,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'transparent',
    backgroundColor: '#DB2777'
  },
  signUpButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  signInButton: {
    alignItems: 'center',
    width: '100%',
    height: 48,
    padding: 12,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'transparent',
    backgroundColor: 'transparent'
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DB2777'
  }
})
