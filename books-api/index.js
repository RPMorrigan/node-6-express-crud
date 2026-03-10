// ---------------------------------
// Boilerplate Code to Set Up Server
// ---------------------------------

import express from 'express';
import fs from 'fs/promises';

// Express instantce
const app = express();

// I/O port
const port = 3000;

// Specifies we're using json
app.use(express.json());

// This shows us our server is up and running correctly.
app.listen(port, () => {
    console.log(`Beep Boop. Server listening to port: ${port}`)
});

// ---------------------------------
// Helper Functions
// ---------------------------------

// 1. getAllBooks()

app.get("/get-all-books", async (req, res) => {

    try {
        const data = await fs.readFile('books-data.json', 'utf8');
        const books = JSON.parse(data);

        let list = '';

        for (let book in books) {
            list += books[book].title + '\n \n'
                + books[book].text + '\n \n \n';
        }

        res.send(list);
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Something happened while getting all books."
        })
    }

    });

// 2. getOneBook(index)

app.get("/get-one-book/:index", async (req, res) => {
    const data = await fs.readFile('books-data.json', 'utf8');
    const books = JSON.parse(data);

    let index = req.params.index;

    let book = books[index];

    if (!book) {
        throw new Error("Book was not found");
    }

    book = books[index].title + '\n \n'
             + books[index].text ;

    res.send(book);

})

// 3. getOneBookTitle(index)

app.get("/get-one-book-title/:index", async (req, res) => {

    try {
        const data = await fs.readFile('books-data.json', 'utf8');
    const books = JSON.parse(data);
    
    let index = req.params.index;

        res.send(books[index].title);
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Server error. Something went wrong while getting the book."
        })
    }

})

// ---------------------------------
// API Endpoints
// ---------------------------------

// 1. GET /get-all-books

// 2. GET /get-one-book/:index

// 3. GET /get-one-book-title/:index — try writing this one yourself! 
