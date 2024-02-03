import { app } from '@src/service/serve'

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`bustaserving @ http://localhost:${port}`))
