import { useEffect, type ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { requestFailed, requestStarted, requestSucceeded } from '../features/dataSlice'
import type { RequestStatus } from '../types/types'

interface DataFetcherProps<T> {
  fetchData: (signal: AbortSignal) => Promise<T>
  isData: (value: unknown) => value is T
  renderData: (data: T) => ReactNode
  emptyMessage?: string
}

function DataFetcher<T>({
  fetchData,
  isData,
  renderData,
  emptyMessage = 'No results found.',
}: DataFetcherProps<T>) {
  const dispatch = useAppDispatch()
  const { status, data, error } = useAppSelector((state) => state.data) as {
    status: RequestStatus
    data: unknown
    error: string | null
  }

  useEffect(() => {
    const controller = new AbortController()
    dispatch(requestStarted())

    fetchData(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          dispatch(requestSucceeded(result))
        }
      })
      .catch((caughtError: unknown) => {
        if (!controller.signal.aborted) {
          dispatch(
            requestFailed(
              caughtError instanceof Error ? caughtError.message : 'An unexpected error occurred.',
            ),
          )
        }
      })

    return () => controller.abort()
  }, [dispatch, fetchData])

  if (status === 'loading' || status === 'idle') {
    return <p className="state-message loading" role="status">Finding something delicious…</p>
  }

  if (status === 'error') {
    return (
      <div className="state-message error" role="alert">
        <strong>We couldn’t load recipes.</strong>
        <p>{error}</p>
      </div>
    )
  }

  if (!isData(data)) {
    return (
      <p className="state-message error" role="alert">
        The loaded data did not match the expected format.
      </p>
    )
  }

  return <>{renderData(data) ?? <p className="state-message">{emptyMessage}</p>}</>
}

export default DataFetcher
