import AsyncStorage from '@react-native-async-storage/async-storage'

const CHUNK_SIZE = 1024

const ChunkedAsyncStorage = {
  async setItem(key: string, value: any) {
    console.log(`[ChunkedAsyncStorage] About to store key: ${key} and value: ${value}`)
    const jsonVal = typeof value === 'string' ? value : JSON.stringify(value)
    const chunks = []

    for (let i = 0; i < jsonVal.length; i += CHUNK_SIZE) {
      chunks.push(jsonVal.slice(i, i + CHUNK_SIZE))
    }
    console.log(`[ChunkedAyncStorage] chunks = ${chunks}, len = ${chunks.length}`)

    await Promise.all(
      chunks.map((chunk, idx) => AsyncStorage.setItem(`${key}_chunk_${idx}`, chunk))
    )
    await AsyncStorage.setItem(`${key}_chunk_count`, chunks.length.toString())
  },

  async getItem(key: string): Promise<string | null> {
    console.log(`[ChunkedAsyncStorage] About to retrieve value for key: ${key}`)
    const numChunksStr = await AsyncStorage.getItem(`${key}_chunk_count`)
    if (numChunksStr === null) {
      // return null?
      throw new Error('numChunks is null')
    }

    const numChunks = parseInt(numChunksStr)
    if (isNaN(numChunks)) {
      return null
    }

   const chunks = await Promise.all(
      Array.from({ length: numChunks }, (_, idx) =>
        AsyncStorage.getItem(`${key}_chunk_${idx}`)
      )
    )

    return chunks.join('')
  },

  async removeItem(key: string) {
    const numChunksStr = await AsyncStorage.getItem(`${key}_chunk_count`)
    if (numChunksStr === null) {
      // return null?
      throw new Error('numChunks is null')
    }

    const numChunks = parseInt(numChunksStr)
    if (!isNaN(numChunks)) {
     await Promise.all(
        Array.from({ length: numChunks }, (_, idx) =>
          AsyncStorage.removeItem(`${key}_chunk_${idx}`)
        )
      )

      await AsyncStorage.removeItem(`${key}_chunk_count`)
    }
  }
}

export default ChunkedAsyncStorage
