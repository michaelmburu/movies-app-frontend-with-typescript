export interface ActorCreationDTO {
    name: string
    dateOfBirth?: Date
    picture?: File
    pictureUrl?: string
    biography?: string
}

export interface ActorMovieDTO {
    id: number
    name: string
    character: string
    picture: string
}