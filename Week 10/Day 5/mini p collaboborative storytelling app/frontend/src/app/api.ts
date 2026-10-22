const apiBase = import.meta.env.VITE_API_URL ?? '/api'

interface RequestOptions {
  method?: string
  body?: unknown
  token?: string | null
  refreshOnUnauthorized?: boolean
  onRefresh?: (token: string) => void
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers()
  if (options.body !== undefined) headers.set('Content-Type', 'application/json')
  if (options.token) headers.set('Authorization', `Bearer ${options.token}`)

  const response = await fetch(`${apiBase}${path}`, {
    method: options.method ?? 'GET',
    headers,
    credentials: 'include',
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
  })

  if (response.status === 401 && options.token && options.refreshOnUnauthorized !== false) {
    const refreshResponse = await fetch(`${apiBase}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
    if (refreshResponse.ok) {
      const refreshed = await refreshResponse.json() as { accessToken: string }
      options.onRefresh?.(refreshed.accessToken)
      return apiRequest<T>(path, {
        ...options,
        token: refreshed.accessToken,
        refreshOnUnauthorized: false,
      })
    }
  }

  if (!response.ok) {
    const result = await response.json().catch(() => null) as { message?: string } | null
    throw new Error(result?.message ?? 'Something went wrong. Please try again.')
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
