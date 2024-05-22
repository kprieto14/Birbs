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
    id: string
    firstName: string
    lastName: string
    password: string
}

export type BirdUser = {
    id: string
    firstName: string
    lastName: string
}

export type Bird = {
    id?: number
    name: string
    adoptedFrom: string
    holidayCollection: string
    yearPublished: number
    seasonCollection: 'Spring' | 'Summer' | 'Fall' | 'Winter'
    user?: User
    userId: number
}

export type NewBirdParams = {
    name: string
    adoptedFrom: string
    holidayCollection: string
    yearPublished: number
    seasonCollection: 'Spring' | 'Summer' | 'Fall' | 'Winter'
    userId: number
}