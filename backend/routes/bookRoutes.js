import express from "express"
import {Book} from '../models/book.js'

const router = express.Router()

// Add a book to database
router.post("/", async (req, res) => {
  try {
    const { title, author, publishedDate } = req.body

    if (!title || !author || !publishedDate) {
      res.status(500).send({ message: "Please provide required data" })
    }

    const newbook = {
      title,
      author,
      publishedDate,
    }

    const book = await Book.create(newbook)

    res.status(201).send(book)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Get all the books from the database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({})

    return res.status(200).json({
      count: books.length,
      data: books,
    })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Get a specific book from database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const book = await Book.findById(id)

    return res.status(200).json(book)
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Update a book
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishedDate } = req.body

    if (!title || !author || !publishedDate) {
      res.status(500).send({ message: "Please provide required data" })
    }

    const updatedBook = {
      title,
      author,
      publishedDate,
    }

    const { id } = req.params

    const result = await Book.findByIdAndUpdate(id, updatedBook)

    if (!result) return res.status(400).json({ message: "Book not updated" })

    return res.status(200).json({ message: "Book Updated" })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

// Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params

    const result = await Book.findByIdAndDelete(id)

    if (!result) return res.status(400).json({ message: "Book not Removed" })

    return res.status(200).json({ message: "Book Removed" })
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
})

export default router
