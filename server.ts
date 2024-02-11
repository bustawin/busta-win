import { app } from '@src/service/serve'

const port = process.env.PORT || 3000
app.listen(port, '127.0.0.1', () =>
  console.log(`bustaserving @ http://localhost:${port}`)
)
