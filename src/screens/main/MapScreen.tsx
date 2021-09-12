import React, { useState } from 'react'
import { Pressable, StatusBar, StyleSheet, View } from 'react-native'
import MapboxGL, {
  CameraProps,
  CameraSettings,
  RegionPayload
} from '@react-native-mapbox-gl/maps'
import Icon from 'react-native-vector-icons/Feather'

MapboxGL.setAccessToken('')

const defaultSettings: CameraSettings = {
  centerCoordinate: [9.1829, 48.7758],
  zoomLevel: 10
}

const mapSettings: CameraProps = {
  minZoomLevel: 1,
  maxZoomLevel: 20
}

export const MapScreen = (): JSX.Element => {
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
    flex: 1
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
