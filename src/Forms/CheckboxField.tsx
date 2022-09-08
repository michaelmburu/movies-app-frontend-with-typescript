import React from 'react'
import {Field} from 'formik'
const CheckboxField = (props: CheckboxFieldProps) => {
  return (
    <div className='mb-3 form-check'>
        <Field className="form-check-input" id={props.field} name={props.field} type='checkbox' />
        <label htmlFor={props.field}>{props.displayName}</label>
    </div>
  )
}

interface CheckboxFieldProps {
    displayName: string
    field: string
}

export default CheckboxField