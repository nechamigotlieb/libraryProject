const users = require('../data/users');

const signUp = (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json({ message: "המשתמש נרשם בהצלחה", user: newUser });
};

const signIn = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.status(200).json({ message: "התחברות מוצלחת", user });
    } else {
        res.status(401).json({ message: "שם משתמש או סיסמה שגויים" });
    }
};

const getAllUsers = (req, res) => {
    res.status(200).json(users);
};

module.exports = { signUp, signIn, getAllUsers };