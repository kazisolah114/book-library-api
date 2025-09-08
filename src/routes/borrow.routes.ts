import express from 'express';
import { borrowBook, borrowedBooksSummary } from '../controllers/borrow.controller';

const borrowRouter = express.Router();

borrowRouter.post("/borrow", borrowBook);
borrowRouter.get("/borrow", borrowedBooksSummary)

export default borrowRouter;