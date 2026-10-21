import 'dotenv/config'

function requiredSecret(name) {
  const secret = process.env[name]
  if (!secret || secret.length < 32) {
    throw new Error(`${name} must be set to a secret of at least 32 characters.`)
  }
  return secret
}

export function loadConfig() {
  const port = Number(process.env.PORT ?? 3000)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be a valid TCP port.')
  }

  return {
    accessTokenSecret: requiredSecret('ACCESS_TOKEN_SECRET'),
    refreshTokenSecret: requiredSecret('REFRESH_TOKEN_SECRET'),
    port,
    isProduction: process.env.NODE_ENV === 'production',
  }
}
