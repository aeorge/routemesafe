import React from 'react'
import { View, Pressable, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { Spacer } from '../../../../components/Spacer'

export const SpotListHeader = (): JSX.Element => {
  const FilterIcon = (): JSX.Element => (
    <Icon name='filter' size={16} color='#475569' />
  )

  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <FilterIcon />
        <Spacer width={4} />
        <Text style={styles.buttonText}>Filter</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: '#E2E8F0'
  },
  buttonText: {
    fontSize: 16
  }
})
