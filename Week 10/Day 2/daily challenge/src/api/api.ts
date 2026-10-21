import type { RecipeSearchResponse, RecipeSummary } from '../types/types'

const apiBaseUrl = 'https://api.spoonacular.com/recipes/complexSearch'

function isRecipeSummary(value: unknown): value is RecipeSummary {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const recipe = value as Record<string, unknown>
  return (
    typeof recipe.id === 'number' &&
    typeof recipe.title === 'string' &&
    typeof recipe.image === 'string'
  )
}

function isRecipeSearchResponse(value: unknown): value is RecipeSearchResponse {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const response = value as Record<string, unknown>
  return (
    Array.isArray(response.results) &&
    response.results.every(isRecipeSummary) &&
    typeof response.totalResults === 'number'
  )
}

export async function fetchRecipes(
  query: string,
  signal?: AbortSignal,
): Promise<RecipeSearchResponse> {
  const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY?.trim()
  if (!apiKey) {
    throw new Error(
      'Add your Spoonacular API key as VITE_SPOONACULAR_API_KEY to a local .env file, then restart Vite.',
    )
  }

  const url = new URL(apiBaseUrl)
  url.searchParams.set('apiKey', apiKey)
  url.searchParams.set('query', query)
  url.searchParams.set('number', '12')

  const response = await fetch(url, { signal })
  if (!response.ok) {
    if (response.status === 402) {
      throw new Error('The Spoonacular API quota has been reached.')
    }
    if (response.status === 401) {
      throw new Error('The Spoonacular API key is invalid.')
    }
    throw new Error(`Recipe search failed (${response.status} ${response.statusText}).`)
  }

  const payload: unknown = await response.json()
  if (!isRecipeSearchResponse(payload)) {
    throw new Error('The recipe service returned data in an unexpected format.')
  }

  return payload
}
