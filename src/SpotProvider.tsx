import React, { createContext, useContext, useEffect, useState } from 'react'
import env from './env'

type SpotContext = {
  spots: GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[]
  setSpots: React.Dispatch<
    GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[]
  >
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
  const [spots, setSpots] = useState<
    GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[]
  >([])

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
