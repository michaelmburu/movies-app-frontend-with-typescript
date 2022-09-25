import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import AuthenticationContext from '../Components/Auth/AuthenticationContext'

const Ratings = (props: RatingsProps) => {
  const [maximumValueArr, setMaximumValueArr] = useState<number[]>([])
  const { claims } = useContext(AuthenticationContext)
  const [selectedValue, setSelectedValue] = useState(props.selectedValue)

  useEffect(() => {
    setMaximumValueArr(Array(props.maximumValue).fill(0))
  }, [props.maximumValue])

  const handleOnMouseOver = (rate: number) => {
    setSelectedValue(rate)
  }

  const handleClick = (rate: number) => {
    const userIsLoggedIn = claims.length > 0
    if (!userIsLoggedIn) {
      alert('You need to log in')
      return
    }
    setSelectedValue(rate)
    props.onChange(rate)
  }

  return (
    <>
      {maximumValueArr.map((_, index) => (
        <FontAwesomeIcon
          onMouseOver={() => handleOnMouseOver(index + 1)}
          onClick={() => handleClick(index + 1)}
          icon='star'
          key={index}
          className={`fa-lg pointer ${
            selectedValue >= index + 1 ? 'checked' : null
          } `}
        />
      ))}
    </>
  )
}

interface RatingsProps {
  maximumValue: number
  selectedValue: number
  onChange(rate: number): void
}

export default Ratings
