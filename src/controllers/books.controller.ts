import express, { Request, Response } from 'express';

export const AddBooks = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Book added successfully'
        })
    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to add the book',
            error
        })
    }
}