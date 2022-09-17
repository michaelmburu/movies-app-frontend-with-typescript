import { ActorMovieDTO } from "../Actors/actor.model"
import { GenreDTO } from "../Genres/genres.model"
import { MovieTheaterDTO } from "../MovieTheaters/MovieTheater.model"

export interface movieDTO {
    id: number
    title: string
    poster: string
    inTheaters: boolean
    trailer: string
    summary?: string
    genres: GenreDTO[]
    movieTheaters: MovieTheaterDTO[]
    releaseDate: Date
    actors: ActorMovieDTO[]

}

export interface landingPageDTO {
    inTheaters?: movieDTO[]
    upComingReleases?: movieDTO[]
}

export interface movieCreationDTO {
    title: string
    inTheaters: boolean
    trailer: string
    summary?: string
    genresIds?: number[]
    movieTheatersIds?: number[]
    releaseDate?: Date
    poster?: File
    posterUrl?: string
    actors?: ActorMovieDTO[]
}


export interface movieListProps {
    movieStatus?: string
    movies?: movieDTO[]
}

export interface MoviePostGetDTO {
    genres: GenreDTO[]
    movieTheaters: MovieTheaterDTO[]
}

export interface MoviePutGetDTO {
    movie: movieDTO,
    selectedGenres: GenreDTO[]
    noneSelectedGenres: GenreDTO[]
    selectedMovieTheaters: MovieTheaterDTO[]
    noneSelectedMovieTheaters: MovieTheaterDTO[]
    actors: ActorMovieDTO[]
}