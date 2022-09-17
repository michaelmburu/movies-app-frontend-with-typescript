import React, { useEffect, useState } from 'react'
import {Formik, Form, Field} from 'formik'
import { GenreDTO } from '../Genres/genres.model'
import Button from '../../Utils/Button'
import axios, { AxiosResponse } from 'axios'
import { urlGenres, urlMovies } from '../../Endpoints'
import { movieDTO } from './movies.model'
import MoviesList from './MoviesList'

const FilterMovies = () => {

  const initialValues: FilterMoviesForm = {
    title: '',
    genreId: 0,
    upcomingReleases: false,
    inTheaters: false,
    page: 1,
    recordsPerPage: 10
  }


  const [genres, setGenres] = useState<GenreDTO[]>()
  const [movies, setMovies] = useState<movieDTO[]>()

  useEffect(() => {
    axios.get(`${urlGenres}/all`)
          .then((response: AxiosResponse<GenreDTO[]>) => {
            setGenres(response.data)
          })
  }, [])

  const searchMovies = (values: FilterMoviesForm) => {
    axios.get(`${urlMovies}/filter`, {params: values})
          .then((response: AxiosResponse<movieDTO[]>) => {
            setMovies(response.data)
          })
  }

  useEffect(() => {
    searchMovies(initialValues)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
        <h3>Filter Movies</h3>
        <Formik initialValues={initialValues}
          onSubmit={values => {
            values.page = 1
            searchMovies(values)
          }}
        >
          {(formikProps) => (
              <>
                    <Form>


                    <div  className='row gx-3 align-items-center'>

                      <div className='col-auto'>
                        <input type='text' className='form-control' id='title' placeholder='Title of the movie' 
                        {...formikProps.getFieldProps('title')}
                        />
                      </div>

                      <div className='col-auto'>
                        <select className='form-select'  {...formikProps.getFieldProps('genreId')}>
                        <option value='0'>Choose a Genre</option>
                          {genres && genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                        </select>
                      </div>


                      <div className='col-auto'>
                        <div className='form-check'>
                          <Field className="form-check-input" id="upcomingReleases" name="upcomingReleases" type="checkbox" />
                          <label className='form-check-label' htmlFor='upcomingReleases'>Upcoming Releases</label>
                        </div>
                      </div>

                      <div className='col-auto'>
                        <div className='form-check'>
                          <Field className="form-check-input" id="inTheaters" name="inTheaters" type="checkbox" />
                          <label className='form-check-label' htmlFor='inTheaters'>In Theaters</label>
                        </div>
                      </div>

                      <div className='col-auto'>

                        <Button className='btn btn-primary' onClick={() => formikProps.submitForm()}>
                          Filter
                        </Button>

                        <Button className="btn btn-danger ms-3" onClick={() => {
                          formikProps.setValues(initialValues)
                          searchMovies(initialValues)
                          }}>
                          Clear
                        </Button>
                      </div>

                    </div>
                    </Form>
                    <MoviesList movies={movies} />
          </>
         )}
            </Formik>
      </>
  )
}

interface FilterMoviesForm {
  title: string
  genreId: number
  upcomingReleases: boolean
  inTheaters: boolean
  page: number,
  recordsPerPage: number
}

export default FilterMovies