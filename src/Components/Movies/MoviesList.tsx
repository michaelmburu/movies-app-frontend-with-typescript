import React from 'react'
import GenericList from '../../Utils/GenericList'
import Loading from '../../Utils/Loading'
import IndividualMovie from './IndividualMovie'
import { movieDTO } from './movies.model'
import css from  './MoviesList.module.css'

const MoviesList = (props: MovieListProps) => {
  return (
    <GenericList list={props.movies}>
      <div className={css.div}>
        {props.movies?.map((movie) => <IndividualMovie {...movie} key={movie.id} />
       ) }
        
      </div>
    </GenericList>

  )
}

interface MovieListProps {
    movies?: movieDTO[]
}

export default MoviesList