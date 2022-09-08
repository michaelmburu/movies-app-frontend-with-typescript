import React, { useState } from 'react'
import CoordinatesDTO from './CoordinatesDTO.model'
import {MapContainer, TileLayer, useMapEvent, Marker} from 'react-leaflet'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'


let defaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [16, 37]
})

const MapClick = (props: MapClickProps) => {
    useMapEvent('click', e => {
        props.setCordinates({lat: e.latlng.lat, lng: e.latlng.lng})
    })
    return null
}

L.Marker.prototype.options.icon = defaultIcon

const Map = (props: MapProps) => {
    const [coordinates, setCordinates] = useState<CoordinatesDTO[]>(props.coordinates)
  return (
    <MapContainer
        center={[-1.2932228341522582, 36.81549833370792]}
        zoom={16}
        style={{height: props.height}}
    >
        <TileLayer 
            attribution='Movies App'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClick setCordinates={coordinates => {
            setCordinates([coordinates])
            props.handleMapClick(coordinates)
        }} />
        {coordinates.map((coordinate, index) => 
            <Marker 
                key={index}
                position={[coordinate.lat, coordinate.lng]} 
            />
        )}
    </MapContainer>
  )
}

interface MapClickProps {
    setCordinates(coordinates: CoordinatesDTO): void
}

interface MapProps {
    height: string
    coordinates: CoordinatesDTO[]
    handleMapClick(coordinates: CoordinatesDTO): void
}

Map.defaultProps = {
    height: '500px'
}

export default Map