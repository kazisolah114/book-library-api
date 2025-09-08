import express from 'express';
import { AddBook, deleteBook, getBook, getBooks, updateBook } from '../controllers/books.controller';

const booksRoute = express.Router();

booksRoute.post('/books', AddBook);
booksRoute.get('/books', getBooks);
booksRoute.get('/books/:bookId', getBook);
booksRoute.put('/books/:bookId', updateBook);
booksRoute.delete('/books/:bookId', deleteBook);

export default booksRoute;