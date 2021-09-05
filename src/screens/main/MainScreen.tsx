import React from 'react'
import {
  createStackNavigator,
  StackNavigationOptions
} from '@react-navigation/stack'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Feather'
import { MapScreen } from './MapScreen'
import { SpotsScreen } from './Spots/SpotsScreen'
import { SpotDetailsScreen } from './Spots/SpotDetailsScreen'
import { SettingsScreen } from './SettingsScreen'

export type BottomTabParamList = {
  Map: undefined
  SpotsStack: undefined
  Settings: undefined
}

export type SpotsStackParamList = {
  Spots: undefined
  SpotDetails: undefined
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>()
const SpotsStack = createStackNavigator<SpotsStackParamList>()

const stackOptions: StackNavigationOptions = {
  headerShown: false
}

const bottomTabOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: '#DB2777',
  tabBarInactiveTintColor: '#475569',
  headerShown: false
}

const TabBarIcon = (name: string, focused: boolean): JSX.Element => (
  <Icon name={name} size={20} color={focused ? '#DB2777' : '#475569'} />
)

const SpotsTabStack = () => (
  <SpotsStack.Navigator screenOptions={stackOptions}>
    <SpotsStack.Screen name='Spots' component={SpotsScreen} />
    <SpotsStack.Screen name='SpotDetails' component={SpotDetailsScreen} />
  </SpotsStack.Navigator>
)

export const MainScreen = (): JSX.Element => (
  <BottomTab.Navigator initialRouteName='Map' screenOptions={bottomTabOptions}>
    <BottomTab.Screen
      name='SpotsStack'
      component={SpotsTabStack}
      options={{ tabBarIcon: ({ focused }) => TabBarIcon('map-pin', focused) }}
    />
    <BottomTab.Screen
      name='Map'
      component={MapScreen}
      options={{ tabBarIcon: ({ focused }) => TabBarIcon('map', focused) }}
    />
    <BottomTab.Screen
      name='Settings'
      component={SettingsScreen}
      options={{ tabBarIcon: ({ focused }) => TabBarIcon('settings', focused) }}
    />
  </BottomTab.Navigator>
)
