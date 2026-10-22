# Storyweaver

A collaborative storytelling app built as an npm-workspaces monorepo. The React + TypeScript frontend uses Redux Toolkit; the Express backend uses SQLite for local development, bcrypt, JWT access tokens, and an HTTP-only refresh cookie.

## Requirements

- Node.js 20 or newer and npm
- Node.js 20 or newer and npm

## Local setup

1. From this folder, run `npm install`.
2. Run `npm run setup:local`. This creates `backend/data/storyweaver.sqlite` without a database password and starts the API.
4. In a second terminal, run `npm run dev --workspace frontend` if the Vite client is not already running.

Open `http://localhost:5173`. The Vite server proxies `/api` requests to the local API. Access tokens are held in Redux memory. The refresh token is an HTTP-only cookie; production cookies use `Secure` and `SameSite=None` for a separately hosted frontend.

## Scripts

- `npm run dev` starts both workspaces.
- `npm run build` compiles the backend and builds the frontend.
- `npm start` starts the compiled API.
- `npm run db:init` creates the local SQLite tables.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PORT` | API port; defaults to `3001`. |
| `SQLITE_PATH` | Optional SQLite path; defaults to `data/storyweaver.sqlite`. |
| `JWT_SECRET` | Signing secret for 15-minute access tokens. |
| `REFRESH_SECRET` | Separate signing secret for 7-day refresh tokens. |
| `CLIENT_ORIGIN` | Allowed frontend origin; comma-separated origins are supported. |
| `NODE_ENV` | Set to `production` to enable secure cross-site refresh cookies and PostgreSQL SSL. |
| `VITE_API_URL` | Optional client API base URL; defaults to `/api`. |

Never commit `.env` files or production secrets.

The local setup script passes the password securely to PostgreSQL without writing it to the repository.

## API

- `POST /api/auth/register`, `/login`, `/refresh`, `/logout`; `GET /api/auth/me`
- `GET /api/stories`, `POST /api/stories`, `GET /api/stories/:id`, `PATCH /api/stories/:id`, `DELETE /api/stories/:id`
- `POST /api/contributors`, `GET /api/contributors/:story_id`, `DELETE /api/contributors/:id`
- `GET /api/comments/:story_id`, `POST /api/comments/:story_id`

Protected endpoints accept `Authorization: Bearer <access-token>`. Story authors can delete and invite; authors and contributors can edit. Inputs are validated server-side and SQL uses parameters.

## Render deployment

Create a PostgreSQL database and a Node web service rooted at this folder. Set the build command to `npm install && npm run build`, the start command to `npm start`, and configure the backend environment variables. Use Render's internal database URL when the API and database are in the same region. Deploy the `frontend` folder as a static site with build command `npm install && npm run build` and publish directory `dist`; set `VITE_API_URL` to the deployed API's `/api` URL. Set `CLIENT_ORIGIN` on the API to the exact static-site origin.
