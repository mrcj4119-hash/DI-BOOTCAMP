$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$env:SQLITE_PATH = 'data/storyweaver.sqlite'
$env:JWT_SECRET = 'local-development-access-secret-change-me'
$env:REFRESH_SECRET = 'local-development-refresh-secret-change-me'
$env:CLIENT_ORIGIN = 'http://127.0.0.1:5173'
$env:NODE_ENV = 'development'
Push-Location $projectRoot
try {
  npm run db:init
  if ($LASTEXITCODE -ne 0) { throw 'SQLite database initialization failed.' }
  npm run dev --workspace backend
}
finally { Pop-Location }
