const User = require('./User');


const usersArray = [];

// פונקציה לקבלת משתמש לפי תעודת זהות / קוד
const returnUserByCode = (id) => {
    const user = usersArray.find(u => u.id === id);
    
    if (user) {
     
        
        if (typeof user.returnUser === 'function') {
             user.returnUser(); 
        }
        return true;
    }
    return false; 
};

// הדפסת כל המשתמשים
const printAllUsers = () => {
    console.log(usersArray);
};

// הוספת משתמש למערך
const addUser = (id, name, kindOfBook) => {
    const newUser = new User(id, name, kindOfBook);
    usersArray.push(newUser); // תוקן מ-booksArray ל-usersArray
};

// מחיקת משתמש
const deleteUser = (id) => {
    const indexUserToDelete = usersArray.findIndex(u => u.id === id);
    
    if (indexUserToDelete !== -1) {
        usersArray.splice(indexUserToDelete, 1); // תוקן מ-booksArray ל-usersArray
        return true; 
    }
    return false;
};


module.exports = {
    returnUserByCode,
    printAllUsers,
    addUser,
    deleteUser,
};