export type NewUserType = {
    username: string
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
    username: string
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
    photoURL: string
    photoPublicId: string | null
    photoFileName: string | null
    adoptedFrom: string
    holidayCollection: string
    yearPublished: number
    seasonCollection: 'Spring' | 'Summer' | 'Fall' | 'Winter'
    user?: User
    userId: number
}

export type CurrentBirdOfTheDay = {
    id: number
    birdId: number
    bird: Bird | null
    chosenDate: Date | null
    userName: string | null
}

export type NewBirdParams = {
    name: string
    photoURL: string | null
    photoPublicId: string | null
    photoFileName: string | null
    adoptedFrom: string
    holidayCollection: string
    yearPublished: number
    seasonCollection: 'Spring' | 'Summer' | 'Fall' | 'Winter'
    userId: number
}

export type UploadResponse = {
    url: string
}