import React from 'react'
import { ActorMovieDTO } from '../Actors/actor.model'
import { GenreDTO } from '../Genres/genres.model'
import { MovieTheaterDTO } from '../MovieTheaters/MovieTheater.model'
import MovieForm from './MovieForm'

const EditMovie = () => {

  const noneselectedGenres: GenreDTO[] = [{id: 2, name: 'Scifi'}]
  const selectedGenres: GenreDTO[] = [{id: 1, name: 'Horror'}]

  const selectedMovieTheaters: MovieTheaterDTO[] = [{id: 2, name: 'IMax'}]

  const noneselectedMovieTheaters: MovieTheaterDTO[] = [{id: 1, name: 'Kenya Cinema'}]

  const selectedActors: ActorMovieDTO[] = [
    {
      name: "Tom Cruise", id: 1,  character: 'Ethan', picture: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Issa_Rae_%28cropped%29.jpg'
    }
  ]
  
  return (
    <>
        <h3>EditMovie</h3>
        <MovieForm model={{title: 'Topgun', inTheaters: true, trailer: 'url', releaseDate: new Date('2022-07-09')}} onSubmit={values => console.log(values)} 
        selectedGenres={selectedGenres}
        noneselectedGenres = {noneselectedGenres}

        noneselectedMovieTheaters={noneselectedMovieTheaters}
        selectedMovieTheaters={selectedMovieTheaters}

        selectedActors={selectedActors}
        />
    </>
  )
}

export default EditMovie