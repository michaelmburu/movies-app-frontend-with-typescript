import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { urlMovies } from '../../Endpoints'
import { convertMovieToFormData } from '../../Forms/FormDataConverter'
import DisplayErrors from '../../Utils/DisplayErrors'
import Loading from '../../Utils/Loading'
import { GenreDTO } from '../Genres/genres.model'
import { MovieTheaterDTO } from '../MovieTheaters/MovieTheater.model'
import MovieForm from './MovieForm'
import { movieCreationDTO, MoviePostGetDTO } from './movies.model'

const CreateMovie = () => {

  const navigate = useNavigate()

  const [noneSelectedGenres, setNoneSelectedGenres] = useState<GenreDTO[]>([])
  const [noneselectedMovieTheaters, setNoneSelectedMovieTheaters] = useState<MovieTheaterDTO[]>([])
  const [errors, setErrors] = useState<string[]>([])
  const [loading, setLoading] = useState(true)



  useEffect(() => {

    axios.get(`${urlMovies}/postget`)
      .then((response: AxiosResponse<MoviePostGetDTO>) => {
        setNoneSelectedGenres(response.data.genres)
        setNoneSelectedMovieTheaters(response.data.movieTheaters)
        setLoading(false)
      })

  }, [])

  const create = async (movie: movieCreationDTO) => {
    try{
        const formData = convertMovieToFormData(movie)
        const response  = await axios({
          method: 'post',
          url: urlMovies,
          data: formData,
          headers: {'Content-Type' : 'multipart/form-data'}
        })

        navigate(`/movie/${response.data}`)
    }
    catch(error: any)
    {
      setErrors(errors)
    }
  }

  return (
    <>
      <h3>Create Movie </h3>
      <DisplayErrors errors={errors} />
      {loading ? <Loading /> : 
        <MovieForm model={{title: '', inTheaters: false, trailer: ''}} 
          onSubmit={async values => await create(values)} 
          noneselectedGenres={noneSelectedGenres}
          selectedGenres={[]}

          noneselectedMovieTheaters={noneselectedMovieTheaters}
          selectedMovieTheaters={[]}

          selectedActors={[]}
    /> }
    </>
  )
}

export default CreateMovie