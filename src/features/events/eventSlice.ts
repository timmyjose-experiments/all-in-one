import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Event } from './types'
import { AppState } from '../../store/store'

export interface EventState {
  events: Event[] | null
}

const initialState: EventState = {
  events: null
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events?.push(action.payload)
    }
  }
})

export const getEvent = (state: AppState, id: number) => state.events?.filter((evt: Event) => evt.id === id)

export const { addEvent } = eventsSlice.actions
export default eventsSlice.reducer