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
    user: User
}

export type User = {
    id: string,
    firstName: string
    lastName: string
    password: string
}

export type Bird = {
    id?: number
    name: string
    adoptedFrom: string
    holidayCollection: string
    yearPublished: number
    seasonCollection: 'Spring' | 'Summer' | 'Fall' | 'Winter'
    user: {
        id: number
        fullName: string
        email: string
      }
    userId: number
}

export type BirdParams = {
    name: string
    adoptedFrom: string
    holidayCollection: string
    yearPublished: number
    seasonCollection: 'Spring' | 'Summer' | 'Fall' | 'Winter'
    userId: number
}