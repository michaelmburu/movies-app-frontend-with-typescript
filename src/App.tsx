import './App.css';
import Menu from './Components/Menu/Menu';
import {BrowserRouter, Routes, Route} from  'react-router-dom'
import routes from './RouteConfig/routeConfig'
function App() {

  

  return (
    <BrowserRouter>
      <Menu />
      <div className="container">
        <Routes>
            {routes.map(route => <Route key={route.path} path={route.path} element={<route.element />} />)}
        </Routes>     
      </div>
    </BrowserRouter>
   
  );
}


export default App;
