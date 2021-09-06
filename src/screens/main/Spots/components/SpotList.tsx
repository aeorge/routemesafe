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

type SpotListProps = {
  spots: any[]
}

type SpotDetailsScreenNavigationProp = StackNavigationProp<
  SpotsStackParamList,
  'Spots'
>

export const SpotList = ({ spots }: SpotListProps): JSX.Element => {
  const navigation = useNavigation<SpotDetailsScreenNavigationProp>()

  const VotingIcon = (): JSX.Element => (
    <Icon name='arrow-up' size={14} color='#475569' />
  )

  const ClockIcon = (): JSX.Element => (
    <Icon name='clock' size={14} color='#475569' />
  )

  const EllipsisIcon = (): JSX.Element => (
    <Icon name='more-horizontal' size={20} color='#475569' />
  )

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      // ListEmptyComponent={() => <View></View>}
      ListHeaderComponent={SpotListHeader}
      data={spots}
      renderItem={({ index, item: spot }) => (
        <View style={styles.spotContainer} key={index}>
          <Image
            source={require('../../../../assets/images/spots/danger.png')}
            style={styles.typeIcon}
          />
          <Spacer width={12} />
          <View style={styles.spotInner}>
            <Text style={styles.spotType}>{spot.properties.type}</Text>
            <Spacer height={8} />
            <Text>{spot.properties.comment}</Text>
            <Spacer height={8} />
            <View style={styles.spotMeta}>
              <View style={styles.spotMetaTagContainer}>
                <VotingIcon />
                <Spacer width={2} />
                <View style={styles.spotMetaTag}>
                  <Text style={styles.spotMetaText}>
                    {spot.properties.voting}
                  </Text>
                </View>
              </View>
              <Spacer width={8} />
              <View style={styles.spotMetaTagContainer}>
                <ClockIcon />
                <Spacer width={2} />
                <View style={styles.spotMetaTag}>
                  <Text style={styles.spotMetaText}>
                    {formatDate(spot.properties.date)}
                  </Text>
                </View>
              </View>
              <Spacer width={8} />
              <View
                style={{
                  ...styles.spotMetaTag,
                  backgroundColor: spot.properties.status
                    ? '#BBF7D0'
                    : '#FECACA'
                }}
              >
                <Text style={styles.spotMetaText}>
                  {spot.properties.status ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
          </View>
          <Spacer width={12} />
          <Pressable
            onPress={() => navigation.navigate('SpotDetails', spot)}
            style={styles.spotDetailsButton}
          >
            <EllipsisIcon />
          </Pressable>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  spotContainer: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 60,
    padding: 12
  },
  typeIcon: {
    alignSelf: 'flex-start',
    width: 32,
    height: 32
  },
  spotInner: {
    flex: 1
  },
  spotType: {
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
    fontSize: 12,
    color: '#1E293B'
  },
  spotDetailsButton: {
    alignSelf: 'flex-start'
  },
  separator: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#E2E8F0'
  }
})
