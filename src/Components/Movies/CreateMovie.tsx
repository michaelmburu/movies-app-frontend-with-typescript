import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { urlMovies } from '../../Endpoints'
import Loading from '../../Utils/Loading'
import { GenreDTO } from '../Genres/genres.model'
import { MovieTheaterDTO } from '../MovieTheaters/MovieTheater.model'
import MovieForm from './MovieForm'
import { MoviesPostGetDTO } from './movies.model'

const CreateMovie = () => {

  const [noneSelectedGenres, setNoneSelectedGenres] = useState<GenreDTO[]>([])
  const [noneselectedMovieTheaters, setNoneSelectedMovieTheaters] = useState<MovieTheaterDTO[]>([])
  const [loading, setLoading] = useState(true)



  useEffect(() => {

    axios.get(`${urlMovies}/postget`)
      .then((response: AxiosResponse<MoviesPostGetDTO>) => {
        setNoneSelectedGenres(response.data.genres)
        setNoneSelectedMovieTheaters(response.data.movieTheaters)
        setLoading(false)
      })

  }, [])

  return (
    <>
      <h3>Create Movie </h3>
      {loading ? <Loading /> : 
        <MovieForm model={{title: '', inTheaters: false, trailer: ''}} 
          onSubmit={values => console.log(values)} 
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