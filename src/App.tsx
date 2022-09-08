import './App.css';
import Menu from './Components/Menu/Menu';
import {BrowserRouter, Routes, Route} from  'react-router-dom'
import routes from './RouteConfig/routeConfig'
import configureValidations from './Forms/FormValidation'

// Configure Yup validations
configureValidations()

function App() {

  return (
    <BrowserRouter>
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
    </BrowserRouter>
   
  );
}


export default App;
