import React, { useCallback, useState } from 'react'
import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Route } from '@react-navigation/routers'
import { StackNavigationProp } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import MapboxGL from '@react-native-mapbox-gl/maps'
import Icon from 'react-native-vector-icons/Feather'
import env from '../../../env'
import { Spot } from '../../../types'
import { SpotsStackParamList } from '../MainScreen'
import { Spacer } from '../../../components/Spacer'
import { formatDateTime } from '../../../helpers/formatDateTime'
import { getSeverityColor } from '../../../helpers/getSeverityColor'
import { getStatusColor } from '../../../helpers/getStatusColor'

type SpotDetailsScreenNavigationProp = StackNavigationProp<
  SpotsStackParamList,
  'Spot Details'
>

type SpotDetailsScreenProps = {
  route: Route<'Spot Details', { id: string }>
  navigation: SpotDetailsScreenNavigationProp
}

export const SpotDetailsScreen = ({
  route,
  navigation
}: SpotDetailsScreenProps): JSX.Element => {
  const { id } = route.params

  const [spot, setSpot] = useState<Spot>()

  useFocusEffect(
    useCallback(() => {
      const fetchSpot = async () => {
        try {
          const response = await fetch(`${env.API_URL}/api/spots/${id}`)
          const spot = await response.json()
          setSpot(spot)
        } catch (error) {
          console.error(error)
        }
      }

      fetchSpot()
    }, [id])
  )

  const handleBack = () => navigation.goBack()

  const BackIcon = (): JSX.Element => <Icon name='arrow-left' size={32} />

  const SeverityIcon = (): JSX.Element => (
    <Icon name='chevrons-up' size={16} color='#475569' />
  )

  const VotingIcon = (): JSX.Element => (
    <Icon name='arrow-up' size={16} color='#475569' />
  )

  // TODO Render skeleton
  if (!spot) return <View />

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <StatusBar barStyle='dark-content' />
        <Spacer height={16} />
        <View style={styles.headingContainer}>
          <Pressable onPress={handleBack}>
            <BackIcon />
          </Pressable>
          <Spacer width={12} />
          <Text style={styles.heading}>Spot Details</Text>
        </View>
        <Spacer height={16} />
        <View style={styles.detailsContainer}>
          <View style={styles.detailsHeadingContainer}>
            <View style={styles.detailsHeading}>
              <Image
                source={require('../../../assets/images/spots/danger.png')}
                style={styles.typeIcon}
              />
              <Spacer width={12} />
              <Text style={styles.spotType}>{spot.properties.type}</Text>
            </View>
            <View style={styles.meta}>
              <View style={styles.metaTagContainer}>
                <SeverityIcon />
                <Spacer width={2} />
                <View
                  style={{
                    ...styles.metaTag,
                    backgroundColor: getSeverityColor(spot.properties.severity)
                  }}
                >
                  <Text style={styles.metaTagText}>
                    {spot.properties.severity}
                  </Text>
                </View>
              </View>
              <Spacer width={8} />
              <View style={styles.metaTagContainer}>
                <VotingIcon />
                <Spacer width={2} />
                <View style={styles.metaTag}>
                  <Text style={styles.metaTagText}>
                    {spot.properties.voting}
                  </Text>
                </View>
              </View>
              <Spacer width={8} />
              <View
                style={{
                  ...styles.metaTag,
                  backgroundColor: getStatusColor(spot.properties.status)
                }}
              >
                <Text style={styles.metaTagText}>{spot.properties.status}</Text>
              </View>
            </View>
          </View>
          <Spacer height={16} />
          <View style={styles.mapContainer}>
            <MapboxGL.MapView
              style={styles.map}
              styleURL={MapboxGL.StyleURL.Light}
            >
              <MapboxGL.Camera
                defaultSettings={{
                  centerCoordinate: [
                    spot.geometry.coordinates[0],
                    spot.geometry.coordinates[1]
                  ],
                  zoomLevel: 16
                }}
              />
              <MapboxGL.MarkerView
                id={id}
                coordinate={[
                  spot.geometry.coordinates[0],
                  spot.geometry.coordinates[1]
                ]}
              />
            </MapboxGL.MapView>
          </View>
          <Spacer height={16} />
          <View>
            <Text style={styles.detailsLabel}>Images</Text>
            <Spacer height={8} />
            <FlatList
              ItemSeparatorComponent={() => <Spacer width={12} />}
              ListEmptyComponent={() => (
                <Text style={styles.detailsText}>No images yet</Text>
              )}
              data={spot.properties.images}
              horizontal
              renderItem={({ index, item: image }) => (
                <View key={index}>
                  <Image source={{ uri: image }} style={styles.image} />
                </View>
              )}
            />
          </View>
          <Spacer height={16} />
          <View>
            <Text style={styles.detailsLabel}>Comment</Text>
            <Spacer height={8} />
            <Text style={styles.detailsText}>
              {spot.properties.comment || '-'}
            </Text>
          </View>
          <Spacer height={16} />
          <View style={styles.detailsHorizontalContainer}>
            <View style={styles.detailsHorizontalInner}>
              <Text style={styles.detailsLabel}>Created At</Text>
              <Spacer height={8} />
              <Text style={styles.detailsText}>
                {formatDateTime(spot.properties.createdAt)}
              </Text>
            </View>
            <View style={styles.detailsHorizontalInner}>
              <Text style={styles.detailsLabel}>Updated At</Text>
              <Spacer height={8} />
              <Text style={styles.detailsText}>
                {formatDateTime(spot.properties.updatedAt)}
              </Text>
            </View>
          </View>
          <Spacer height={16} />
          <View style={styles.detailsHorizontalContainer}>
            <View style={styles.detailsHorizontalInner}>
              <Text style={styles.detailsLabel}>Latitude</Text>
              <Spacer height={8} />
              <Text style={styles.detailsText}>
                {spot.geometry.coordinates[1]}
              </Text>
            </View>
            <View style={styles.detailsHorizontalInner}>
              <Text style={styles.detailsLabel}>Longitude</Text>
              <Spacer height={8} />
              <Text style={styles.detailsText}>
                {spot.geometry.coordinates[0]}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  inner: {
    flex: 1,
    alignSelf: 'center',
    width: '90%'
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  detailsContainer: {
    display: 'flex'
  },
  detailsHeadingContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  detailsHeading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  typeIcon: {
    width: 32,
    height: 32
  },
  spotType: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  meta: {
    display: 'flex',
    flexDirection: 'row'
  },
  metaTagContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  metaTag: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#E2E8F0'
  },
  metaTagText: {
    fontSize: 16,
    color: '#1E293B',
    textTransform: 'capitalize'
  },
  mapContainer: {
    borderWidth: 4,
    borderRadius: 4,
    borderColor: '#E2E8F0'
  },
  map: {
    width: '100%',
    height: 200
  },
  image: {
    width: 60,
    height: 100,
    borderRadius: 4
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  detailsText: {
    fontSize: 16,
    color: '#475569'
  },
  detailsHorizontalContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  detailsHorizontalInner: {
    flex: 1
  }
})
