import { ActorMovieDTO } from "../Actors/actor.model"

export interface movieDTO {
    id: number
    title: string
    poster: string
}

export interface landingPageDTO {
    inTheaters?: movieDTO[]
    upComingReleases?: movieDTO[]
}

export interface movieCreationDTO {
    title: string
    inTheaters: boolean
    trailer: string
    genresIds?: number[]
    movieTheaterIds?: number[]
    releaseDate?: Date
    poster?: File
    posterUrl?: string
    actors?: ActorMovieDTO[]
}


export interface movieListProps {
    movieStatus?: string
    movies?: movieDTO[]
}