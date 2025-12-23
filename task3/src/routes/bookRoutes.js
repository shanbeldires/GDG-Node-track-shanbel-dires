import express from 'express';
import * as bookController from '../controllers/bookController.js';

const router = express.Router();

router.get('/', bookController.getAllBooks);
router.get('/search', bookController.getSearchPage); 
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.delete('/:id', bookController.deleteBook);

export default router;
