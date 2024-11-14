import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native'
import styles from '../styles'
import { useCallback, useEffect, useState } from 'react'
// Test file: https://github.com/json-iterator/test-data/blob/master/large-file.json
import allEvents from '../../large-file.json'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Event } from '../features/events/types'

const KEY = 'events.key'

const AsyncStorageMultiSetGetDemo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [events, setEvents] = useState<Event[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchEventsError, setFetchEventsError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsJson: Event[] = allEvents
        setEvents(eventsJson)
      } catch (err: any) {
        console.error(err)
        setFetchEventsError(JSON.stringify(err, null, 2))
      }
    }
    fetchEvents()
  }, [])

  const showReduxStore = useCallback(async () => {
    console.log('Showing Redux Store contents...')
    setLoading(true)

    const keys = await AsyncStorage.getAllKeys()
    await Promise.all(keys.map(async (key)  => {
      const val = await AsyncStorage.getItem(key)
      console.log(`key: ${key}, value: ${val}`)
    }))

    setLoading(false)
  }, [])

  // const logEvents = useCallback(async () => {
  //   try {
  //     const events = await AsyncStorage.getItem(KEY)
  //     if (events !== null) {
  //       const parsedEvents = JSON.parse(events)
  //       console.log(`${JSON.stringify(parsedEvents, null, 2)}`)
  //     } else {
  //       console.warn('events is null')
  //     }
  //   } catch (err: any) {
  //     console.error(`Error while logging events: ${err}`)
  //   }
  // }, [])

  const storeEventsInReduxStore = useCallback(async () => {
    console.log('Storing events in Redux Store')
    setLoading(true)
    try {
      await Promise.all(
        (events || []).map(async (evt: Event) => {
          const eventKey = `${KEY}.${evt.id}`
          const eventVal = JSON.stringify(evt, null, 2)
          await AsyncStorage.setItem(eventKey, eventVal)
          console.log(`Finished storing event: ${eventKey}, value: ${eventVal}`)
      }))
      console.log('Finished storing events')
    } catch (err: any) {
      console.error(`Error while storing events: ${err}`)
    } finally {
      setLoading(false)
    }
  }, [events])

  const purgeEventsFromReduxStore = useCallback(async () => {
    console.log('Purging events from Redux Store')
    setLoading(true)

    try {
      const keys = await AsyncStorage.getAllKeys()

      await Promise.all(keys.map(async (key) => {
        await AsyncStorage.removeItem(key)
        console.log(`Finished purging event: ${key}`)
      }))
      console.log('Finished purging all events')
    } catch (err: any) {
      console.error(`Error while purging events: ${err}`)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <View style={styles.container}>
      { loading && (<ActivityIndicator />)}
      {!!fetchEventsError && (<Text>{fetchEventsError}</Text>)}
      {/* {!!events && (
        <FlatList
          data={events}
          renderItem={({ item }) => <Text>{JSON.stringify(item, null, 2)}</Text>}
          keyExtractor={item => item.id} />
      )} */}
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Home')}>
        <Text>Home</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={showReduxStore}>
        <Text>Show Redux Store</Text>
      </Pressable>
      {/* <Pressable
        style={styles.button}
        onPress={logEvents}>
        <Text>Log Events</Text>
      </Pressable> */}
      <Pressable
        style={styles.button}
        onPress={storeEventsInReduxStore}>
        <Text>Store Events</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={purgeEventsFromReduxStore}>
        <Text>Purge Events</Text>
      </Pressable>
    </View>
  )
}

export default AsyncStorageMultiSetGetDemo
