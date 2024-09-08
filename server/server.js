import express from "express"
import morgan from "morgan"
import cors from "cors"
import Books from "./src/models/books.js"

const app = express()
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.get("/",(req, res,)=>{
    res.send("Rota Inicial")
})

app.get("/books", async (req, res)=>{
    const books = await Books.allBooks()
    res.json(books)
})



app.listen(3000,()=>{
    console.log("servidor rodando na porta 3000")
})