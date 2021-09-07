import React from 'react'
import {
  FlatList,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Route } from '@react-navigation/routers'
import { StackNavigationProp } from '@react-navigation/stack'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Feather'
import { SpotsStackParamList } from '../MainScreen'
import { Spacer } from '../../../components/Spacer'
import { formatDateTime } from '../../../helpers/formatDateTime'
import { getSeverityColor } from '../../../helpers/getSeverityColor'
import { getStatusColor } from '../../../helpers/getStatusColor'
import { getStatusText } from '../../../helpers/getStatusText'

type SpotDetailsScreenNavigationProp = StackNavigationProp<
  SpotsStackParamList,
  'SpotDetails'
>

type SpotDetailsScreenProps = {
  route: Route<'SpotDetails', any>
  navigation: SpotDetailsScreenNavigationProp
}

export const SpotDetailsScreen = ({
  route,
  navigation
}: SpotDetailsScreenProps): JSX.Element => {
  const spot = route.params

  const handleBack = () => navigation.goBack()

  const BackIcon = (): JSX.Element => <Icon name='arrow-left' size={24} />

  const SeverityIcon = (): JSX.Element => (
    <Icon name='chevrons-up' size={14} color='#475569' />
  )

  const VotingIcon = (): JSX.Element => (
    <Icon name='arrow-up' size={14} color='#475569' />
  )

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
              <Text style={styles.spotType}>{spot?.properties.type}</Text>
            </View>
            <View style={styles.spotMeta}>
              <View style={styles.spotMetaTagContainer}>
                <SeverityIcon />
                <Spacer width={2} />
                <View
                  style={{
                    ...styles.spotMetaTag,
                    backgroundColor: getSeverityColor(spot?.properties.severity)
                  }}
                >
                  <Text style={styles.spotMetaText}>
                    {spot?.properties.severity}
                  </Text>
                </View>
              </View>
              <Spacer width={8} />
              <View style={styles.spotMetaTagContainer}>
                <VotingIcon />
                <Spacer width={2} />
                <View style={styles.spotMetaTag}>
                  <Text style={styles.spotMetaText}>
                    {spot?.properties.voting}
                  </Text>
                </View>
              </View>
              <Spacer width={8} />
              <View
                style={{
                  ...styles.spotMetaTag,
                  backgroundColor: getStatusColor(spot?.properties.status)
                }}
              >
                <Text style={styles.spotMetaText}>
                  {getStatusText(spot?.properties.status)}
                </Text>
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
              data={spot?.properties.images}
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
            <Text style={styles.detailsText}>{spot?.properties.comment}</Text>
          </View>
          <Spacer height={16} />
          <View>
            <Text style={styles.detailsLabel}>Created At</Text>
            <Spacer height={8} />
            <Text style={styles.detailsText}>
              {formatDateTime(spot?.properties.createdAt)}
            </Text>
          </View>
          <Spacer height={16} />
          <View>
            <Text style={styles.detailsLabel}>Updated At</Text>
            <Spacer height={8} />
            <Text style={styles.detailsText}>
              {formatDateTime(spot?.properties.updatedAt)}
            </Text>
          </View>
          <Spacer height={16} />
          <Text style={styles.detailsLabel}>Latitude</Text>
          <Spacer height={8} />
          <Text style={styles.detailsText}>
            {spot?.geometry.coordinates[1]}
          </Text>
          <Spacer height={16} />
          <Text style={styles.detailsLabel}>Longitude</Text>
          <Spacer height={8} />
          <Text style={styles.detailsText}>
            {spot?.geometry.coordinates[0]}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    fontSize: 18,
    fontWeight: 'bold'
  },
  spotMeta: {
    display: 'flex',
    flexDirection: 'row'
  },
  spotMetaTagContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  spotMetaTag: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#E2E8F0'
  },
  spotMetaText: {
    color: '#1E293B'
  },
  image: {
    width: 60,
    height: 100,
    borderRadius: 4
  },
  detailsLabel: {
    fontWeight: 'bold'
  },
  detailsText: {
    color: '#475569'
  }
})
