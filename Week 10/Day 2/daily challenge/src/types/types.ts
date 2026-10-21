export interface RecipeSummary {
  id: number
  title: string
  image: string
}

export interface RecipeSearchResponse {
  results: RecipeSummary[]
  totalResults: number
}

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

export interface DataState {
  status: RequestStatus
  data: unknown
  error: string | null
}
