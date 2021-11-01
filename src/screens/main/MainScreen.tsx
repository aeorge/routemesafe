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
import { MapScreen } from './Map/MapScreen'
import { SpotsScreen } from './Spots/SpotsScreen'
import { SpotDetailsScreen } from './Spots/SpotDetailsScreen'
import { SettingsScreen } from './SettingsScreen'

export type BottomTabParamList = {
  'Map Tab': undefined
  'Spots Tab': undefined
  'Settings Tab': undefined
}

export type SpotsStackParamList = {
  Spots: undefined
  'Spot Details': any
}

export type MapStackParamList = {
  Map: undefined
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>()
const SpotsStack = createStackNavigator<SpotsStackParamList>()
const MapStack = createStackNavigator<MapStackParamList>()

const stackOptions: StackNavigationOptions = {
  headerShown: false
}

const bottomTabOptions: BottomTabNavigationOptions = {
  tabBarActiveTintColor: '#DB2777',
  tabBarInactiveTintColor: '#475569',
  headerShown: false
}

const TabBarIcon = (name: string, focused: boolean): JSX.Element => (
  <Icon name={name} size={24} color={focused ? '#DB2777' : '#475569'} />
)

const SpotsTabStack = () => (
  <SpotsStack.Navigator screenOptions={stackOptions}>
    <SpotsStack.Screen name='Spots' component={SpotsScreen} />
    <SpotsStack.Screen name='Spot Details' component={SpotDetailsScreen} />
  </SpotsStack.Navigator>
)

const MapTabStack = () => (
  <MapStack.Navigator screenOptions={stackOptions}>
    <MapStack.Screen name='Map' component={MapScreen} />
  </MapStack.Navigator>
)

export const MainScreen = (): JSX.Element => (
  <>
    <BottomTab.Navigator
      initialRouteName='Map Tab'
      screenOptions={bottomTabOptions}
    >
      <BottomTab.Screen
        name='Spots Tab'
        component={SpotsTabStack}
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon('map-pin', focused),
          tabBarLabel: 'Spots'
        }}
      />
      <BottomTab.Screen
        name='Map Tab'
        component={MapTabStack}
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon('map', focused),
          tabBarLabel: 'Map'
        }}
      />
      <BottomTab.Screen
        name='Settings Tab'
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused }) => TabBarIcon('settings', focused),
          tabBarLabel: 'Settings'
        }}
      />
    </BottomTab.Navigator>
  </>
)
