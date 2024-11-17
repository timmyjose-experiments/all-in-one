import { Pressable, Text, View } from 'react-native'
import styles from '../styles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { usePostHog } from 'posthog-react-native'
import { useEffect } from 'react'

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const posthog = usePostHog()

  useEffect(() => {
    posthog.capture('home')
  }, [posthog])

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('AsyncStorageMultiSetGetDemo')}>
        <Text>AsyncStorage Multi Set/Get Demo</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('NetworkInfoDemo')}>
        <Text>Network Info Demo</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('LocationDemo')}>
        <Text>Location Demo</Text>
      </Pressable>
    </View>
  )
}

export default Home
