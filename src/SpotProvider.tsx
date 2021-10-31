import React, { createContext, useContext, useState } from 'react'
import { data } from './data'

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
  const [spots, setSpots] =
    useState<GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>[]>(
      data
    )

  const spotContextValue: SpotContext = { spots, setSpots }

  return (
    <SpotContext.Provider value={spotContextValue}>
      {children}
    </SpotContext.Provider>
  )
}

export const useSpots = (): SpotContext => useContext(SpotContext)
