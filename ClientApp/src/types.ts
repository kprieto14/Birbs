export type NewUserType = {
    fullName: string
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