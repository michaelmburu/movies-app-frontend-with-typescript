import React from 'react'
import { Error } from './Error'

const DisplayErrors = (props: DisplayErrorsProps) => {
    const style = {
        color: 'red'
    }
  return (
    <div>
        {props.errors ? <ul style={style}>
            {props.errors.map((error, index) => <li key={index}>{error}</li>)}
        </ul> : null}
    </div>
  )
}

interface DisplayErrorsProps {
    errors: string[]
}

export default DisplayErrors