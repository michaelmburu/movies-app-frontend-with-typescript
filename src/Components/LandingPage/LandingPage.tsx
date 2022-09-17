import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'
import { urlMovies } from '../../Endpoints'
import AlertContext from '../../Utils/AlertContext'
import { landingPageDTO } from '../Movies/movies.model'
import MoviesList from '../Movies/MoviesList'
const HomeLayout = () => {

    // Manage movie state
  const [movies, setMovies] = useState<landingPageDTO>({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    axios.get(urlMovies).then((response: AxiosResponse<landingPageDTO>) => {
      setMovies(response.data)
    })
  }

  return (
    <AlertContext.Provider value={() => {
      loadData()
    }}>
        <MoviesList movieStatus='In Theatres' movies={movies.inTheaters} />
        <MoviesList movieStatus='Upcoming Releases' movies={movies.upComingReleases} />
        <Outlet />
    </AlertContext.Provider>
  )
}

export default HomeLayout