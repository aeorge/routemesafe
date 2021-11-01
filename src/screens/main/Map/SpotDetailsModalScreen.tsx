import React, { useCallback, useState } from 'react'
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Route } from '@react-navigation/routers'
import Icon from 'react-native-vector-icons/Feather'
import env from '../../../env'
import { Spot } from '../../../types'
import { Spacer } from '../../../components/Spacer'
import { formatDateTime } from '../../../helpers/formatDateTime'
import { getSeverityColor } from '../../../helpers/getSeverityColor'
import { getStatusColor } from '../../../helpers/getStatusColor'

type SpotDetailsModalScreenProps = {
  route: Route<'Spot Details Modal', { id: string }>
}

export const SpotDetailsModalScreen = ({
  route
}: SpotDetailsModalScreenProps): JSX.Element => {
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

  const handleVote = async ({
    type,
    spot
  }: {
    type: 'up' | 'down'
    spot: Spot
  }) => {
    const voting =
      type === 'up' ? spot.properties.voting + 1 : spot.properties.voting - 1

    try {
      await fetch(`${env.API_URL}/api/spots/${id}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ voting })
      })

      setSpot({
        ...spot,
        properties: {
          ...spot.properties,
          voting
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const SeverityIcon = (): JSX.Element => (
    <Icon name='chevrons-up' size={16} color='#475569' />
  )

  const UpvoteIcon = (): JSX.Element => (
    <Icon name='arrow-up' size={16} color='#475569' />
  )

  const DownvoteIcon = (): JSX.Element => (
    <Icon name='arrow-down' size={16} color='#475569' />
  )

  // TODO Render skeleton
  if (!spot) return <View />

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Spacer height={32} />
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Spot Details</Text>
          <View style={styles.headingVotingButtonContainer}>
            <Pressable
              onPress={() => handleVote({ type: 'up', spot })}
              style={styles.headingVotingButton}
            >
              <UpvoteIcon />
            </Pressable>
            <Spacer width={8} />
            <Pressable
              onPress={() => handleVote({ type: 'down', spot })}
              style={styles.headingVotingButton}
            >
              <DownvoteIcon />
            </Pressable>
          </View>
        </View>
        <Spacer height={16} />
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
              <UpvoteIcon />
              <Spacer width={2} />
              <View style={styles.metaTag}>
                <Text style={styles.metaTagText}>{spot.properties.voting}</Text>
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
          <Text style={styles.detailsText}>{spot.properties.comment}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headingText: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  headingVotingButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headingVotingButton: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0'
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
