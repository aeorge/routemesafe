import React from 'react'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import { MapScreen } from './MapScreen'
import { SpotsScreen } from './SpotsScreen'
import { SettingsScreen } from './SettingsScreen'

export type BottomTabParamList = {
  Map: undefined
  Spots: undefined
  Settings: undefined
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>()

const options: BottomTabNavigationOptions = {
  tabBarActiveTintColor: '#DB2777',
  headerShown: false
}

export const MainScreen = (): JSX.Element => (
  <BottomTab.Navigator initialRouteName='Map' screenOptions={options}>
    <BottomTab.Screen name='Spots' component={SpotsScreen} />
    <BottomTab.Screen name='Map' component={MapScreen} />
    <BottomTab.Screen name='Settings' component={SettingsScreen} />
  </BottomTab.Navigator>
)
