import axios from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { urlMovies } from '../../Endpoints'
import AlertContext from '../../Utils/AlertContext'
import Button from '../../Utils/Button'
import css from './IndividualMovie.module.css'
import { movieDTO } from './movies.model'

const IndividualMovie = (props: movieDTO) => {

  //Build movie link
  const buildLink = `/movie/${props.id}`

  //Use Alert AlertContext
  const alertContext = useContext(AlertContext)

  const deleteMovie = () => {
    axios.delete(`${urlMovies}/${props.id}`)
          .then(() => {
            //Call context to get loadData()
            alertContext()
          })
  }
  return (
    <div className={css.div}>
        <Link to={buildLink}>
          <img alt={props.title} src={props.poster} />
        </Link>
        <p>
          <Link to={buildLink}>{props.title}</Link>
        </p>
        <div>
          <Link style={{marginRight: '1rem'}} className="btn btn-info" to={`/movies/edit/${props.id}`}>Edit</Link>
          <Button onClick={() =>  deleteMovie()} className="btn btn-danger">Delete</Button>
        </div>
    </div>
  )
}

export default IndividualMovie