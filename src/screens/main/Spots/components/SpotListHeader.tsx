import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Spacer } from '../../../../components/Spacer'

export const SpotListHeader = (): JSX.Element => {
  const FilterIcon = (): JSX.Element => (
    <Icon name='filter' size={14} color='#475569' />
  )

  return (
    <View style={styles.listHeaderContainer}>
      <Pressable style={styles.listHeaderButton}>
        <FilterIcon />
        <Spacer width={4} />
        <Text>Filter</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  listHeaderContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  listHeaderButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0'
  }
})
