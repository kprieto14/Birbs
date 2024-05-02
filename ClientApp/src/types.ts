export type NewUserType = {
    firstName: string
    lastName: string
    email: string
    password: string
  }
  
export type LoginUserType = {
    email: string
    password: string
}

export type LoginSuccess = {
    token: string
    user: {
        id: number
        fullName: string
        email: string
    }
}

export type Bird = {
    id: number
    name: string
}

export type BirdParams = {
    name: string
}