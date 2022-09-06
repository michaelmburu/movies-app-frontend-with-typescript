import React from 'react'
import {Link} from 'react-router-dom'
const Actors = () => {
  return (
    <>
        <h3>Actors</h3>
        <Link className="btn btn-primary" to="/actors/create">Create Actor</Link> 
    </>
  )
}

export default Actors