import React, { useState } from 'react'
import { Pressable, StatusBar, StyleSheet, View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import MapboxGL, {
  CameraProps,
  CameraSettings,
  OnPressEvent,
  RegionPayload
} from '@react-native-mapbox-gl/maps'
import Geolocation from 'react-native-geolocation-service'
import Icon from 'react-native-vector-icons/Feather'
import env from '../../../env'
import { MapStackParamList } from '../MainScreen'
import { useSpots } from '../../../SpotProvider'

type MapScreenNavigationProp = StackNavigationProp<MapStackParamList, 'Map'>

type MapScreenProps = {
  navigation: MapScreenNavigationProp
}

MapboxGL.setAccessToken(env.MAPBOX_ACCESS_TOKEN)

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

  const { spots } = useSpots()

  const handleRegionWillChange = (
    feature: GeoJSON.Feature<GeoJSON.Point, RegionPayload>
  ) => {
    if (feature.properties.isUserInteraction) {
      setFollowUserLocation(false)
    }
  }

  const handleSpotDetails = (event: OnPressEvent) => {
    const { id } = event.features[0]
    navigation.navigate('Spot Details Modal', { id })
  }

  const handleAddSpot = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        navigation.navigate('Add Spot Modal', {
          coordinates: [position.coords.longitude, position.coords.latitude]
        })
      },
      (error) => {
        console.error(error)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )
  }

  const handleFollowUserLocation = () => {
    setFollowUserLocation(!followUserLocation)
  }

  const PlusIcon = (): JSX.Element => (
    <Icon name='plus' size={48} color='#DB2777' />
  )

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
          shape={{ type: 'FeatureCollection', features: spots }}
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
        <Pressable onPress={handleAddSpot} style={styles.addSpotButton}>
          <PlusIcon />
        </Pressable>
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
  addSpotButton: {
    position: 'absolute',
    bottom: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 9999,
    backgroundColor: '#FFFFFF',
    shadowColor: '#475569',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.4,
    shadowRadius: 4
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
