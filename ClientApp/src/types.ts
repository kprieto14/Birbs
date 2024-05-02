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
    id: number
    Name: string
    AdoptedFrom: string
    HolidayCollection: string
    YearPublished: number
    SeasonCollection: 'Spring' | 'Summer' | 'Fall' | 'Winter'
    userId: number
}

export type BirdParams = {
    Name: string
    AdoptedFrom: string
    HolidayCollection: string
    YearPublished: number
    SeasonCollection: 'Spring' | 'Summer' | 'Fall' | 'Winter'
    userId: number
}