import React from 'react'
import CoordinatesDTO from './CoordinatesDTO.model'
import Map from './Map'
import {useFormikContext} from  'formik'
const MapField = (props: MapFieldProps) => {

    const {values} = useFormikContext<any>()

    const handleMapClick = (coordinates: CoordinatesDTO) => {
        values[props.latField] = coordinates.lat
        values[props.lngField] = coordinates.lng
    }


  return (
    <Map 
        coordinates={props.coordinates}
        handleMapClick = {handleMapClick}
    />
  )
}

interface MapFieldProps {
    coordinates: CoordinatesDTO[]
    latField: string
    lngField: string
}

MapField.defaultProps = {
    coordinates: []
}

export default MapField