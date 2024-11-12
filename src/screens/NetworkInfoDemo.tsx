import { Pressable, Text, View } from 'react-native'
import styles from '../styles'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import usePublicIp from '../features/usePublicIp'

const NetworkInfoDemo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const { ipifyIpAddress, ipifyError, ipdataIpAddress, ipdataError } = usePublicIp()

  return (
    <View style={styles.container}>
      { !!ipifyError && (<Text>ipify: {ipifyError}</Text>)}
      { !!ipdataError && (<Text>ipdata: {ipdataError}</Text>)}
      <Text>IP Address (ipify): {ipifyIpAddress ?? 'n/a'}</Text>
      <Text>IP Address (ipdata): {ipdataIpAddress ?? 'n/a'}</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </Pressable>
    </View>
  )
}

export default NetworkInfoDemo
