import express, { Request, Response } from 'express';
import { Books } from '../models/books.model';

export const AddBook = async (req: Request, res: Response) => {
    try {
        const { title, author, genre, isbn, description, copies, available } = req.body;
        const book = await Books.create({
            title,
            author,
            genre,
            isbn,
            description,
            copies,
            available
        })
        res.status(200).json({
            success: true,
            message: 'Book added successfully',
            data: book
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to add the book',
            error
        })
    }
}

export const getBooks = async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = "createdAt", sort = 'asc', limit = "10" } = req.query;
        let query: any = {};
        if (filter) query.genre = filter;
        const sortOrder = sort === 'asc' ? 1 : -1;
        const books = await Books.find(query)
            .sort({ [sortBy as string]: sortOrder })
            .limit(Number(limit))
        res.status(200).json({ success: true, message: "Books retrieved successfull!", data: books });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to add the book',
            error
        })
    }
}

export const getBook = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const book = await Books.findById({ _id: bookId });
        res.status(200).json({ success: true, message: "Book retrieved successfully!", data: book })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to get the books',
            error
        })
    }
}

export const updateBook = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const { title, author, genre, isbn, description, copies, available } = req.body;
        const updatedBook = await Books.findByIdAndUpdate({ _id: bookId }, {
            title, author, genre, isbn, description, copies, available
        }, { new: true }
        );
        if (!updatedBook) {
            return res.status(500).json({ sucess: false, message: "Book could not be updated!" })
        }
        res.status(200).json({ success: true, message: "Book updated successfully!", data: updatedBook })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to update book',
            error
        })
    }
}

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const { bookId } = req.params;
        const deletedBook = await Books.findOneAndDelete({ _id: bookId });
        if(!deletedBook) {
            return res.status(500).json({ success: false, message: "Book could not be deleted" })
        }
        res.status(200).json({ success: true, message: "Book deleted scucessfully!", data: null })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete book',
            error
        })
    }
}