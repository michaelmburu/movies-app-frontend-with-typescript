import React from 'react'
import Button from '../../Utils/Button'
import {useNavigate} from 'react-router-dom'
const CreateGenre = () => {

  const navigate = useNavigate()

  const saveGenre = () => {
    // Save genre in database

    navigate('/Genres')
  }
  return (
    <>
        <h3>Create Genre</h3>
       <Button onClick={saveGenre}>Save Changes</Button>
    </>
  )
}

export default CreateGenre