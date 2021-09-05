import React from 'react'
import {
  FlatList,
  View,
  Image,
  Text,
  Pressable,
  StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Spacer } from '../../../../components/Spacer'
import { formatDate } from '../../../../helpers/formatDate'

type SpotListProps = {
  spots: any[]
}

export const SpotList = ({ spots }: SpotListProps): JSX.Element => {
  const VotingIcon = (): JSX.Element => (
    <Icon name='arrow-up' size={14} color='#475569' />
  )

  const ClockIcon = (): JSX.Element => (
    <Icon name='clock' size={14} color='#475569' />
  )

  const EllipsisIcon = (): JSX.Element => (
    <Icon name='more-horizontal' size={20} color='#475569' />
  )

  const handleMoreInfo = () => null

  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      // ListEmptyComponent={() => <View></View>}
      // ListHeaderComponent={() => <View></View>}
      data={spots}
      renderItem={({ index, item }) => (
        <View style={styles.spot} key={index}>
          <Image
            source={require('../../../../assets/images/spots/danger.png')}
            style={styles.typeIcon}
          />
          <View style={styles.spotInner}>
            <Text style={styles.spotType}>{item.properties.type}</Text>
            <Spacer height={8} />
            <Text>{item.properties.comment}</Text>
            <Spacer height={8} />
            <View style={styles.spotMeta}>
              <View style={styles.spotMetaTagContainer}>
                <VotingIcon />
                <View style={styles.spotMetaTag}>
                  <Text style={styles.spotMetaText}>
                    {item.properties.voting}
                  </Text>
                </View>
              </View>
              <View style={styles.spotMetaTagContainer}>
                <ClockIcon />
                <View style={styles.spotMetaTag}>
                  <Text style={styles.spotMetaText}>
                    {formatDate(item.properties.date)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  ...styles.spotMetaTag,
                  backgroundColor: item.properties.status
                    ? '#BBF7D0'
                    : '#FECACA'
                }}
              >
                <Text style={styles.spotMetaText}>
                  {item.properties.status ? 'Active' : 'Inactive'}
                </Text>
              </View>
            </View>
          </View>
          <Pressable onPress={handleMoreInfo} style={styles.moreButton}>
            <EllipsisIcon />
          </Pressable>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  spot: {
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
    flex: 1,
    marginHorizontal: 12
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
  moreButton: {
    alignSelf: 'flex-start'
  },
  separator: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#E2E8F0'
  }
})
