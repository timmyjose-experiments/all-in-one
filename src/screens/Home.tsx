import { Pressable, Text, View } from 'react-native'
import styles from '../styles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

const Home = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.container}>
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
