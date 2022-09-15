import React, { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import CoordinatesDTO from './CoordinatesDTO.model'
const RecenterMap = (props: CoordinatesDTO) => {

    const map = useMap()
    useEffect(() => {
        map.setView([props.lat, props.lng]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.lat, props.lng])

    return null
}

export default RecenterMap