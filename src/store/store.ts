import { configureStore } from '@reduxjs/toolkit'
import eventsReducer from '../features/events/eventSlice'
import { persistReducer, persistStore}  from 'redux-persist'
import ChunkedAsyncStorage from '../features/events/ChunkedAsyncStorage'

const persistConfig = {
  key: 'events.key',
  storage: ChunkedAsyncStorage
}

const persistedReducer = persistReducer(persistConfig, eventsReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)