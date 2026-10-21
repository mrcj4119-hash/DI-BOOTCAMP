import { useCallback, useEffect, useRef, useState } from 'react'

interface CacheEntry {
  data: unknown
  timestamp: number
}

interface DataFetchingConfig {
  maxAge: number
}

const dataCache = new Map<string, CacheEntry>()

export function useDataFetching<T>(url: string, { maxAge }: DataFetchingConfig) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const activeRequest = useRef<AbortController | null>(null)

  const fetchData = useCallback(async (bypassCache = false) => {
    activeRequest.current?.abort()
    const controller = new AbortController()
    activeRequest.current = controller

    const cached = dataCache.get(url)
    if (!bypassCache && cached && Date.now() - cached.timestamp < maxAge) {
      setData(cached.data as T)
      setError(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(url, { signal: controller.signal })
      if (!response.ok) {
        throw new Error(`Request failed (HTTP ${response.status}).`)
      }
      const result: T = await response.json()
      if (!controller.signal.aborted) {
        dataCache.set(url, { data: result, timestamp: Date.now() })
        setData(result)
      }
    } catch (fetchError: unknown) {
      if (fetchError instanceof Error && fetchError.name === 'AbortError') {
        return
      }
      if (!controller.signal.aborted) {
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'An unexpected error occurred while fetching data.',
        )
      }
    } finally {
      if (!controller.signal.aborted) {
        setIsLoading(false)
      }
    }
  }, [url, maxAge])

  useEffect(() => {
    let isActive = true
    void Promise.resolve().then(() => {
      if (isActive) {
        return fetchData()
      }
    })
    return () => {
      isActive = false
      activeRequest.current?.abort()
    }
  }, [fetchData])

  const invalidateCache = useCallback(() => {
    dataCache.delete(url)
  }, [url])

  const refetch = useCallback(() => fetchData(true), [fetchData])

  return { data, isLoading, error, refetch, invalidateCache }
}
