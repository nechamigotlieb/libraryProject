
const books = require('../data/books');
const users = require('../data/users');

const getAllBooks = (req, res) => {
    // הגדרת פרמטרים שאינם חובה והגדרת ערכי ברירת מחדל
    let { page = 1, limit = 10, name = "" } = req.query;
    
    page = parseInt(page);
    limit = parseInt(limit);

    // אפשרות לחפש לפי שם ספר
    let filteredBooks = books;
    if (name) {
        filteredBooks = filteredBooks.filter(book => book.name.includes(name));
    }

    // אפשרות הגבלה של כמות לדף (pagination)
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

    res.status(200).json(paginatedBooks);
};

const borrowBook = (req, res) => {
    const { userId, bookCode } = req.body;
    const user = users.find(u => u.id === userId);
    
    if (user) {
        user.borrowedBooks.push(bookCode); // עדכון המשתמש המתאים 
        res.status(200).json({ message: "הספר הושאל בהצלחה", user });
    } else {
        res.status(404).json({ message: "משתמש לא נמצא" });
    }
};

const returnBook = (req, res) => {
    const { userId, bookCode } = req.body;
    const user = users.find(u => u.id === userId);
    
    if (user) {
        user.borrowedBooks = user.borrowedBooks.filter(code => code !== bookCode); // עדכון המשתמש המתאים
        res.status(200).json({ message: "הספר הוחזר בהצלחה", user });
    } else {
        res.status(404).json({ message: "משתמש לא נמצא" });
    }
};

module.exports = { getAllBooks, borrowBook, returnBook };
