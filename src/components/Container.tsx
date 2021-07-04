import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack'
import { useAuth } from '../AuthProvider'
import { SplashScreen } from '../screens/SplashScreen'
import { SignInScreen } from '../screens/authentication/SignInScreen'
import { SignUpScreen } from '../screens/authentication/SignUpScreen'
import { HomeScreen } from '../screens/HomeScreen'

export type AuthenticationStackParamList = {
  SignIn: undefined
  SignUp: undefined
}

export type AppStackParamList = {
  Home: undefined
}

const RootStack = createStackNavigator()
const AuthenticationStack = createStackNavigator<AuthenticationStackParamList>()
const AppStack = createStackNavigator<AppStackParamList>()

const options: StackNavigationOptions = {
  headerShown: false
}

export const Container = (): JSX.Element => {
  const { user, loading } = useAuth()

  if (loading) return <SplashScreen />

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={options}>
        {user === null ? (
          <>
            <AuthenticationStack.Screen
              name='SignIn'
              component={SignInScreen}
            />
            <AuthenticationStack.Screen
              name='SignUp'
              component={SignUpScreen}
            />
          </>
        ) : (
          <AppStack.Screen name='Home' component={HomeScreen} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
