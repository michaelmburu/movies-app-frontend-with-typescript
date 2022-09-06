import React from 'react'
import {Link} from 'react-router-dom'
import {ActorCreationDTO} from './actor.model'
import {Formik, Form, FormikHelpers} from  'formik'
import * as Yup from 'yup'
import TextField from '../../Forms/TextField'
import Button from '../../Utils/Button'


const ActorForm = (props: ActorFormProps) => {
  return (
    <Formik
        initialValues = {props.model}
        onSubmit= {props.onSubmit}
        validationSchema={Yup.object({
            name: Yup.string().required('This field is required').firstLetterUppercase()
        })}
    >
        {(formikProps) => (
            <Form>
                <TextField  displayName='Name' field='name'/>

                <Button disabled={formikProps.isSubmitting} type="submit">Save Changes</Button>

                <Link to='/actors' className='btn btn-secondary'>Cancel</Link>
            </Form>
        )}
    </Formik>
  )
}

interface ActorFormProps {
    model: ActorCreationDTO
    onSubmit(values: ActorCreationDTO, action: FormikHelpers<ActorCreationDTO>): void
}

export default ActorForm