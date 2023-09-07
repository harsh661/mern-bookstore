import { useEffect } from "react"
import "./App.css"

function App() {
  useEffect(() => {
    const getBooks = async () => {
      const res = await fetch("http://localhost:3000/books")
      const data = await res.json()
      console.log(data.data)
    }

    getBooks()
  }, [])

  return <div>Hello</div>
}

export default App
