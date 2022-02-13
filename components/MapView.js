import { useState } from 'react'
import MapGL, { Marker, Popup } from '@urbica/react-map-gl'
import getCenter from 'geolib/es/getCenter'

export default function MapView({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({})
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }))

  const center = getCenter(coordinates)

  const [viewport, setViewport] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 11.0,
  })

  return (
    <>
      <MapGL
        style={{ width: '80%', height: '90%' }}
        mapStyle="mapbox://styles/turex04/ckzhi9zro00cl14rw8u3xdg59"
        accessToken={process.env.mapbox_token}
        {...viewport}
        onViewportChange={setViewport}
      >
        {searchResults.map((result) => (
          <div key={result.long}>
            <Marker longitude={result.long} latitude={result.lat} offset={-10}>
              <p
                role="img"
                onClick={(event) => {
                  setSelectedLocation(result)
                  event.stopPropagation()
                }}
                className="cursor-pointer text=2xl"
              >
                📌
              </p>
            </Marker>
            {selectedLocation.long === result.long && (
              <Popup
                onClose={() => setSelectedLocation({})}
                closeOnClick={true}
                latitude={result.lat}
                longitude={result.long}
              >
                {result.title}
              </Popup>
            )}
          </div>
        ))}
      </MapGL>
    </>
  )
}
