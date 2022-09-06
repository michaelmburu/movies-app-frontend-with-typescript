export interface movieDTO {
    id: number
    title: string
    poster: string
}

export interface landingPageDTO {
    inTheaters?: movieDTO[]
    upComingReleases?: movieDTO[]
}


export interface movieListProps {
    movieStatus?: string
    movies?: movieDTO[]
}