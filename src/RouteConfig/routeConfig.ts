import Actors from '../Components/Actors/Actors'
import CreateActor from '../Components/Actors/CreateActor'
import EditActor from '../Components/Actors/EditActor'
import IndexUsers from '../Components/Auth/IndexUsers'
import Login from '../Components/Auth/Login'
import Register from '../Components/Auth/Register'
import CreateGenre from '../Components/Genres/CreateGenre'
import EditGenre from '../Components/Genres/EditGenre'
import Genres from '../Components/Genres/Genres'
import LandingPage from '../Components/LandingPage/LandingPage'
import CreateMovie from '../Components/Movies/CreateMovie'
import EditMovie from '../Components/Movies/EditMovie'
import FilterMovies from '../Components/Movies/FilterMovies'
import MovieDetails from '../Components/Movies/MovieDetails'
import CreateMovieTheater from '../Components/MovieTheaters/CreateMovieTheater'
import EditMovieTheater from '../Components/MovieTheaters/EditMovieTheater'
import MovieTheaters from '../Components/MovieTheaters/MovieTheaters'
import NotFound from '../Components/NotFound/NotFound'

const routes = [
  //Register
  { path: '/register', element: Register },
  { path: '/login', element: Login },
  { path: '/users', element: IndexUsers },

  //Genres
  { path: '/genres', element: Genres, exact: true, isAdmin: true },
  { path: '/genres/create', element: CreateGenre, isAdmin: true },
  { path: '/genres/edit/:id', element: EditGenre, isAdmin: true },

  //Actors
  { path: '/actors', element: Actors, exact: true, isAdmin: true },
  { path: '/actors/create', element: CreateActor, isAdmin: true },
  { path: '/actors/edit/:id', element: EditActor, isAdmin: true },

  //MovieTheaters
  {
    path: '/movietheaters',
    element: MovieTheaters,
    exact: true,
    isAdmin: true,
  },
  { path: '/movietheaters/create', element: CreateMovieTheater, isAdmin: true },
  { path: '/movietheaters/edit/:id', element: EditMovieTheater, isAdmin: true },

  //Movies
  { path: '/movies/create', element: CreateMovie, isAdmin: true },
  { path: '/movies/edit/:id', element: EditMovie, isAdmin: true },
  { path: '/movies/filter', element: FilterMovies },
  { path: '/movie/:id', element: MovieDetails },

  //LandingPage
  { path: '/', element: LandingPage, exact: true },

  //Not Found
  { path: '*', element: NotFound },
]

export default routes
