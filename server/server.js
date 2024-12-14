import dotenv from 'dotenv';
if (process.env.NODE_ENV !== "production") {
  dotenv.config(); 
}
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './src/routes.js';  // Caminho absoluto

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
  })
);

// Usando as rotas da API
app.use('/api', router);

// Rotas para renderizar páginas HTML
app.get('/home', (req, res) => {
  res.sendFile('home.html', { root: 'public' });
});

app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'public' });
});

app.get('/catalogo', (req, res) => {
  res.sendFile('catalogo.html', { root: 'public' });
});

app.get('/registro', (req, res) => {
  res.sendFile('registro.html', { root: 'public' });
});

app.get('/user', (req, res) => {
  res.sendFile('user.html', { root: 'public' });
});

app.get('/omedicoemonstro', (req, res) => {
  res.sendFile('omedicoemonstro.html', { root: 'public' });
});

app.get('/memoriaspostumas', (req, res) => {
  res.sendFile('memoriaspostumas.html', { root: 'public' });
});

app.get('/domquixote', (req, res) => {
  res.sendFile('domquixote.html', { root: 'public' });
});

app.get('/lotr', (req, res) => {
  res.sendFile('lotr.html', { root: 'public' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});