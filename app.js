const http = require('http');

const PORT = 5050;


let visitCount = 0;
const requestsList = [];

const server = http.createServer((req, res) => {
   
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    const method = req.method;
    const url = req.url;


    visitCount++;
    requestsList.push(`${method} ${url}`);

  
    if (method === 'GET' && url === '/requests') {
        const responseText = `מספר הביקורים בשרת: ${visitCount}\n\nרשימת הבקשות שבוצעו עד כה:\n${requestsList.join('\n')}`;
        res.statusCode = 200;
        res.end(responseText);
    } else {
     
        const responseText = `ברוך הבא לאתר שלנו, הפעלת מתודת ${method} לכתובת: ${url}`;
        res.statusCode = 200;
        res.end(responseText);
    }
});

server.listen(PORT, () => {
    console.log(`השרת רץ וניתן לגשת אליו בכתובת: http://localhost:${PORT}`);
});