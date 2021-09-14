import React, { useState } from 'react'
import { Pressable, StatusBar, StyleSheet, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import MapboxGL, {
  CameraProps,
  CameraSettings,
  OnPressEvent,
  RegionPayload
} from '@react-native-mapbox-gl/maps'
import Icon from 'react-native-vector-icons/Feather'
import { MapStackParamList } from '../MainScreen'

type MapScreenNavigationProp = StackNavigationProp<MapStackParamList, 'Map'>

type MapScreenProps = {
  navigation: MapScreenNavigationProp
}

MapboxGL.setAccessToken('')

const defaultSettings: CameraSettings = {
  centerCoordinate: [9.1829, 48.7758],
  zoomLevel: 10
}

const mapSettings: CameraProps = {
  minZoomLevel: 1,
  maxZoomLevel: 20
}

export const MapScreen = ({ navigation }: MapScreenProps): JSX.Element => {
  const [followUserLocation, setFollowUserLocation] = useState<boolean>(true)

  const handleRegionWillChange = (
    feature: GeoJSON.Feature<GeoJSON.Point, RegionPayload>
  ) => {
    if (feature.properties.isUserInteraction) {
      setFollowUserLocation(false)
    }
  }

  const handleFollowUserLocation = () => {
    setFollowUserLocation(!followUserLocation)
  }

  const handleSpotDetails = (event: OnPressEvent) => {
    const spot = event.features[0]
    navigation.navigate('Spot Details Modal', spot)
  }

  const NavigationIcon = (): JSX.Element => (
    <Icon
      name='navigation'
      size={24}
      color={followUserLocation ? '#DB2777' : '#475569'}
    />
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <MapboxGL.MapView
        style={styles.map}
        styleURL={MapboxGL.StyleURL.Light}
        tintColor='#DB2777'
        onRegionWillChange={handleRegionWillChange}
      >
        <MapboxGL.Camera
          defaultSettings={defaultSettings}
          followUserLocation={followUserLocation}
          {...mapSettings}
        />
        <MapboxGL.UserLocation renderMode='native' />
        <MapboxGL.ShapeSource
          id='spots'
          shape={{ type: 'FeatureCollection', features: [] }}
          onPress={(event) => handleSpotDetails(event)}
        >
          <MapboxGL.SymbolLayer
            id='danger'
            filter={['==', 'type', 'danger']}
            style={{
              iconImage: require('../../../assets/images/spots/danger.png'),
              iconSize: 0.1,
              iconAllowOverlap: true
            }}
          />
          <MapboxGL.SymbolLayer
            id='construction'
            filter={['==', 'type', 'construction']}
            style={{
              iconImage: require('../../../assets/images/spots/construction.png'),
              iconSize: 0.1,
              iconAllowOverlap: true
            }}
          />
          <MapboxGL.SymbolLayer
            id='uneven'
            filter={['==', 'type', 'uneven']}
            style={{
              iconImage: require('../../../assets/images/spots/uneven.png'),
              iconSize: 0.1,
              iconAllowOverlap: true
            }}
          />
          <MapboxGL.SymbolLayer
            id='narrow'
            filter={['==', 'type', 'narrow']}
            style={{
              iconImage: require('../../../assets/images/spots/narrow.png'),
              iconSize: 0.1,
              iconAllowOverlap: true
            }}
          />
        </MapboxGL.ShapeSource>
        <Pressable
          onPress={handleFollowUserLocation}
          style={styles.followUserLocationButton}
        >
          <NavigationIcon />
        </Pressable>
      </MapboxGL.MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  map: {
    flex: 1
  },
  followUserLocationButton: {
    position: 'absolute',
    bottom: 50,
    right: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 9999,
    backgroundColor: '#FFFFFF',
    shadowColor: '#475569',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.4,
    shadowRadius: 4
  }
})
