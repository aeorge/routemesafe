import React from 'react'
import {
  FlatList,
  View,
  Image,
  Text,
  Pressable,
  StyleSheet
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Feather'
import { SpotsStackParamList } from '../../MainScreen'
import { SpotListHeader } from './SpotListHeader'
import { Spacer } from '../../../../components/Spacer'
import { formatDate } from '../../../../helpers/formatDate'
import { getSeverityColor } from '../../../../helpers/getSeverityColor'
import { getStatusColor } from '../../../../helpers/getStatusColor'
import { getStatusText } from '../../../../helpers/getStatusText'

type SpotListProps = {
  spots: any[]
}

type SpotListScreenNavigationProp = StackNavigationProp<
  SpotsStackParamList,
  'Spots'
>

export const SpotList = ({ spots }: SpotListProps): JSX.Element => {
  const navigation = useNavigation<SpotListScreenNavigationProp>()

  const CommentIcon = (): JSX.Element => (
    <Icon name='message-circle' size={16} color='#475569' />
  )

  const SeverityIcon = (): JSX.Element => (
    <Icon name='chevrons-up' size={16} color='#475569' />
  )

  const VotingIcon = (): JSX.Element => (
    <Icon name='arrow-up' size={16} color='#475569' />
  )

  const ClockIcon = (): JSX.Element => (
    <Icon name='clock' size={16} color='#475569' />
  )

  const EllipsisIcon = (): JSX.Element => (
    <Icon name='more-horizontal' size={20} color='#475569' />
  )

  const MapIcon = (): JSX.Element => (
    <Icon name='map' size={20} color='#475569' />
  )

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      // ListEmptyComponent={() => <View></View>}
      ListHeaderComponent={SpotListHeader}
      data={spots}
      renderItem={({ index, item: spot }) => (
        <View style={styles.container} key={index}>
          <View style={styles.detailsContainer}>
            <View style={styles.heading}>
              <Image
                source={require('../../../../assets/images/spots/danger.png')}
                style={styles.typeIcon}
              />
              <Spacer width={8} />
              <Text style={styles.typeText}>{spot.properties.type}</Text>
            </View>
            <Spacer height={12} />
            <View style={styles.commentContainer}>
              <CommentIcon />
              <Spacer width={2} />
              <Text style={styles.comment}>{spot.properties.comment}</Text>
            </View>
            <Spacer height={12} />
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
              <View style={styles.metaTagContainer}>
                <ClockIcon />
                <Spacer width={2} />
                <View style={styles.metaTag}>
                  <Text style={styles.metaTagText}>
                    {formatDate(spot.properties.createdAt)}
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
                <Text style={styles.metaTagText}>
                  {getStatusText(spot.properties.status)}
                </Text>
              </View>
            </View>
          </View>
          <Spacer width={12} />
          <View style={styles.spotActionContainer}>
            <Pressable
              onPress={() => navigation.navigate('Spot Details', spot)}
            >
              <EllipsisIcon />
            </Pressable>
            <Pressable>
              <MapIcon />
            </Pressable>
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 60,
    paddingHorizontal: 12,
    paddingVertical: 18
  },
  detailsContainer: {
    flex: 1
  },
  heading: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  typeIcon: {
    alignSelf: 'flex-start',
    width: 32,
    height: 32
  },
  typeText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  commentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  comment: {
    fontSize: 16
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
    color: '#1E293B'
  },
  spotActionContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  separator: {
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#E2E8F0'
  }
})
