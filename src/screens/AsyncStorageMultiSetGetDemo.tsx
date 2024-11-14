import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native'
import styles from '../styles'
import { useCallback, useEffect, useState } from 'react'
// Test file: https://github.com/json-iterator/test-data/blob/master/large-file.json
import allEvents from '../../large-entries.json'
import { Event, RootEvent } from '../features/events/types'
import { useDispatch, useSelector } from 'react-redux'
import { addEvent, getEvents, clearEvents } from '../features/events/eventSlice'

const AsyncStorageMultiSetGetDemo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const dispatch = useDispatch()
  const retrievedEvents = useSelector(getEvents())

  const [events, setEvents] = useState<Event[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchEventsError, setFetchEventsError] = useState<string | null>(null)

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
    </View>
  )
}

export default AsyncStorageMultiSetGetDemo
