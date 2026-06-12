export interface User {
  id: number
  email: string
  role: string
}

export interface Room {
  id: number
  name: string
  capacity: number
  description: string
  image_url?: string
}

export interface Booking {
  id: number
  room_id: number
  room_name?: string
  booking_date: string
  start_time: string
  end_time: string
  user_id: number
}

export interface AuthResponse {
  token: string
  user: User
}
