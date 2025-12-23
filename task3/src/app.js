import express from 'express';
import morgan from 'morgan';
import bookRoutes from './routes/bookRoutes.js';
import { errorHandler } from './middleware/errorHandler.js'; // Import here

const app = express();

// 1. Third-party middleware
app.use(morgan('dev'));
app.use(express.json());

// 2. Routes
app.use('/books', bookRoutes);

// 3. Error Handler (MUST BE LAST)
app.use(errorHandler);

export default app;
