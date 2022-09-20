import axios, { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import {Outlet} from 'react-router-dom'
import { urlMovies } from '../../Endpoints'
import AlertContext from '../../Utils/AlertContext'
import Authorized from '../Auth/Authorized'
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
        <h3>In Theaters</h3>
        <MoviesList movieStatus='In Theatres' movies={movies.inTheaters} />

        <h3>Upcoming Releases</h3>
        <MoviesList movieStatus='Upcoming Releases' movies={movies.upComingReleases} />
        <Outlet />

    </AlertContext.Provider>
  )
}

export default HomeLayout