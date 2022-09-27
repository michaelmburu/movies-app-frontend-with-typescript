import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Button from '../../Utils/Button'
import AuthenticationContext from '../Auth/AuthenticationContext'
import Authorized from '../Auth/Authorized'
import { getClaims, logout } from '../Auth/handleJWT'

const Menu = () => {
  const { update, claims } = useContext(AuthenticationContext)
  const navigate = useNavigate()
  const getUserEmail = (): string => {
    return claims.filter((x) => x.name === 'email')[0]?.value
  }
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <NavLink to='/' className='navbar-brand'>
          React Movies
        </NavLink>
        <div
          className='collapse navbar-collapse'
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink to='/movies/filter' className='nav-link'>
                Filter Movies
              </NavLink>
            </li>

            <Authorized
              role='admin'
              authorized={
                <>
                  <li className='nav-item'>
                    <NavLink to='/genres' className='nav-link'>
                      Genres
                    </NavLink>
                  </li>

                  <li className='nav-item'>
                    <NavLink to='/actors' className='nav-link'>
                      Actors
                    </NavLink>
                  </li>

                  <li className='nav-item'>
                    <NavLink to='/movietheaters' className='nav-link'>
                      Movie Theaters
                    </NavLink>
                  </li>

                  <li className='nav-item'>
                    <NavLink to='/movies/create' className='nav-link'>
                      Create Movie
                    </NavLink>
                  </li>

                  <li className='nav-item'>
                    <NavLink to='/users' className='nav-link'>
                      Users
                    </NavLink>
                  </li>
                </>
              }
            />
          </ul>
          <div className='d-flex'>
            <Authorized
              authorized={
                <>
                  <span className='nav-link'>Hello, {getUserEmail()}</span>
                  <Button
                    onClick={() => {
                      logout()
                      update([])
                      navigate('/')
                    }}
                  >
                    Logout
                  </Button>
                </>
              }
              notAuthorized={
                <>
                  <Link to='/register' className='nav-link btn btn-link'>
                    Register
                  </Link>
                  <Link to='/login' className='nav-link btn btn-link'>
                    Login
                  </Link>
                </>
              }
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Menu
