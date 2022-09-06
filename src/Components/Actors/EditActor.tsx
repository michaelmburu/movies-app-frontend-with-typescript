import React from 'react'
import ActorForm from './ActorForm'

const EditActor = () => {
  return (
    <>
        <h3>Edit Actors</h3>
        <ActorForm model={{name: 'Tom Holland', dateOfBirth: new Date('02-02-1976')}} onSubmit={values => console.log(values)} />
    </>
  )
}

export default EditActor