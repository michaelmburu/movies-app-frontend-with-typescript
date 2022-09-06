import React, { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'
import { landingPageDTO } from '../Movies/movies.model'
import MoviesList from '../Movies/MoviesList'
const HomeLayout = () => {

    // Manage movie state
  const [movies, setMovies] = useState<landingPageDTO>({})

  useEffect(() => {
    const timerId = setTimeout(() => {
      setMovies({
        inTheaters: [

        {
          id: 1,
          title: 'Avengers: Infinity War',
          poster: 'https://upload.wikimedia.org/wikipedia/en/4/4d/Avengers_Infinity_War_poster.jpg'
        },
        {
          id: 2,
          title: 'The Air Up There',
          poster: 'https://upload.wikimedia.org/wikipedia/en/a/a6/Air_up_there.jpg'
        }
    
    ],
    upComingReleases : [
    
      {
        id: 1,
        title: 'BlackAdam',
        poster: 'https://i.pinimg.com/736x/fa/df/b4/fadfb421233468cc7e113064c1db4475.jpg'
      },
      {
        id: 2,
        title: 'Avatar',
        poster: 'https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg'
      }
    ]
    })
    }, 0)

    return () => clearTimeout(timerId)

  }, [])

  return (
    <>
        <MoviesList movieStatus='In Theatres' movies={movies.inTheaters} />
        <MoviesList movieStatus='Upcoming Releases' movies={movies.upComingReleases} />
        <Outlet />
    </>
  )
}

export default HomeLayout