import axios from "axios"
import { useEffect, useState } from "react"
import { IPDATA_API_KEY } from '../constants'

const IPIFY_URL = 'https://api.ipify.org?format=json'
const IPDATA_URL = 'https://api.ipdata.co'

const usePublicIp = () => {
  const [ipifyIpAddress, setIpifyIpAddress] = useState<string | null>(null)
  const [ipifyError, setIpifyError] = useState<string | null>(null)

  const [ipdataIpAddress, setIpdataIpAddress] = useState<string | null>(null)
  const [ipdataError, setIpdataError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAndSetPublicIpAddress = async () => {
      try {
        const res = await axios.get(IPIFY_URL)
        const json = await res.data
        setIpifyIpAddress(json.ip)
      } catch (err: any) {
        setIpifyError(JSON.stringify(err))
      }

      try {
        const queryUrl = `${IPDATA_URL}/?api-key=${IPDATA_API_KEY}`
        const res = await axios.get(queryUrl)
        const json = await res.data
        console.log(JSON.stringify(json, null, 2))
        setIpdataIpAddress(json.ip)
      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2))
        setIpdataError(JSON.stringify(err))
      }
    }
    fetchAndSetPublicIpAddress()
  }, [])

  return {
    ipifyIpAddress,
    ipifyError,
    ipdataIpAddress,
    ipdataError
  }
}

export default usePublicIp
