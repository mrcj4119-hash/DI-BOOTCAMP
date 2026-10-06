import app from '../app.js'

const port = Number.parseInt(process.env.PORT ?? '3001', 10)

app.listen(port, '127.0.0.1', () => {
  console.log(`Users API listening at http://127.0.0.1:${port}/users`)
})
