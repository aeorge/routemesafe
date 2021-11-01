import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack'
import { useAuth } from '../AuthProvider'
import { SplashScreen } from '../screens/SplashScreen'
import { SignInScreen } from '../screens/auth/SignInScreen'
import { SignUpScreen } from '../screens/auth/SignUpScreen'
import { MainScreen } from '../screens/main/MainScreen'
import { AddSpotModalScreen } from '../screens/main/Map/AddSpotModalScreen'
import { SpotDetailsModalScreen } from '../screens/main/Map/SpotDetailsModalScreen'

export type AuthStackParamList = {
  SignIn: undefined
  SignUp: undefined
}

export type MainStackParamList = {
  Main: undefined
  'Add Spot Modal': any
  'Spot Details Modal': any
}

const RootStack = createStackNavigator()
const AuthStack = createStackNavigator<AuthStackParamList>()
const MainStack = createStackNavigator<MainStackParamList>()

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
          <RootStack.Group>
            <AuthStack.Screen name='SignIn' component={SignInScreen} />
            <AuthStack.Screen name='SignUp' component={SignUpScreen} />
          </RootStack.Group>
        ) : (
          <RootStack.Group>
            <MainStack.Screen name='Main' component={MainScreen} />
            <MainStack.Group screenOptions={{ presentation: 'modal' }}>
              <MainStack.Screen
                name='Add Spot Modal'
                component={AddSpotModalScreen}
              />
              <MainStack.Screen
                name='Spot Details Modal'
                component={SpotDetailsModalScreen}
              />
            </MainStack.Group>
          </RootStack.Group>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
