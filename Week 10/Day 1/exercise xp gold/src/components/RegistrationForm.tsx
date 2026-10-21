import { useForm, type FormValidator } from '../hooks/useForm'

interface RegistrationValues {
  email: string
  password: string
}

const validateRegistration: FormValidator<RegistrationValues> = (values) => {
  const errors: Partial<Record<keyof RegistrationValues, string>> = {}

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }
  if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters.'
  } else if (!/[A-Z]/.test(values.password) || !/[0-9]/.test(values.password)) {
    errors.password = 'Include at least one uppercase letter and one number.'
  }

  return errors
}

function RegistrationForm() {
  const form = useForm<RegistrationValues>({
    initialValues: { email: '', password: '' },
    validate: validateRegistration,
    onSubmit: async (values) => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.ok) {
        throw new Error(`Registration failed (HTTP ${response.status}).`)
      }
    },
  })

  return (
    <form className="registration-form" onSubmit={form.handleSubmit} noValidate>
      <label className="form-field">
        Email
        <input
          type="email"
          autoComplete="email"
          value={form.values.email}
          onChange={(event) => form.handleChange('email', event.target.value)}
          aria-invalid={Boolean(form.errors.email)}
          aria-describedby={form.errors.email ? 'email-error' : undefined}
        />
        {form.errors.email && (
          <span className="field-error" id="email-error">{form.errors.email}</span>
        )}
      </label>

      <label className="form-field">
        Password
        <input
          type="password"
          autoComplete="new-password"
          value={form.values.password}
          onChange={(event) => form.handleChange('password', event.target.value)}
          aria-invalid={Boolean(form.errors.password)}
          aria-describedby={form.errors.password ? 'password-error' : undefined}
        />
        {form.errors.password && (
          <span className="field-error" id="password-error">{form.errors.password}</span>
        )}
      </label>

      {form.submitError && <p className="form-error" role="alert">{form.submitError}</p>}
      {form.isSubmitted && (
        <p className="form-success" role="status">Registration submitted successfully.</p>
      )}

      <button className="primary-button" type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Submitting…' : 'Create account'}
      </button>
    </form>
  )
}

export default RegistrationForm
