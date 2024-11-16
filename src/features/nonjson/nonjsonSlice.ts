import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from '../../store/store'

export interface NonJsonState {
  int: number
  float: number
  str: string
  b: boolean
  arr: string[]
}

const initialState: NonJsonState = {
  int: 0,
  float: 2.78128,
  str: 'Hello, world',
  b: true,
  arr: ['Hello', 'Mundo', 'How', 'estas', 'you?']
}

export const nonJsonSlice = createSlice({
  name: 'nonjson',
  initialState,
  reducers: {
    incrementInt: (state) => {
      state.int += 1
    },
    doubleFloat: (state) => {
      state.float *= 2.0
    },
    addStringToArray: (state, action: PayloadAction<string>) => {
      state.arr.push(action.payload)
    }
  }
})

export const getIntSelector = (state: AppState) => state.nonJson.int
export const getFloatSelector = (state: AppState) => state.nonJson.float
export const getBoolSelector = (state: AppState) => state.nonJson.b
export const getArraySelector = (state: AppState) => state.nonJson.arr
export const getStringSelector = (state: AppState) => state.nonJson.str

export const { incrementInt, doubleFloat, addStringToArray} = nonJsonSlice.actions
export default nonJsonSlice.reducer