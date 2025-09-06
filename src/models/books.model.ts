import mongoose, { Schema } from 'mongoose';
import { IBooks } from '../interfaces/books.interface';

const booksSchema = new Schema<IBooks>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
        required: true
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    copies: {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Boolean,
        defaults: true
    }
})

export const Books = mongoose.model('Books', booksSchema);