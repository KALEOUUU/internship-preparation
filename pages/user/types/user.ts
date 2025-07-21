export interface User {
    id: number
    firstName: string
    lastName: string
    username: string
    email: string
    image?: string
    gender?: string
    phone?: string
    rowsPerPageOptions: any,
    address?: {
      address: string
      city: string
    }
    [key: string]: any
  }
  