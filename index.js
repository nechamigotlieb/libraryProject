const readline = require('readline/promises');

const bookService = require('./book.service');

const userService = require('./user.service');


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const main = async () => {

    bookService.addBook(101, "ספר תכנות", "מחשבים");
    userService.addUser(201, "nodeJS", "מחשבים");

    console.log("--- מערכת ניהול ספריה ---");

    
    const bookInput = await rl.question("הכנס קוד ספר: ");
    const bookCode = parseInt(bookInput); 

   
    const userInput = await rl.question("הכנס קוד משתמש: ");
    const userCode = parseInt(userInput);

    // שימוש במודולים כדי לשלוף את האובייקטים הרצויים
    const bookObject = bookService.returnBookByCode(bookCode);
    const userObject = userService.returnUserByCode(userCode);

    // בדיקה האם שני האובייקטים אכן נמצאו במערכים
    if (bookObject && userObject
      && bookObject.category === userObject.kindOfBook && bookObject.isBorrowed===false
      && userObject.isBorrowedBook===false
    ) {
        userObject.isBorrowedBook=true;
        bookObject.isBorrowed=true;
        console.log("\nפעולה אושרה:");
        console.log(`הספר המבוקש: ${bookObject.name}`);
        console.log(`שם המשתמש: ${userObject.name}`);
        

        
    } else {
        console.log("\nשגיאה: קוד הספר או קוד המשתמש אינם קיימים במערכת.");
    }
    



   
    rl.close();
};


main();