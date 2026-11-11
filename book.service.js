const Book = require('./Book');

const booksArray = [];

// החזרת ספר לפי ID
const returnBookByCode = (id) => {
    const book = booksArray.find(b => b.code === id);
    if (book) {
        book.returnBook(); 
        return true;
    }
    return false; 
};

// הדפסת כל הספרים
const printAllBooks = () => {
    console.log(booksArray);
};

// הוספת ספר 
const addBook = (code, nameBook, category, isBorrowed = false) => {
    const newBook = new Book(code, nameBook, category, isBorrowed);
    booksArray.push(newBook);
};

// מחיקת ספר
const deleteBook = (id) => {
    const indexbookToDelete = booksArray.findIndex(b => b.code === id);
    if (indexbookToDelete !== -1) {
        booksArray.splice(indexbookToDelete, 1);
        return true; 
    }
    return false;
};

// עדכון ספר
const updateBook = (code, newNameBook, newCategory, newIsBorrowed) => {
    const mybook = booksArray.find(b => b.code === code);
    if (mybook) {
        mybook.name = newNameBook;   
        mybook.category = newCategory;
        mybook.isBorrowed = newIsBorrowed;
        return true;
    }
    return false;
};


module.exports = {
    returnBookByCode,
    printAllBooks,
    addBook,
    deleteBook,
    updateBook
};