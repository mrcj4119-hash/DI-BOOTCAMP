# Week 10 Day 5 Advanced Functionalities

Standalone advanced API project. It does not modify the collaborative storytelling app. It uses SQLite locally so no database password is required.

## Start

```powershell
npm install
Copy-Item backend/.env.example backend/.env
npm run dev
```

The REST API runs on `http://localhost:3010`; the protected WebSocket endpoint runs on `ws://localhost:3011/ws?token=<jwt>`.

## Advanced endpoints

- `POST /api/comments/:story_id`, `GET /api/comments/:story_id`
- `PATCH /api/comments/:id`, `DELETE /api/comments/:id`
- `POST /api/comments/:id/reactions`
- `PATCH /api/comments/settings/:story_id`
- `GET /api/versions/:story_id`, `POST /api/versions/:id/restore`
- `GET /api/profile`, `POST /api/share`, `GET /api/shared/:token`
- `WS /ws` broadcasts `story.updated` events to authorized contributors.

Run `npm test` for permission and reaction tests. All write endpoints validate input and require JWT authentication.
