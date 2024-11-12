import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import NetworkInfoDemo from './screens/NetworkInfoDemo'
import LocationDemo from './screens/LocationDemo'

export type RootStackParamList = {
  Home: undefined
  NetworkInfoDemo: undefined
  LocationDemo: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='NetworkInfoDemo' component={NetworkInfoDemo} />
        <Stack.Screen name='LocationDemo' component={LocationDemo} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
