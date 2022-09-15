import React from 'react'
import { urlMovieTheaters } from '../../Endpoints'
import EditEntity from '../../Utils/EditEntity'
import { MovieTheaterCreationDTO, MovieTheaterDTO } from './MovieTheater.model'
import MovieTheaterForm from './MovieTheaterForm'

const EditMovieTheater = () => {
  return (
    <EditEntity<MovieTheaterCreationDTO, MovieTheaterDTO>
        url={urlMovieTheaters}
        indexUrl="/movietheaters"
        entityName='Movie Theater'
      >
        {(entity, edit) => 
          <MovieTheaterForm model={entity} onSubmit={async values => await edit(values)} />
        }
    </EditEntity>
  )
}

export default EditMovieTheater