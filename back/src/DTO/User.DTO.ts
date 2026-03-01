 export interface RegisterUserDTO {
    name: string
    email: string
    birthdate: Date
    nDni: number
    username: string
    password: string     
}

export interface LoginUserDTO {
    username: string
    password: string 
}

export interface UserResponseDTO {
    name: string
    email: string
}