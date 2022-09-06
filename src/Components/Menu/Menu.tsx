import React from 'react'
import {NavLink} from  'react-router-dom'

const Menu = () => {
    return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className="container-fluid">
            <NavLink to="/" className="navbar-brand">React Movies</NavLink>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        <li className="nav-item">
                            <NavLink to="/genres" className="nav-link">Genres</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/movies/filter" className="nav-link">Filter</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/actors" className="nav-link">Actors</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/movietheaters" className="nav-link">Movie Theaters</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to="/movies/create" className="nav-link">Create Movie</NavLink>
                        </li>
                    </ul>
            </div>
        </div>
    </nav>
  )
}

export default Menu