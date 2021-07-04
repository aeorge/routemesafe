import React from 'react'
import { View } from 'react-native'

type SpacerProps = {
  height: number
}

export const Spacer = ({ height }: SpacerProps): JSX.Element => (
  <View style={{ height }} />
)
