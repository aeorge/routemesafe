import React from 'react'
import { View } from 'react-native'

type SpacerProps = {
  width?: number
  height?: number
}

export const Spacer = ({ width, height }: SpacerProps): JSX.Element => (
  <View style={{ width, height }} />
)
