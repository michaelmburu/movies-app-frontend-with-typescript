import React from 'react'
import {Link} from 'react-router-dom'
import {Formik, Form, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import Map from '../Map/Map'
import TextField from '../../Forms/TextField'
import Button from '../../Utils/Button'
import { MovieTheaterCreationDTO } from './MovieTheater.model'
import MapField from '../Map/MapField'
import CoordinatesDTO from '../Map/CoordinatesDTO.model'

const MovieTheaterForm = (props: MovieTheaterFormProps) => {

    const transformCoordinates = (): CoordinatesDTO[] | undefined  => {
        if(props.model.latitude && props.model.longitude){
            const response: CoordinatesDTO = {lat: props.model.latitude, lng: props.model.longitude}
            return [response]
        }

        return undefined
    }
  return (
    <Formik
        initialValues={props.model}
        onSubmit={props.onSubmit}
        validationSchema = {Yup.object({
            name: Yup.string().required('This field is required').firstLetterUppercase()
        })}
    >
        {(formikProps) => (
            <Form>
                <TextField displayName='Name' field='name'/>
                <div style={{marginBottom: '1rem'}}>
                    <MapField latField='latitude' lngField='longitude' 
                        coordinates={transformCoordinates()}
                    />
                </div>
                <Button disabled={formikProps.isSubmitting} type='submit'>Save Changes</Button>
                <Link className='btn btn-secondary' to='/movietheaters'>Cancel</Link>
            </Form>
        )}

    </Formik>
  )
}

interface MovieTheaterFormProps {
    model: MovieTheaterCreationDTO
    onSubmit(values: MovieTheaterCreationDTO, actions: FormikHelpers<MovieTheaterCreationDTO>) : void
}

export default MovieTheaterForm