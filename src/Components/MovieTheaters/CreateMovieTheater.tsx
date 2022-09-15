import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { urlMovieTheaters } from '../../Endpoints'
import DisplayErrors from '../../Utils/DisplayErrors'
import { MovieTheaterCreationDTO } from './MovieTheater.model'
import MovieTheaterForm from './MovieTheaterForm'

const CreateMovieTheater = () => {

  const navigate = useNavigate()
  
  const [errors, setErrors] = useState<string[]>([])

  const create = async (movieTheater: MovieTheaterCreationDTO) => {

      try{
        await axios.post(urlMovieTheaters, movieTheater);
        navigate('/movietheaters')
      } catch(error: any) {
        if(error && error.response)
        {
          setErrors(error.response.data);
        }
      }
  }

  return (
    <div>
        <h3>Create Movie Theater</h3>
        <DisplayErrors errors={errors} />
        <MovieTheaterForm model={{name: ''}} onSubmit={async values => await create(values)} />
    </div>
  )
}

export default CreateMovieTheater