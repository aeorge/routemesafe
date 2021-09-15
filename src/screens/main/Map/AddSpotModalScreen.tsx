import React, { useState } from 'react'
import {
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
import Icon from 'react-native-vector-icons/Feather'
import { Spacer } from '../../../components/Spacer'
import { getSeverityColor } from '../../../helpers/getSeverityColor'

type AddSpotModalScreenProps = {
  route: Route<'Add Spot Modal', any>
}

type AddSpotForm = {
  type?: string
  severity?: 1 | 2 | 3 | 4
  comment?: string
  images: string[]
}

export const AddSpotModalScreen = ({
  route
}: AddSpotModalScreenProps): JSX.Element => {
  const coordinates = route.params

  const [form, setForm] = useState<AddSpotForm>({
    type: undefined,
    severity: undefined,
    comment: undefined,
    images: []
  })

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
                  onPress={() => setForm({ ...form, type: 'construction' })}
                  style={{
                    ...styles.typeIconButton,
                    backgroundColor:
                      form.type === 'construction' ? '#E2E8F0' : 'transparent'
                  }}
                >
                  <Image
                    source={require('../../../assets/images/spots/construction.png')}
                    style={styles.typeIcon}
                  />
                  <Text style={styles.typeLabel}>Construction</Text>
                </Pressable>
                <Pressable
                  onPress={() => setForm({ ...form, type: 'uneven' })}
                  style={{
                    ...styles.typeIconButton,
                    backgroundColor:
                      form.type === 'uneven' ? '#E2E8F0' : 'transparent'
                  }}
                >
                  <Image
                    source={require('../../../assets/images/spots/uneven.png')}
                    style={styles.typeIcon}
                  />
                  <Text style={styles.typeLabel}>Uneven</Text>
                </Pressable>
                <Pressable
                  onPress={() => setForm({ ...form, type: 'narrow' })}
                  style={{
                    ...styles.typeIconButton,
                    backgroundColor:
                      form.type === 'narrow' ? '#E2E8F0' : 'transparent'
                  }}
                >
                  <Image
                    source={require('../../../assets/images/spots/narrow.png')}
                    style={styles.typeIcon}
                  />
                  <Text style={styles.typeLabel}>Narrow</Text>
                </Pressable>
                <Pressable
                  onPress={() => setForm({ ...form, type: 'danger' })}
                  style={{
                    ...styles.typeIconButton,
                    backgroundColor:
                      form.type === 'danger' ? '#E2E8F0' : 'transparent'
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
                  onPress={() => setForm({ ...form, severity: 1 })}
                  style={{
                    ...styles.severityButton,
                    backgroundColor:
                      form.severity === 1 ? getSeverityColor(1) : '#E2E8F0'
                  }}
                >
                  <Text style={styles.severityButtonText}>1</Text>
                </Pressable>
                <Pressable
                  onPress={() => setForm({ ...form, severity: 2 })}
                  style={{
                    ...styles.severityButton,
                    backgroundColor:
                      form.severity === 2 ? getSeverityColor(2) : '#E2E8F0'
                  }}
                >
                  <Text style={styles.severityButtonText}>2</Text>
                </Pressable>
                <Pressable
                  onPress={() => setForm({ ...form, severity: 3 })}
                  style={{
                    ...styles.severityButton,
                    backgroundColor:
                      form.severity === 3 ? getSeverityColor(3) : '#E2E8F0'
                  }}
                >
                  <Text style={styles.severityButtonText}>3</Text>
                </Pressable>
                <Pressable
                  onPress={() => setForm({ ...form, severity: 4 })}
                  style={{
                    ...styles.severityButton,
                    backgroundColor:
                      form.severity === 4 ? getSeverityColor(4) : '#E2E8F0'
                  }}
                >
                  <Text style={styles.severityButtonText}>4</Text>
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
              <Pressable style={styles.addSpotButton}>
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
