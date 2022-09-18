import './App.css';
import Menu from './Components/Menu/Menu';
import {BrowserRouter, Routes, Route} from  'react-router-dom'
import routes from './RouteConfig/routeConfig'
import configureValidations from './Forms/FormValidation'
import { useState } from 'react';
import { Claim } from './Components/Auth/Auth.Model';
import AuthenticationContext from './Components/Auth/AuthenticationContext';

// Configure Yup validations
configureValidations()

function App() {

  //Import claims
  const [claims, setClaims] = useState<Claim[]>([
    {name: 'email', value: "ichangaimichael@yahoo.com"}
  ])

  return (
    <BrowserRouter>
    <AuthenticationContext.Provider value={{claims, update: setClaims}}>
      <Menu />
        <div className="container">
          <Routes>
              {routes.map(route => <Route key={route.path} path={route.path} element={<route.element />} />)}
          </Routes>     
        </div>
        <footer className='bd-footer py-5 mt-5 bg-light'>
          <div className='container'>
            Movie App, {new Date().getFullYear().toString()}
          </div>
        </footer>
    </AuthenticationContext.Provider>
    
    </BrowserRouter>
   
  );
}


export default App;
