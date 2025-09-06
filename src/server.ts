import mongoose from 'mongoose';
import { Server } from "http";
import { configDotenv } from 'dotenv';
import app from './app';
configDotenv();

const PORT = process.env.PORT || 3000;

let server: Server;

const main = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.xjdofai.mongodb.net/book-library-management?retryWrites=true&w=majority&appName=Cluster0`);
    console.log('Connected to MongoDB');
    server = app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`)
    })
}
main();