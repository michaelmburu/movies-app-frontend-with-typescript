export interface Claim {
    name: string
    value: string
}

export interface UserCredentialsDTO {
    email: string
    password: string
}

export interface AuthenticationResponseDTO{
    token: string
    expiration: Date
}

export interface UserDTO {
    id: string
    email: string
}