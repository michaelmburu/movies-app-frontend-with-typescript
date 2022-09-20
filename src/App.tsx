import './App.css'
import Menu from './Components/Menu/Menu'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './RouteConfig/routeConfig'
import configureValidations from './Forms/FormValidation'
import { useState } from 'react'
import { Claim } from './Components/Auth/Auth.Model'
import AuthenticationContext from './Components/Auth/AuthenticationContext'

// Configure Yup validations
configureValidations()

function App() {
  //Import claims
  const [claims, setClaims] = useState<Claim[]>([
    { name: 'role', value: 'admin' },
  ])

  //Check for admins
  const isAdmin = () => {
    return (
      claims.findIndex(
        (claim) => claim.name === 'role' && claim.value === 'admin'
      ) > -1
    )
  }

  console.log(isAdmin())

  return (
    <BrowserRouter>
      <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
        <Menu />
        <div className='container'>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={ route.isAdmin && !isAdmin() ? <>You are not allowed to see this page</> : <route.element />  }
              >
              </Route>
             
            ))}
           
          </Routes>
        </div>
        <footer className='bd-footer py-5 mt-5 bg-light'>
          <div className='container'>
            Movie App, {new Date().getFullYear().toString()}
          </div>
        </footer>
      </AuthenticationContext.Provider>
    </BrowserRouter>
  )
}

export default App
