import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { Pressable, View, Text } from 'react-native'
import styles from '../styles'
import { useEffect, useState } from 'react'
import * as Location from 'expo-location'
import { usePostHog } from 'posthog-react-native'

const LocationDemo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const posthog = usePostHog()

  const [location, setLocation] = useState<Location.LocationObject | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }

      let location = await Location.getCurrentPositionAsync()
      posthog.capture('location-demo')
      setLocation(location)
    })()
  }, [])

  let text = 'Waiting...'
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    text = JSON.stringify(location, null, 2)
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </Pressable>
    </View>
  )
}

export default LocationDemo
