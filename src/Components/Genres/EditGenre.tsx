import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { urlGenres } from '../../Endpoints'
import DisplayErrors from '../../Utils/DisplayErrors'
import Loading from '../../Utils/Loading'
import GenreForm from './GenreForm'
import { GenreCreationDTO, GenreDTO } from './genres.model'
const EditGenre = () => {

  const {id}: any = useParams()
  const [genre, setGenre] = useState<GenreCreationDTO>();
  const [errors, setErrors] = useState<string[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${urlGenres}/${id}`)
          .then((response: AxiosResponse<GenreDTO>) => {
            setGenre(response.data)
          })
  }, [id])

  const edit = async (genreToEdit: GenreCreationDTO) => {
    try{
      await axios.put(`${urlGenres}/${id}`, genreToEdit)
    } catch(error: any){
      if(error && error.response)
      {
        setErrors(error.response.data)
      }
      
    }
  }
  return (
    <>
        <h3>Edit Genre</h3>
        <DisplayErrors errors={errors} />
          {genre &&  <GenreForm model={genre} onSubmit = { async value =>{
              await edit(value)
              navigate("/genres")
          }}
       /> }
    </>
  )
}

export default EditGenre