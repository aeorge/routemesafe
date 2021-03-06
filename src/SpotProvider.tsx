import React, { createContext, useContext, useEffect, useState } from 'react'
import env from './env'
import { Spot } from './types'

type SpotContext = {
  spots: Spot[]
  setSpots: React.Dispatch<Spot[]>
}

type SpotProviderProps = {
  children: React.ReactNode
}

const spotContextDefaultValue: SpotContext = {
  spots: [],
  setSpots: () => []
}

export const SpotContext = createContext<SpotContext>(spotContextDefaultValue)

export const SpotProvider = ({ children }: SpotProviderProps): JSX.Element => {
  const [spots, setSpots] = useState<Spot[]>([])

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await fetch(`${env.API_URL}/api/spots`)
        const spots = await response.json()
        setSpots(spots)
      } catch (error) {
        console.error(error)
      }
    }

    fetchSpots()
  }, [])

  const spotContextValue: SpotContext = { spots, setSpots }

  return (
    <SpotContext.Provider value={spotContextValue}>
      {children}
    </SpotContext.Provider>
  )
}

export const useSpots = (): SpotContext => useContext(SpotContext)
