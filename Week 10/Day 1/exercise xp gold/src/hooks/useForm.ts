import { useState, type FormEvent } from 'react'

export type FormErrors<T> = Partial<Record<keyof T, string>>
export type FormValidator<T> = (values: T) => FormErrors<T>

interface UseFormOptions<T> {
  initialValues: T
  validate: FormValidator<T>
  onSubmit: (values: T) => Promise<void>
}

export function useForm<T extends object>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (field: keyof T, value: T[keyof T]) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSubmitError(null)
    setIsSubmitted(false)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setSubmitError(null)
    setIsSubmitted(false)

    if (Object.values(validationErrors).some(Boolean)) {
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit(values)
      setIsSubmitted(true)
    } catch (error: unknown) {
      setSubmitError(
        error instanceof Error ? error.message : 'Registration failed. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    isSubmitting,
    submitError,
    isSubmitted,
    handleChange,
    handleSubmit,
  }
}
