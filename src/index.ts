import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const app = express()
import coffeeRouter from './routes/coffee'

const { PORT, HOST } = process.env
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/coffee', coffeeRouter)

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on http://${HOST}:${PORT}`)
})
