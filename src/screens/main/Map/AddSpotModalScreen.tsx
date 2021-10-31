import React, { useState } from 'react'
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import { Route } from '@react-navigation/routers'
import { StackNavigationProp } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/Feather'
import env from '../../../env'
import { SpotSeverity, SpotStatus, SpotType } from '../../../types'
import { MapStackParamList } from '../MainScreen'
import { useSpots } from '../../../SpotProvider'
import { Spacer } from '../../../components/Spacer'
import { getSeverityColor } from '../../../helpers/getSeverityColor'

type AddSpotModalScreenNavigationProp = StackNavigationProp<
  MapStackParamList,
  'Add Spot Modal'
>

type AddSpotModalScreenProps = {
  route: Route<'Add Spot Modal', { coordinates: GeoJSON.Position }>
  navigation: AddSpotModalScreenNavigationProp
}

type AddSpotForm = {
  type?: SpotType
  severity?: SpotSeverity
  comment?: string
  images: string[]
}

export const AddSpotModalScreen = ({
  route,
  navigation
}: AddSpotModalScreenProps): JSX.Element => {
  const { coordinates } = route.params

  const [form, setForm] = useState<AddSpotForm>({
    type: undefined,
    severity: undefined,
    comment: undefined,
    images: []
  })

  const { spots, setSpots } = useSpots()

  const handleAddSpot = async () => {
    if (!form.type) {
      return Alert.alert('Please select the type of this spot.')
    }

    if (!form.severity) {
      return Alert.alert('Please select the severity of this spot.')
    }

    const spot: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties> = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates
      },
      properties: {
        type: form.type,
        severity: form.severity,
        comment: form.comment,
        images: form.images,
        voting: 0,
        status: SpotStatus.PENDING,
        validated: false
      }
    }

    try {
      const response = await fetch(`${env.API_URL}/api/spots`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(spot)
      })

      const newSpot = await response.json()

      setSpots([...spots, newSpot])
      setTimeout(() => navigation.navigate('Map'), 300)
    } catch (error) {
      console.error(error)
    }
  }

  const handleKeyboardDismiss = () => Keyboard.dismiss()

  const PlusIcon = (): JSX.Element => (
    <Icon name='plus' size={26} color='#475569' />
  )

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Pressable onPress={handleKeyboardDismiss} style={styles.container}>
          <View style={styles.inner}>
            <Spacer height={32} />
            <Text style={styles.heading}>Add Spot</Text>
            <Spacer height={16} />
            <View>
              <Text style={styles.label}>Select the type of this spot</Text>
              <Spacer height={8} />
              <View style={styles.typesContainer}>
                <Pressable
                  onPress={() =>
                    setForm({ ...form, type: SpotType.COSTRUCTION })
                  }
                  style={{
                    ...styles.typeIconButton,
                    backgroundColor:
                      form.type === SpotType.COSTRUCTION
                        ? '#E2E8F0'
                        : 'transparent'
                  }}
                >
                  <Image
                    source={require('../../../assets/images/spots/construction.png')}
                    style={styles.typeIcon}
                  />
                  <Text style={styles.typeLabel}>Construction</Text>
                </Pressable>
                <Pressable
                  onPress={() => setForm({ ...form, type: SpotType.UNEVEN })}
                  style={{
                    ...styles.typeIconButton,
                    backgroundColor:
                      form.type === SpotType.UNEVEN ? '#E2E8F0' : 'transparent'
                  }}
                >
                  <Image
                    source={require('../../../assets/images/spots/uneven.png')}
                    style={styles.typeIcon}
                  />
                  <Text style={styles.typeLabel}>Uneven</Text>
                </Pressable>
                <Pressable
                  onPress={() => setForm({ ...form, type: SpotType.NARROW })}
                  style={{
                    ...styles.typeIconButton,
                    backgroundColor:
                      form.type === SpotType.NARROW ? '#E2E8F0' : 'transparent'
                  }}
                >
                  <Image
                    source={require('../../../assets/images/spots/narrow.png')}
                    style={styles.typeIcon}
                  />
                  <Text style={styles.typeLabel}>Narrow</Text>
                </Pressable>
                <Pressable
                  onPress={() => setForm({ ...form, type: SpotType.DANGER })}
                  style={{
                    ...styles.typeIconButton,
                    backgroundColor:
                      form.type === SpotType.DANGER ? '#E2E8F0' : 'transparent'
                  }}
                >
                  <Image
                    source={require('../../../assets/images/spots/danger.png')}
                    style={styles.typeIcon}
                  />
                  <Text style={styles.typeLabel}>Danger</Text>
                </Pressable>
              </View>
            </View>
            <Spacer height={16} />
            <View>
              <Text style={styles.label}>Select the severity of this spot</Text>
              <Spacer height={8} />
              <View style={styles.severitiesContainer}>
                <Pressable
                  onPress={() =>
                    setForm({ ...form, severity: SpotSeverity.LOW })
                  }
                  style={{
                    ...styles.severityButton,
                    backgroundColor:
                      form.severity === SpotSeverity.LOW
                        ? getSeverityColor(SpotSeverity.LOW)
                        : '#E2E8F0'
                  }}
                >
                  <Text style={styles.severityButtonText}>
                    {SpotSeverity.LOW}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    setForm({ ...form, severity: SpotSeverity.MEDIUM })
                  }
                  style={{
                    ...styles.severityButton,
                    backgroundColor:
                      form.severity === SpotSeverity.MEDIUM
                        ? getSeverityColor(SpotSeverity.MEDIUM)
                        : '#E2E8F0'
                  }}
                >
                  <Text style={styles.severityButtonText}>
                    {SpotSeverity.MEDIUM}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    setForm({ ...form, severity: SpotSeverity.HIGH })
                  }
                  style={{
                    ...styles.severityButton,
                    backgroundColor:
                      form.severity === SpotSeverity.HIGH
                        ? getSeverityColor(SpotSeverity.HIGH)
                        : '#E2E8F0'
                  }}
                >
                  <Text style={styles.severityButtonText}>
                    {SpotSeverity.HIGH}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() =>
                    setForm({ ...form, severity: SpotSeverity.VERY_HIGH })
                  }
                  style={{
                    ...styles.severityButton,
                    backgroundColor:
                      form.severity === SpotSeverity.VERY_HIGH
                        ? getSeverityColor(SpotSeverity.VERY_HIGH)
                        : '#E2E8F0'
                  }}
                >
                  <Text style={styles.severityButtonText}>
                    {SpotSeverity.VERY_HIGH}
                  </Text>
                </Pressable>
              </View>
            </View>
            <Spacer height={16} />
            <View>
              <Text style={styles.label}>
                Provide a description of this spot (optional)
              </Text>
              <Spacer height={8} />
              <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(comment) => setForm({ ...form, comment })}
                multiline
                placeholder='Comment'
                placeholderTextColor='#94A3B8'
                style={styles.input}
                value={form.comment}
              />
            </View>
            <Spacer height={16} />
            <View>
              <Text style={styles.label}>
                Add images of this spot (optional)
              </Text>
              <Spacer height={8} />
              <View style={styles.imagesContainer}>
                {!form.images.length ? (
                  <Pressable style={styles.addImageButton}>
                    <PlusIcon />
                  </Pressable>
                ) : (
                  <>
                    {form.images.map((image, index) => (
                      <Image source={{ uri: '' }} key={index} />
                    ))}
                    <Pressable style={styles.addImageButton}>
                      <PlusIcon />
                    </Pressable>
                  </>
                )}
              </View>
            </View>
            <Spacer height={32} />
            <View>
              <Pressable onPress={handleAddSpot} style={styles.addSpotButton}>
                <Text style={styles.addSpotButtonText}>Add Spot</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </KeyboardAvoidingView>
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
  heading: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  typesContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  typeIconButton: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'transparent'
  },
  typeIcon: {
    width: 80,
    height: 80
  },
  typeLabel: {
    fontSize: 12
  },
  severitiesContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  severityButton: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    paddingVertical: 8,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'transparent'
  },
  severityButtonText: {
    fontSize: 16
  },
  input: {
    width: '100%',
    height: 100,
    padding: 12,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#E2E8F0',
    fontSize: 16,
    color: '#0F172A'
  },
  imagesContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  addImageButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    margin: 4,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'transparent',
    backgroundColor: '#E2E8F0'
  },
  addSpotButton: {
    alignItems: 'center',
    width: '100%',
    height: 48,
    padding: 12,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: 'transparent',
    backgroundColor: '#E2E8F0'
  },
  addSpotButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#DB2777'
  }
})
