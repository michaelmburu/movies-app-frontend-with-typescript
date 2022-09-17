import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { urlActors } from '../../Endpoints'
import {convertActorToFormData} from '../../Forms/FormDataConverter'
import DisplayErrors from '../../Utils/DisplayErrors'
import { ActorCreationDTO } from './actor.model'
import ActorForm from './ActorForm'

const CreateActor = () => {

  const navigate = useNavigate()
  const [errors, setErrors] = useState<string[]>([])
  const create = async (actor: ActorCreationDTO) => {
    try
    {
      const formData =  convertActorToFormData(actor);
      console.log(formData)
      await axios({
        method: 'post',
        url: urlActors,
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'}
      })
      navigate('/actors')
    }
    catch(error: any)
    {
      if(error && error.response)
      {
        setErrors(error.response.data)
      }
    }
  }
  return (
    <>
        <h3>Create Actor</h3>
        <DisplayErrors errors={errors} />
        <ActorForm model={{name: '', dateOfBirth: undefined}} onSubmit={async values => await create(values)} />
    </>
  )
}

export default CreateActor