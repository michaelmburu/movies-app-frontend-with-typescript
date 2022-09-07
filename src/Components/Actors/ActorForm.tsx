import React from 'react'
import {Link} from 'react-router-dom'
import {ActorCreationDTO} from './actor.model'
import {Formik, Form, FormikHelpers} from  'formik'
import * as Yup from 'yup'
import TextField from '../../Forms/TextField'
import Button from '../../Utils/Button'
import DateField from '../../Forms/DateField'
import ImageField from '../../Forms/ImageField'
import MarkdownField from '../../Forms/MarkdownField'


const ActorForm = (props: ActorFormProps) => {
  return (
    <Formik
        initialValues = {props.model}
        onSubmit= {props.onSubmit}
        validationSchema={Yup.object({
            name: Yup.string().required('This field is required').firstLetterUppercase(),
            dateOfBirth: Yup.date().nullable().required('This field is required')
        })}
    >
        {(formikProps) => (
            <Form>
                <TextField  displayName='Name' field='name'/>
                <DateField displayName='Date Of Birth' field='dateOfBirth' />
                <ImageField displayName='Picture' field='picture' imageUrl={props.model.pictureUrl} />
                <MarkdownField displayName='Biography' field='biography' />
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