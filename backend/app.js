const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const db = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 54320),
  user: process.env.DB_USER || 'books',
  password: process.env.DB_PASSWORD || 'bookspass',
  database: process.env.DB_NAME || 'booksdb',
});

// List all books.
app.get('/books', async (req, res) => {
  console.info(req);
  try {
    const result = await db.query('SELECT id, title, author FROM books ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Add a book.
app.post('/books', async (req, res) => {
  const { title, author } = req.body || {};

  if (typeof title !== 'string' || !title.trim() ||
      typeof author !== 'string' || !author.trim()) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  try {
    const result = await db.query(
      'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING id, title, author',
      [title.trim(), author.trim()]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, '0.0.0.0', () => {
  console.log(`Books API listening on port ${port}`);
});
