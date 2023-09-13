import express from 'express'
import 'dotenv/config'
import cors from 'cors'

import { router } from 'src/routes'

const app = express()

app.use((req, res, next) => {
  if (req.originalUrl === '/webhooks') {
    next()
  } else {
    express.json()(req, res, next)
  }
})

app.use(cors())
app.use(router)

const port = process.env.PORT || 3333

app.listen(port, () => console.log(`Server running on port ${port}`))
