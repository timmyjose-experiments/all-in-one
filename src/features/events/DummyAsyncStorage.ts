import AsyncStorage from "@react-native-async-storage/async-storage"

const DummyAsyncStorage = {
  async setItem (key: string, val: any) {
    console.log(`[DummyAsyncStorage] Storing ${key}: ${val}`)
    const strVal = typeof val === 'string' ? val : JSON.stringify(val)
    await AsyncStorage.setItem(key, strVal)
  },

  async getItem (key: string) {
    console.log(`[DummyAsyncStorage] Getting ${key}`)
    return await AsyncStorage.getItem(key)
  },

  async removeItem(key: string) {
    await AsyncStorage.removeItem(key)
  }
}

export default DummyAsyncStorage
