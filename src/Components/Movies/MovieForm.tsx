import React, { useState } from 'react'
import {Link} from  'react-router-dom'
import {Formik, Form, useFormikContext, FormikHelpers} from 'formik'
import * as Yup from 'yup'
import { movieCreationDTO } from './movies.model'
import Button from '../../Utils/Button'
import TextField from '../../Forms/TextField'
import DateField from '../../Forms/DateField'
import ImageField from '../../Forms/ImageField'
import CheckboxField from '../../Forms/CheckboxField'
import MultipleSelector from '../../Forms/MultipleSelector'
import { MultipleSelectorModel } from '../../Forms/MultipleSelectorModel'
import { GenreDTO } from '../Genres/genres.model'
import { MovieTheaterDTO } from '../MovieTheaters/MovieTheater.model'
import TypeAheadActors from '../../Forms/TypeAheadActors'
import { ActorMovieDTO } from '../Actors/actor.model'
const MovieForm = (props: MovieFormProps) => {

  
    const [selectedActors, setSelectedActors] = useState(props.selectedActors)

    const mapToModel = (items: {id: number, name: string}[]): MultipleSelectorModel[] => {
      return items.map(item => {
        return {key: item.id, value: item.name}
      })
    }

    //Genres
    const [selectedGenres, setSelectedGenres] = useState(mapToModel(props.selectedGenres))
    const [noneSelectedGenres, setNoneSelectedGenres] = useState(mapToModel(props.noneselectedGenres))

    //MovieTheaters
    const [selectedMovieTheaters, setSelectedMovieTheaters] = useState(mapToModel(props.selectedMovieTheaters))
    const [noneSelectedMovieTheaters, setNoneSelectedMovieTheaters] = useState(mapToModel(props.noneselectedMovieTheaters))

    return (
      <div>
          <Formik
              initialValues={props.model}
              onSubmit={(values, actions) => {
                values.genresIds = selectedGenres.map(item => item.key)
                values.movieTheaterIds = selectedMovieTheaters.map(item => item.key)
                values.actors = selectedActors
                props.onSubmit(values, actions)
              }}
              validationSchema= {Yup.object({
                  title: Yup.string().required('This field is required').firstLetterUppercase()

              })}
          >
            {(formikProps) => (
              <Form>
                      <TextField displayName='Title' field='title' /> 
                      <CheckboxField displayName='In Theaters' field='inTheaters' />
                      <TextField displayName='Trailer' field='trailer' /> 
                      <DateField displayName='Release Date' field='releaseDate' />
                      <ImageField displayName='Poster' field='poster' imageUrl={props.model.posterUrl} />

                      <MultipleSelector displayName='Genres' noneSelected={noneSelectedGenres} selected={selectedGenres} 
                      onChange={(selected, noneselected) => {
                        setSelectedGenres(selected)
                        setNoneSelectedGenres(noneselected)
                      }}
                      />

                      <MultipleSelector displayName='Movie Theaters' noneSelected={noneSelectedMovieTheaters} selected={selectedMovieTheaters} 
                      onChange={(selected, noneselected) => {
                        setSelectedMovieTheaters(selected)
                        setNoneSelectedMovieTheaters(noneselected)
                      }}
                      />

                      <TypeAheadActors actors={selectedActors} displayName="Actors"
                        onAdd={actors => {
                          setSelectedActors(actors)
                        }}
                        onRemove={actor => {
                          const actors = selectedActors.filter(x => x!== actor)
                          setSelectedActors(actors)
                        }}
                        listUI={(actor: ActorMovieDTO) => 
                          <>
                            {actor.name} / <input placeholder='Character' type='text' 
                            value={actor.character} 
                            // Update selectedActors array with the value users are typing
                            onChange={e => {
                              const index = selectedActors.findIndex(x => x.id === actor.id)
                              const actors = [...selectedActors]
                              actors[index].character = e.currentTarget.value
                              setSelectedActors(actors)
                            }} />
                          </>
                        }
                      />

                      <Button disabled={formikProps.isSubmitting} type='submit'>Save Changes</Button>
                      <Link className='btn btn-secondary' to='/movies'>Cancel</Link>
              </Form>
            )}
          </Formik>
      </div>
    )
  }

interface MovieFormProps {
    model: movieCreationDTO
    onSubmit(values: movieCreationDTO, actions: FormikHelpers<movieCreationDTO>): void
    selectedGenres: GenreDTO[]
    noneselectedGenres: GenreDTO[]
    selectedMovieTheaters: MovieTheaterDTO[]
    noneselectedMovieTheaters: MovieTheaterDTO[]
    selectedActors: ActorMovieDTO[]
    
}


export default MovieForm