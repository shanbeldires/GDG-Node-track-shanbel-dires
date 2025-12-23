import { bookSchema } from '../utils/validationSchema.js';

let books = []; 
export const getAllBooks = (req, res) => {
    res.status(200).json(books);
};

export const getSearchPage = (req, res) => {
    res.status(200).send("You are on the search page");
};

export const getBookById = (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) return res.status(404).json({ message: "Not Found" });
    res.status(200).json(book);
};

export const createBook = (req, res) => {
    const { error } = bookSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const newBook = {
        id: Date.now(), 
        ...req.body
    };
    books.push(newBook);
    res.status(201).json(newBook);
};

export const deleteBook = (req, res) => {
    const initialLength = books.length;
    books = books.filter(b => b.id !== parseInt(req.params.id));
    
    if (books.length === initialLength) return res.status(404).json({ message: "Not Found" });
    res.status(200).json({ message: "Book deleted successfully" });
};
