import React from 'react'
import {Field, ErrorMessage} from 'formik'
const TextField = (props: TextFieldProps) => {
  return (
    <div className='mb-3'>
    <label htmlFor={props.field}>{props.displayName}</label>
    <Field type={props.type} name={props.field} id={props.field} className='form-control' />
    <ErrorMessage name={props.field}>{msg => 
      <div className='text-danger'>{msg}</div>}
    </ErrorMessage>
  </div>
  )
}

interface TextFieldProps {
    field: string
    displayName: string
    type: 'text' | 'password'
}

TextField.defaultProps = {
  type: 'text'
}

export default TextField