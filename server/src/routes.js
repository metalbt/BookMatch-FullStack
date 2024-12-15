import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import booksController from './models/books.js'; // Ajuste o caminho conforme necessário
import Users from './models/users.js';
import { isAuthenticated } from './middleware/auth.js';
import { z } from 'zod';
import { validate } from './middleware/validate.js';

const router = express.Router();

// Rota para obter todos os livros
router.get('/books', isAuthenticated, async (req, res) => {
  try {
    const books = await booksController.allBooks();
    res.json(books);
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    res.status(500).json({ error: 'Erro ao buscar livros' });
  }
});

// Rota para criar um novo livro
router.post('/books', isAuthenticated , async (req, res) => {
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

router.post('/register',   validate(
  z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(8),
      passwordcon: z.string().min(8),
    }),
  })
), async (req, res) => {
  const {email, password} = req.body
  try{
    if(!email || !password){
      return res.status(400).json({"error":"algo deu errado"})
    }
    const hash = await bcrypt.hash(password, 10);
    const newUser = await Users.createUser({
      email,
      password: hash,
      name: "novo usuario",
      image_url: "https://wallpapers.com/images/hd/ricardo-milos-zsh9ovovkwahf2hh.jpg"
    })

    res.status(201).json(newUser);
  }catch(e) {
    console.log(e)
    res.status(500).json({ error: 'Erro ao registrar-se' });
  }
});

router.get('/users/me', isAuthenticated, async (req, res) => {
  try {
    const userId = req.userId;
 
    const user = await User.readById(userId);
 
    delete user.password;
 
    return res.json(user);
  } catch (error) {
    throw new HTTPError('Unable to find user', 400);
  }
});

router.post('/login',   validate(
  z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(8),
    }),
  })
), async (req, res) => {
  try {
    const { email, password } = req.body;
 
    const { id: userId, password: hash } = await Users.readUserByEmail(email);
    console.log(userId, hash)
 
    const match = await bcrypt.compare(password, hash);
 
    if (match) {
      const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: 3600000 } // 1h
      );
 
      return res.json({ auth: true, token });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'User not found' });
  }
});

export default router;