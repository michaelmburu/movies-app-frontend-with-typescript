import React from 'react'
import GenericList from '../../Utils/GenericList'
import IndividualMovie from './IndividualMovie'
import css from  './MoviesList.module.css'
import {movieListProps} from '../Movies/movies.model'

const MoviesList = (props: movieListProps) => {
  return (
    <>
    <GenericList list={props.movies}>
      <>
      
      <div className={css.div}>
        {props.movies?.map((movie) => <IndividualMovie {...movie} key={movie.id} />
       ) }       
      </div>
      </>
    
    </GenericList>
    </>
   

  )
}

export default MoviesList