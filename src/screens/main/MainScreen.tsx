import React from 'react'
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator
} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Feather'
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
  tabBarInactiveTintColor: '#475569',
  headerShown: false
}

const TabBarIcon = (name: string, focused: boolean): JSX.Element => (
  <Icon name={name} size={20} color={focused ? '#DB2777' : '#475569'} />
)

export const MainScreen = (): JSX.Element => (
  <BottomTab.Navigator initialRouteName='Map' screenOptions={options}>
    <BottomTab.Screen
      name='Spots'
      component={SpotsScreen}
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
