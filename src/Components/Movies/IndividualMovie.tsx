import React from 'react'
import { Link } from 'react-router-dom'
import css from './IndividualMovie.module.css'
import { movieDTO } from './movies.model'

const IndividualMovie = (props: movieDTO) => {

  //Build movie link
  const buildLink = `/movie/${props.id}`

  return (
    <div className={css.div}>
        <Link to={buildLink}>
          <img alt={props.title} src={props.poster} />
        </Link>
        <p>
          <Link to={buildLink}>{props.title}</Link>
        </p>
    </div>
  )
}

export default IndividualMovie