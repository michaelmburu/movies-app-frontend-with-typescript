import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { urlMovies } from '../../Endpoints'
import Loading from '../../Utils/Loading'
import CoordinatesDTO from '../Map/CoordinatesDTO.model'
import Map from '../Map/Map'
import MovieTheaters from '../MovieTheaters/MovieTheaters'
import { movieDTO } from './movies.model'
import MoviesList from './MoviesList'

const MovieDetails = () => {

  const {id}: any = useParams()
  const [movie, setMovie] = useState<movieDTO>()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    axios.get(`${urlMovies}/${id}`)
          .then((response: AxiosResponse<movieDTO>) => {
            try{
              response.data.releaseDate = new Date(response.data.releaseDate)
              setMovie(response.data)
              setLoading(false)
            } catch(error)
            {
              setLoading(false)
            }
           
          })
  }, [id])

  if(loading) 
  {
    <Loading />
  }

  const generateEmbeddedVideoUrl = (trailer: string): string => {
    if(!trailer) {return ''}
    let videoId = trailer.split('v=')[1]
    const amperSandPos = videoId.indexOf('&')
    if(amperSandPos !== -1)
    {
      videoId  = videoId.substring(0, amperSandPos)
    }

    return `https://www.youtube.com/embed/${videoId}`
  }

  const transformCoordinates = (): CoordinatesDTO[] => {
    if(movie?.movieTheaters){
      const coordinates = movie.movieTheaters.map(movieTheater => {
        return {lat: movieTheater.latitude, lng: movieTheater.longitude, name: movieTheater.name} as CoordinatesDTO
      })

      return coordinates
    }

    return []
  }

  return (
    <>
    
      { 
        movie ? 
          <div>
            <h2>{movie.title} ({movie.releaseDate.getFullYear()})</h2>
            {movie.genres?.map(genre => 
              <Link key={genre.id} style={{marginRight: '5px'}} className="btn btn-primary btn-sm rounded-pill" to={`/moviies/filter?genreId=${genre.id}`}>{genre.name}</Link>
              )} | {movie.releaseDate.toDateString()}

            <div style={{display: 'flex', marginTop: '1rem'}}>
              <span style={{display: 'inline-block', marginRight: '1rem'}}>
                <img src={movie.poster} alt={movie.title} style={{width: '225px', height: '315px'}} />
              </span>
              {movie.trailer ? <div> 
                  <iframe title='youtube-trailer' width="560" height="315" src={generateEmbeddedVideoUrl(movie.trailer)} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picure" allowFullScreen>

                  </iframe>
                </div> : null
              }
            </div>
            {movie.summary ? 
              <div style={{marginTop: '1rem'}}>
                <h3>Summary</h3>
                <div> 
                  <ReactMarkdown>{movie.summary}</ReactMarkdown>
                </div>
              </div> : null
            }

            {movie.actors && movie.actors.length > 0 ? 
              <div style={{marginTop: '1rem'}}>
                <h3>Actors</h3>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                  {movie.actors.map(actor => 
                    <div key={actor.id} style={{marginBottom: '2px'}}>
                        <img alt={actor.name} src={actor.picture} style={{width: '50px', verticalAlign: 'middle'}} />
                        <span style={{display: 'inline-block', width: '200px', marginLeft: '1rem'}}>{actor.name}</span>
                        <span style={{display: 'inline-block', width: '45px'}}>...</span>
                        <span>{actor.character}</span>
                    </div>
                  )}
                </div>
              </div> 
              :null
             }

             {movie.movieTheaters && movie.movieTheaters.length > 0 ? 
              <div style={{marginTop: '1rem', marginBottom: '1rem'}}>
                <h2>Showing on</h2>
                <Map coordinates={transformCoordinates()} readOnly={true} />
              </div> 
              : null}
          </div> 
        : <>There are no movies in the database</>
      }
    </>
  )
}

export default MovieDetails