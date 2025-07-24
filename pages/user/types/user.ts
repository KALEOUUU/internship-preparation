export interface User {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    image?: string
    gender?: string
    phone?: string
    address?: {
      address: string
      city: string
    }
  }
  