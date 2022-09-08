import React from 'react'
import MovieTheaterForm from './MovieTheaterForm'

const EditMovieTheater = () => {
  return (
    <div>
       <MovieTheaterForm
          model={{name: 'IMax CBD Theater', 
          latitude: -1.2933164711537486, 
          longitude: 36.81383373696443}} 
          onSubmit={values => console.log(values)}
        />
    </div>
   
  )
}

export default EditMovieTheater