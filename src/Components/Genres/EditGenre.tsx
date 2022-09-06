import React from 'react'
import {useParams} from 'react-router-dom'
const EditGenre = () => {

  const {id}: any = useParams()
  return (
    <>
        <h3>Edit Genre</h3>
        The id is {id}
    </>
  )
}

export default EditGenre