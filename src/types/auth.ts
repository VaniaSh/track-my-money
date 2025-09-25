export type AuthContextTypes = {
  user: User
  setUser: (user: User) => void
  login: (loginDto: LoginDto) => Promise<{ success: boolean; message?: string }>
  register: (registerDto: RegisterDto) => Promise<{ success: boolean; message?: string }>
  updateUserData: (uid: string) => void
  logout: () => Promise<{ success: boolean; message?: string }>
  loading: boolean
}

export type User = {
  uid: string
  email?: string
  userName: string
  image?: any
} | null

export type LoginDto = {
  email: string
  password: string
}

export type RegisterDto = {
  email: string
  password: string
  userName: string
}
