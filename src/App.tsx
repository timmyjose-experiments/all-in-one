import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import NetworkInfoDemo from './screens/NetworkInfoDemo'
import LocationDemo from './screens/LocationDemo'
import { posthog } from './config/posthog'
import { PostHogProvider } from 'posthog-react-native'

export type RootStackParamList = {
  Home: undefined
  NetworkInfoDemo: undefined
  LocationDemo: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
    <PostHogProvider client={posthog}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='NetworkInfoDemo' component={NetworkInfoDemo} />
          <Stack.Screen name='LocationDemo' component={LocationDemo} />
        </Stack.Navigator>
      </NavigationContainer>
    </PostHogProvider>
  )
}

export default App
