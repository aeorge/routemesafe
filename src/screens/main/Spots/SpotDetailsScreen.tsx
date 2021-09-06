import React from 'react'
import {
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
import { formatDate } from '../../../helpers/formatDate'

type SpotDetailsScreenProps = {
  route: Route<'SpotDetails', any>
  navigation: StackNavigationProp<SpotsStackParamList, 'Spots'>
}

export const SpotDetailsScreen = ({
  route,
  navigation
}: SpotDetailsScreenProps): JSX.Element => {
  const spot = route.params

  const handleBack = () => navigation.goBack()

  const BackIcon = (): JSX.Element => <Icon name='arrow-left' size={24} />

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
              <Text style={styles.spotType}>{spot?.properties.type}</Text>
            </View>
            <View style={styles.spotMeta}>
              <View style={styles.spotMetaTagContainer}>
                <VotingIcon />
                <View style={styles.spotMetaTag}>
                  <Text style={styles.spotMetaText}>
                    {spot?.properties.voting}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  ...styles.spotStatusTag,
                  backgroundColor: spot?.properties.status
                    ? '#BBF7D0'
                    : '#FECACA'
                }}
              >
                <Text style={styles.spotStatusText}>
                  {spot?.properties.status ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
          </View>
          <Spacer height={16} />
          <View>
            <Text style={styles.detailsLabel}>Images</Text>
            <Spacer height={8} />
            {spot?.properties.images.length ? (
              <View style={styles.imageContainer}>
                {spot.properties.images.map((image: string, index: number) => (
                  <View key={index}>
                    <Image source={{ uri: image }} style={styles.image} />
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.detailsText}>No images yet</Text>
            )}
          </View>
          <Spacer height={16} />
          <View>
            <Text style={styles.detailsLabel}>Comment</Text>
            <Spacer height={8} />
            <Text style={styles.detailsText}>{spot?.properties.comment}</Text>
          </View>
          <Spacer height={16} />
          <View>
            <Text style={styles.detailsLabel}>Date</Text>
            <Spacer height={8} />
            <Text style={styles.detailsText}>
              {formatDate(spot?.properties.date)}
            </Text>
          </View>
          <Spacer height={16} />
          <View></View>
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
    marginLeft: 12,
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
    height: 32,
    marginRight: 12
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
    alignItems: 'center',
    marginRight: 8
  },
  spotMetaTag: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: '#E2E8F0'
  },
  spotMetaText: {
    fontSize: 12,
    color: '#1E293B'
  },
  spotStatusTag: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4
  },
  spotStatusText: {
    fontSize: 12,
    color: '#1E293B'
  },
  detailsLabel: {
    fontWeight: 'bold'
  },
  detailsText: {
    color: '#475569'
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  image: {
    width: 60,
    height: 100,
    marginRight: 12,
    borderRadius: 4
  }
})
