import React from 'react'
import { GenreDTO } from '../Genres/genres.model'
import { MovieTheaterDTO } from '../MovieTheaters/MovieTheater.model'
import MovieForm from './MovieForm'

const CreateMovie = () => {

  const noneselectedGenres: GenreDTO[] = [{id: 1, name: 'Horror'}, {id: 2, name: 'Scifi'}]
  
  const noneselectedMovieTheaters: MovieTheaterDTO[] = [{id: 1, name: 'Kenya Cinema'}, {id: 2, name: 'IMax'}]

  return (
    <>
      <h3>Create Movie </h3>
    <MovieForm model={{title: '', inTheaters: false, trailer: ''}} 
      onSubmit={values => console.log(values)} 
      noneselectedGenres={noneselectedGenres}
      selectedGenres={[]}

      noneselectedMovieTheaters={noneselectedMovieTheaters}
      selectedMovieTheaters={[]}

      selectedActors={[]}
    />
    </>
  )
}

export default CreateMovie