import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Event } from './types'
import { AppState } from '../../store/store'

export interface EventState {
  events: Event[]
}

const initialState: EventState = {
  events: []
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload)
    },
    clearEvents: (state) => {
      state.events = []
    }
  }
})

export const getEvent = () => (state: AppState, id: string) => state.events.events?.filter((evt: Event) => evt.id === id)
export const getEvents = () => (state: AppState) => state.events.events

export const { addEvent, clearEvents } = eventsSlice.actions
export default eventsSlice.reducer