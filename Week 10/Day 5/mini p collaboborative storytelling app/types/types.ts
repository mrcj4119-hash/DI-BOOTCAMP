export interface User {
  id: number
  username: string
  email: string
}

export interface StoryContributor {
  id: number
  user_id?: number
  username: string
  email?: string
}

export interface Story {
  id: number
  title: string
  content: string
  author_id: number
  author: string
  created_at: string
  updated_at: string
  contributors: StoryContributor[]
}

export interface StoryComment {
  id: number
  story_id: number
  user_id: number
  username: string
  content: string
  created_at: string
  reactions?: Record<string, number>
}

export interface StoryVersion {
  id: number
  story_id: number
  title: string
  content: string
  created_at: string
}

export interface AuthResponse {
  accessToken: string
  user: User
}

export interface ApiError {
  message: string
}
