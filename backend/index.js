import express from "express"
import mongoose from "mongoose"
import bookRoutes from "./routes/bookRoutes.js"
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express()

const PORT = 3000

app.use(express.json())

app.use(cors())

app.use('/books', bookRoutes)

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected")
    app.listen(PORT, () => {
      console.log("Server started on Port: " + PORT)
    })
  })
  .catch((e) => {
    console.log(e)
  })
