import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import NetworkInfoDemo from './screens/NetworkInfoDemo'
import LocationDemo from './screens/LocationDemo'
import AsyncStorageMultiSetGetDemo from './screens/AsyncStorageMultiSetGetDemo'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store'
import { PersistGate } from 'redux-persist/integration/react'
import { posthog } from './config/posthog'
import { PostHogProvider } from 'posthog-react-native'
import { useEffect } from 'react'

export type RootStackParamList = {
  Home: undefined
  NetworkInfoDemo: undefined
  LocationDemo: undefined
  AsyncStorageMultiSetGetDemo: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  useEffect(() => {
    posthog.register({
      country_code: 'in',
      country_name: 'India'
    })
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <PostHogProvider client={posthog}>
            <Stack.Navigator>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='NetworkInfoDemo' component={NetworkInfoDemo} />
              <Stack.Screen name='LocationDemo' component={LocationDemo} />
              <Stack.Screen name='AsyncStorageMultiSetGetDemo' component={AsyncStorageMultiSetGetDemo} />
            </Stack.Navigator>
          </PostHogProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
