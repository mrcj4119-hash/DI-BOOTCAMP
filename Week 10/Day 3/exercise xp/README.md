# JWT Authentication API

An Express exercise demonstrating short-lived access JWTs, rotating refresh
tokens in HttpOnly cookies, password hashing, SQLite persistence, protected
profile routes, validation, logout/revocation, and authentication rate limits.

## Run locally

1. Install Node.js 20.19+ and run `npm install`.
2. Copy `.env.example` to `.env`.
3. Replace both example secrets with different random values of at least 32
   characters. Never commit `.env`.
4. Run `npm run dev`.
5. Run `npm test` to execute the API tests.

The API listens on `http://localhost:3000` by default. SQLite data is written to
`./data/auth.sqlite`.

## Routes

| Method | Path | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Register and create a session |
| `POST` | `/api/auth/login` | Verify credentials and create a session |
| `POST` | `/api/auth/refresh` | Rotate the refresh cookie and issue a new access token |
| `POST` | `/api/auth/logout` | Revoke the current refresh session and clear cookie |
| `GET` | `/api/auth/me` | Return the signed-in user's profile |
| `PATCH` | `/api/auth/me` | Update `name` and `bio` |
| `GET` | `/api/health` | Health check |

Registration and login return the access JWT in JSON; send it on protected
requests as `Authorization: Bearer <accessToken>`. Keep it in memory in a client,
not localStorage. The refresh JWT is only stored in an HttpOnly, SameSite=Strict
cookie scoped to `/api/auth`. Access tokens expire after 15 minutes; refresh
tokens expire after 7 days and are single-use through rotation.

For browser clients, use HTTPS in production. `Secure` cookies are enabled when
`NODE_ENV=production`. Because the refresh cookie is sent automatically, keep
the UI and API same-site and retain the SameSite protection; deployments with
cross-site clients need a deliberate CSRF and CORS design. Do not put secrets in
frontend code. The refresh token hash is stored server-side so logout, expiry,
and rotation revoke refresh sessions.

Use `npm test` for the integration suite and `npm run lint` for linting.
