import express from 'express';
import { AddBooks } from '../controllers/books.controller';

const bookRoute = express.Router();

bookRoute.post('/books', AddBooks);

export default bookRoute;