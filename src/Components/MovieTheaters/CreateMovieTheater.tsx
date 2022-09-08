import React from 'react'
import MovieTheaterForm from './MovieTheaterForm'

const CreateMovieTheater = () => {
  return (
    <div>
        <h3>Create Movie Theater</h3>
        <MovieTheaterForm model={{name: ''}} onSubmit={values => console.log(values)} />
    </div>
  )
}

export default CreateMovieTheater