import express, { Application, NextFunction, Request, Response } from 'express';
import { AppError } from './utils/AppError';
import bookRoute from './routes/books.routes';

const app: Application = express();

app.use(express.json())

// Routes
app.get('/', (req: Request, res: Response) => {
    res.send('World, World!')
})
app.use('/api', bookRoute);

// Global Error Handler
app.use((req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Route ${req.originalUrl} could not be found!`, 404))
})
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("Error:", err.message)
    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.stack
        })
    }
    res.status(500).json({
        success: false,
        message: 'Internal server error!'
    })
})
 
export default app;