import React from 'react'
import ActorForm from './ActorForm'

const EditActor = () => {
  return (
    <>
        <h3>Edit Actors</h3>
        <ActorForm model={{name: 'Idris Elba', dateOfBirth: new Date('02-02-1976'), pictureUrl: "https://m.media-amazon.com/images/M/MV5BNzEzMTI2NjEyNF5BMl5BanBnXkFtZTcwNTA0OTE4OA@@._V1_UX214_CR0,0,214,317_AL_.jpg"}} 
        
        onSubmit={values => console.log(values)} />
    </>
  )
}

export default EditActor