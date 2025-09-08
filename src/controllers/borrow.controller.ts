import { Request, Response } from "express";
import { Books } from "../models/books.model";
import { Borrow } from "../models/borrow.model";

export const borrowBook = async (req: Request, res: Response) => {
    try {

        const { book, quantity, dueDate } = req.body;

        const requestedBook = await Books.findById(book);

        if (!requestedBook) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }
        if (requestedBook.copies < 1) {
            return res.status(400).json({
                success: false,
                message: 'No copies available'
            });
        }
        if (quantity < 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity cannot be smaller than 1"
            })
        }
        if (quantity > requestedBook.copies) {
            return res.status(400).json({
                success: false,
                message: 'The requested quanity must be equal to or less than available copies'
            })
        }

        const updatedBook = await Books.findOneAndUpdate(
            {
                _id: book,
            },
            {
                $inc: { copies: -quantity },
            },
            { new: true }
        )
        console.log("Updated book:", updatedBook);

        if (updatedBook?.copies === 0 && updatedBook?.available) {
            updatedBook.available = false;
            await updatedBook.save();
        }

        const borrowBook = new Borrow({
            book,
            quantity,
            dueDate
        });
        await borrowBook.save();

        res.status(201).json({ success: true, message: "Borrowed book successfully!", data: borrowBook })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to borrow book',
            error
        })
    }
}

export const borrowedBooksSummary = async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            { $unwind: "$book" },
            {
                $project: {
                    _id: 0,
                    totalQuantity: 1,
                    book: {
                        title: "$book.title",
                        isbn: "$book.isbn"
                    }
                }
            }
        ])

        if(!summary) return res.json(400).json({ success: false, message: "Could not retrived book summary" });
        res.status(200).json({ success: true, message: "Borrowed book summary retrived", data: summary })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to get borowed book summary',
            error
        })
    }
}