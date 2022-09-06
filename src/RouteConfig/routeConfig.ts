import Actors from "../Components/Actors/Actors"
import CreateActor from "../Components/Actors/CreateActor"
import EditActor from "../Components/Actors/EditActor"
import CreateGenre from "../Components/Genres/CreateGenre"
import EditGenre from "../Components/Genres/EditGenre"
import Genres from "../Components/Genres/Genres"
import LandingPage from "../Components/LandingPage/LandingPage"
import CreateMovie from "../Components/Movies/CreateMovie"
import EditMovie from "../Components/Movies/EditMovie"
import FilterMovies from "../Components/Movies/FilterMovies"
import CreateMovieTheater from "../Components/MovieTheaters/CreateMovieTheater"
import EditMovieTheater from "../Components/MovieTheaters/EditMovieTheater"
import MovieTheaters from "../Components/MovieTheaters/MovieTheaters"
import NotFound from "../Components/NotFound/NotFound"

const routes = [
  //Genres 
  {path: '/genres', element: Genres},
  {path: '/genres/create', element: CreateGenre},
  {path: '/genres/edit/:id', element: EditGenre}, 

  //Actors
  {path: '/actors', element: Actors},
  {path: '/actors/create', element: CreateActor},
  {path: '/actors/edit/:id', element: EditActor},

  //MovieTheaters
  {path: '/movietheaters', element: MovieTheaters},
  {path: '/movietheaters/create', element: CreateMovieTheater},
  {path: '/movietheaters/edit/:id', element: EditMovieTheater},

  //Movies
  {path: '/movies/filter', element: FilterMovies},
  {path: '/movies/create', element: CreateMovie},
  {path: '/movies/edit/:id', element: EditMovie},

  //LandingPage
  {path: '/', element: LandingPage},

  //Not Found
  {path: '*', element: NotFound}
]

export default routes