import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { urlMovies } from '../../Endpoints'
import { convertMovieToFormData } from '../../Forms/FormDataConverter'
import DisplayErrors from '../../Utils/DisplayErrors'
import Loading from '../../Utils/Loading'
import MovieForm from './MovieForm'
import { movieCreationDTO, MoviePutGetDTO } from './movies.model'

const EditMovie = () => {

  const {id} = useParams()
  const navigate = useNavigate()

  const [movie, setMovie] = useState<movieCreationDTO>()
  const [moviePutGet, setMoviePutGet] = useState<MoviePutGetDTO>()
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    console.log(id)
    axios.get(`${urlMovies}/putget/${id}`)
          .then((response: AxiosResponse<MoviePutGetDTO>) => {
              const model: movieCreationDTO = {
                title: response.data.movie.title,
                inTheaters: response.data.movie.inTheaters,
                trailer: response.data.movie.trailer,
                posterUrl: response.data.movie.poster,
                summary: response.data.movie.summary,
                releaseDate: new Date(response.data.movie.releaseDate)
              }

              setMovie(model)
              setMoviePutGet(response.data)
          })
  }, [id])

  const edit = async (movieToEdit: movieCreationDTO) => {
    try{
      const formData = convertMovieToFormData(movieToEdit)
      await axios({
        method: 'put',
        url: `${urlMovies}/${id}`,
        data: formData,
        headers: {'Content-Type': "mulitpart/form-data"}
      })
      navigate(`/movie/${id}`)
    } catch(error: any){
      setErrors(error.response.data)
    }
  }
  return (
    <>
        <h3>EditMovie</h3>
        <DisplayErrors errors={errors}/>
       {movie && moviePutGet ?  <MovieForm model={movie} onSubmit={async values => await edit(values)} 
        selectedGenres={moviePutGet.noneSelectedGenres}
        noneselectedGenres = {moviePutGet.noneSelectedGenres}

        noneselectedMovieTheaters={moviePutGet.noneSelectedMovieTheaters}
        selectedMovieTheaters={moviePutGet.selectedMovieTheaters}
        selectedActors={moviePutGet.actors}
        /> : <Loading />}
    </>
  )
}

export default EditMovie