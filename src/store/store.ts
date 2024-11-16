import { combineReducers, configureStore } from '@reduxjs/toolkit'
import eventsReducer from '../features/events/eventSlice'
import nonJsonReducer from '../features/nonjson/nonjsonSlice'
import { PERSIST, persistReducer, persistStore, REHYDRATE}  from 'redux-persist'
import ChunkedAsyncStorage from '../features/events/ChunkedAsyncStorage'

const persistConfig = {
  key: 'main.app.key',
  storage: ChunkedAsyncStorage
}

const combinedReducers = combineReducers({
  events: eventsReducer,
  nonJson: nonJsonReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE]
      }
    })
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)