import React, { useEffect, useState } from 'react'
import CoordinatesDTO from './CoordinatesDTO.model'
import {MapContainer, TileLayer, useMapEvent, Marker, useMap, Popup} from 'react-leaflet'
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import 'leaflet/dist/leaflet.css'
import RecenterMap from './RecenterMap'


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
        {props.readOnly ? null :   <MapClick setCordinates={coordinates => {
            setCordinates([coordinates])
            props.handleMapClick(coordinates)
        }} />}
      
        {coordinates.map((coordinate, index) => 
            <>
                <Marker 
                    key={index}
                    position={[coordinate.lat, coordinate.lng]} 
                >
                    {coordinate.name ? <Popup>
                        {coordinate.name}
                    </Popup>: null}
                </Marker>
                <RecenterMap key={index} lat={coordinate.lat} lng={coordinate.lng} />
            </>       
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
    readOnly: boolean
}

Map.defaultProps = {
    height: '500px',
    handleMapClick: () => {},
    readOnly: false
}
export default Map