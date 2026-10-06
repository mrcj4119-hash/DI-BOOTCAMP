import express from 'express'

const app = express()
const port = Number.parseInt(process.env.PORT ?? '3001', 10)

app.use(express.json())

app.get('/api/hello', (request, response) => {
  response.json({ message: 'Hello From Express' })
})

app.post('/api/world', (request, response) => {
  console.log(request.body)
  const { message } = request.body

  if (typeof message !== 'string') {
    return response.status(400).json({ error: 'The message field must be a string.' })
  }

  return response.json({
    message: `I received your POST request. This is what you sent me: ${message}`,
  })
})

app.listen(port, '127.0.0.1', () => {
  console.log(`Express server listening at http://127.0.0.1:${port}`)
})
