import axios from 'axios'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { urlGenres } from '../../Endpoints'
import DisplayErrors from '../../Utils/DisplayErrors'
import GenreForm from './GenreForm'
import { GenreCreationDTO } from './genres.model'
const CreateGenre = () => {

  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()
  const create = async (genre: GenreCreationDTO) => {
    try{
        await axios.post(urlGenres, genre)
        navigate('/genres')
    }
    catch(error: any){
      if(error && error.response)
      {
        setErrors(error.response.data)
      }
    }
  }

  return (
    <>
        <h3>Create Genre</h3>
        <DisplayErrors errors={errors} />
        <GenreForm model={{name: ''}} onSubmit={ async (value) => {
          await create(value)
        }} />
    </>
  )
}

export default CreateGenre