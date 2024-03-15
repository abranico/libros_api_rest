import express from 'express'
import Book from '../models/book-model.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const books = await Book.find()
    if (books.length === 0) return res.status(204).json([])
    res.json(books)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/', async (req, res) => {
  const { title, author, genre, publication_date: publicationDate } = req.body
  if (!title || !author || !genre || !publicationDate) return res.status(400).json({ message: 'Los campos título, autor, género y fecha son obligatorios' })

  const book = new Book({
    title,
    author,
    genre,
    publicationDate
  })

  try {
    const newBook = await book.save()
    res.status(201).json(newBook)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

export default router
