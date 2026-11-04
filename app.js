const express = require('express');
const app = express();
const indexRoute = require('./routes/index.route');

app.use(express.json()); // לאפשר קריאת JSON בבקשות
app.use('/api', indexRoute); // קישור הראוטר הראשי לנתיב /api

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`השרת רץ על יציאה ${PORT}`);
});
