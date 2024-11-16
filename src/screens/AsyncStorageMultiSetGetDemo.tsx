import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native'
import styles from '../styles'
import { useCallback, useEffect, useState } from 'react'
// Test file: https://github.com/json-iterator/test-data/blob/master/large-file.json
import allEvents from '../../large-entries.json'
import { Event } from '../features/events/types'
import { useDispatch, useSelector } from 'react-redux'
import { addEvent, getEvents, clearEvents } from '../features/events/eventSlice'
import { addStringToArray, doubleFloat, getArraySelector, getBoolSelector, getFloatSelector, getIntSelector, getStringSelector, incrementInt } from '../features/nonjson/nonjsonSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ChunkedAsyncStorage from '../features/events/ChunkedAsyncStorage'
import { persistor } from '../store/store'

const AsyncStorageMultiSetGetDemo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const dispatch = useDispatch()
  const retrievedEvents = useSelector(getEvents())

  const [events, setEvents] = useState<Event[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchEventsError, setFetchEventsError] = useState<string | null>(null)

  // primitive types
  const int = useSelector(getIntSelector)
  const float = useSelector(getFloatSelector)
  const str = useSelector(getStringSelector)
  const b = useSelector(getBoolSelector)
  const arr = useSelector(getArraySelector)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsJson: Event[] = allEvents.events
        setEvents(eventsJson)
      } catch (err: any) {
        console.error(err)
        setFetchEventsError(JSON.stringify(err, null, 2))
      }
    }
    fetchEvents()
  }, [])

  // useEffect(() => {
  //   (async () => {
  //     const allKeys = await AsyncStorage.getAllKeys()
  //     console.log(`Listing all keys....${allKeys}`)
  //     for (const key in allKeys) {
  //       const val = await AsyncStorage.getItem(key)
  //       console.log(`value = ${val}`)
  //     }
  //   })()
  // }, [])

  const showReduxStore = useCallback(async () => {
    console.log('Showing Redux Store contents...')
    setLoading(true)

    retrievedEvents.forEach((evt) => console.log(JSON.stringify(evt, null, 2)))

    setLoading(false)
  }, [retrievedEvents])

  const storeEventsInReduxStore = useCallback(async () => {
    console.log('Storing events in Redux Store')
    setLoading(true)
    try {
      events?.forEach((evt) => {
        dispatch(addEvent(evt))
      })
      console.log('Finished storing events')
    } catch (err: any) {
      console.error(`Error while storing events: ${err}`)
    } finally {
      setLoading(false)
    }
  }, [events, dispatch])

  const purgeEventsFromReduxStore = useCallback(async () => {
    console.log('Purging events from Redux Store')
    setLoading(true)

    try {
      dispatch(clearEvents())
      await persistor.purge()
    } catch (err: any) {
      console.error(`Error while purging events: ${err}`)
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  const handleIncrementInt = useCallback(async () => {
    dispatch(incrementInt())
  }, [dispatch])

  const handleDoubleFloat = useCallback(async () => {
    dispatch(doubleFloat())
  }, [dispatch])

  const handleAddStringToArray = useCallback(async (str: string) => {
    dispatch(addStringToArray(str))
  }, [dispatch])

  return (
    <View style={styles.container}>
      { loading && (<ActivityIndicator />)}
      {!!fetchEventsError && (<Text>{fetchEventsError}</Text>)}
      <Text>int: {int}</Text>
      {float && (<Text>float: {float}</Text>)}
      {b && (<Text>bool: {b}</Text>)}
      <Text>string: {str}</Text>
      <Text>arr: {arr}</Text>
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
      <Pressable
        style={styles.button}
        onPress={() => handleAddStringToArray('Hi')}>
        <Text>Add String to Array</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={handleIncrementInt}>
        <Text>Increment Int</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={handleDoubleFloat}>
        <Text>Double Float</Text>
      </Pressable>
    </View>
  )
}

export default AsyncStorageMultiSetGetDemo
