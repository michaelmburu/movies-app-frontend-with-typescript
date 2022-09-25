import { Form, Formik, FormikHelpers } from 'formik'
import React from 'react'
import { UserCredentialsDTO } from './Auth.Model'
import * as Yup from  'yup'
import TextField from '../../Forms/TextField'
import Button from '../../Utils/Button'
import { Link } from 'react-router-dom'
const AuthForm = (props: AuthFormProps) => {
  return (
    <Formik
      initialValues={props.model}
      onSubmit = {props.onSubmit}
      validationSchema={Yup.object({
        email: Yup.string().required('This field is required')
                            .email('You have to insert a valid email'),
        password: Yup.string().required('This field is required')
      })}
    >
      {formikProps => (
        <Form>
          <TextField field='email' displayName='Email' />
          <TextField field='password' displayName='Password' type="password" />

          <Button disabled={formikProps.isSubmitting} type="submit">Send</Button>
          <Link className='btn btn-danger' to="/">Cancel</Link>
        </Form>
      )}
    </Formik>
  )
}

interface AuthFormProps {
    model: UserCredentialsDTO
    onSubmit(values: UserCredentialsDTO, actions: FormikHelpers<UserCredentialsDTO>): void
}

export default AuthForm