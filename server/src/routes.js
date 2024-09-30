import express from 'express';
import booksController from './models/books.js'; // Ajuste o caminho conforme necessário
import Users from './models/users.js';

const router = express.Router();

// Rota para obter todos os livros
router.get('/books', async (req, res) => {
  try {
    const books = await booksController.allBooks();
    res.json(books);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// Rota para criar um novo livro
router.post('/books', async (req, res) => {
  const { title, author, publication_date, image_url, url, description, userId } = req.body;
  try {
    const book = await booksController.createBook({
      title,
      author,
      publication_date,
      image_url,
      url,
      description,
      userId,
    });
    res.status(201).json(book);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
    res.status(500).json({ error: 'Erro ao criar livro' });
  }
});

router.post('/register', async (req, res) => {
  const {email, password} = req.body
  try{
    if(!email || !password){
      return res.status(400).json({"error":"algo deu errado"})
    }

    const newUser = await Users.createUser({
      email,
      password,
      name: "novo usuario",
      image_url: "https://wallpapers.com/images/hd/ricardo-milos-zsh9ovovkwahf2hh.jpg"
    })

    res.status(201).json(newUser);
  }catch(e) {
    console.log(e)
    res.status(500).json({ error: 'Erro ao registrar-se' });
  }
})

export default router;