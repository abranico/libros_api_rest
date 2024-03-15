import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import bookRouter from './routes/book-routes.js'

mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME })
  .then(result => console.log('Database is connect'))
  .catch(err => console.error(err))

const app = express()

app.disabled('x-powered-by')

app.use(express.json())

app.use('/books', bookRouter)

const port = process.env.PORT || 3003
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
