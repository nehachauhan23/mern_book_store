import fs from 'fs';
import path from 'path';
import Book from './book.model.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Endpoint to read books.json and insert into MongoDB
export const addBooks =  async(req, res) => {
    const filePath = path.join(__dirname, 'books.json');

    fs.readFile(filePath, 'utf8', async (err, data) => {
        if (err) {
            console.error('Error reading books.json:', err);
            return res.status(500).json({ message: 'Failed to read books.json', error: err.message });
        } 

        try {
            const books = JSON.parse(data); // Parse the JSON content

            // Check if the data is an array
            if (!Array.isArray(books)) {
                return res.status(400).json({ message: 'Invalid data format in books.json. Expected an array.' });
            }

            // Insert all books into MongoDB
            const insertedBooks = await Book.insertMany(books);

            res.status(201).json({
                message: 'Books inserted successfully.',
                data: insertedBooks
            });
        } catch (error) {
            console.error('Error inserting books:', error);
            res.status(500).json({ message: 'Failed to insert books into MongoDB.', error: error.message });
        }
    });
}
