import React from 'react'
import {Link} from 'react-router-dom'
import {Formik, Form, FormikHelpers} from 'formik'
import TextField from '../../Forms/TextField'
import Button from '../../Utils/Button'
import * as Yup from 'yup'
import { GenreCreationDTO } from './genres.model'

const GenreForm = (props: GenreFormProps) => {
  return (
    <Formik 
    initialValues={props.model}
    onSubmit={props.onSubmit}
    validationSchema={Yup.object({
      name: Yup.string().required('This field is required')
      .max(50, "Max length is 50 characters")
      .firstLetterUppercase()
    })}
    >
      {(formikProps) => (
        <Form>
        <TextField field='name' displayName='Name' />
        <Button disabled={formikProps.isSubmitting} type='submit'>Save Changes</Button>
        <Link className='btn btn-secondary' to='/genres'>Cancel</Link>
      </Form>
      )}
  
    </Formik>
  )
}

interface GenreFormProps {
    model: GenreCreationDTO
    onSubmit(values: GenreCreationDTO, action: FormikHelpers<GenreCreationDTO>) : void
}

export default GenreForm