import mongoose, { Schema, Model } from 'mongoose';
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
        type: String,
        default: null
    },
    copies: {
        type: Number,
        required: true,
        min: 0
    },
    available: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

// Static method to update availability
booksSchema.statics.checkAndUpdateAvailability = async function (bookId: string) {
    const book = await this.findById(bookId);
    if (book && book.copies === 0 && book.available) {
        book.available = false;
        await book.save();
    }
};

export const Books: Model<IBooks> & { checkAndUpdateAvailability: (id: string) => Promise<void> } =
    mongoose.model('Books', booksSchema) as any;