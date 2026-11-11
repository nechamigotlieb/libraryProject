class User {
    constructor(id, name, kindOfBook, isBorrowedBook=false ) {
        this.id = id;
        this.name = name;
        this.kindOfBook = kindOfBook;
        this.isBorrowedBook = isBorrowedBook;
    }
}
module.exports = Book;