const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// אתחול האפליקציה של express
const app = express();
const PORT = 5050;

// ==========================================
// middlewares צד שלישי (Third-party)
// ==========================================

// 1. CORS Middleware
// מאפשר גישה לשרת מכל דומיין (לקוח) כדי למנוע שגיאות Cross-Origin Resource Sharing.
app.use(cors());

// 2. Helmet Middleware
// מוסיף כותרות HTTP (headers) שונות לשיפור האבטחה של השרת מפני התקפות נפוצות.
app.use(helmet());

// 3. Express Rate Limit Middleware
// מגביל את כמות הבקשות שכתובת IP מסוימת יכולה לשלוח בזמן נתון, כדי להגן מפני התקפות DoS.
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // חלון זמן של 15 דקות
    max: 100, // הגבלה ל-100 בקשות מכל IP במהלך 15 הדקות
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use(limiter);

// 4. Logger Middleware (רק בסביבת פיתוח)
// מדפיס את נתוני הבקשה ל-console אם השרת מורץ במצב פיתוח.
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`[Development Log] Received ${req.method} request to ${req.url}`);
        next();
    });
}

// ==========================================
// middlewares מותאמים אישית (Custom)
// ==========================================

// הערה: לפי ההוראות, את אלה רצוי להפריד לתיקייה נפרדת (למשל middlewares/custom.js) ולייבא לכאן.
// לנוחות הצגת הקוד, הכנסתי אותם ישירות לקובץ הראשי.

// 5. Middleware להוספת התאריך הנוכחי
app.use((req, res, next) => {
    req.currentDate = new Date();
    next();
});

// 6. Middleware להדפסת התאריך (רק עבור בקשות GET)
app.use((req, res, next) => {
    if (req.method === 'GET') {
        console.log(`[GET Request] Processed at: ${req.currentDate.toLocaleString()}`);
    }
    next();
});

// ==========================================
// רשות: Middleware לחסימת האתר בזמנים מסוימים (שישי-שבת)
// ==========================================
const blockDaysMiddleware = (blockedDays) => {
    return (req, res, next) => {
        const currentDay = req.currentDate.getDay(); // 0 = ראשון, ..., 5 = שישי, 6 = שבת
        const currentHour = req.currentDate.getHours();

        const isBlocked = blockedDays.some(day => {
            if (day === 5 && currentDay === 5 && currentHour >= 12) {
                // שישי מחצות (12 בצהריים)
                return true;
            }
            if (day === 6 && currentDay === 6 && currentHour < 22) {
                // שבת עד 10 בלילה (22:00)
                return true;
            }
            return false;
        });

        if (isBlocked) {
            return res.status(403).send('האתר סגור כעת לפעילות. נשוב לפעילות במוצאי שבת.');
        }

        next();
    };
};

// הפעלת החסימה עבור שישי (5) ושבת (6)
app.use(blockDaysMiddleware([5, 6]));

// ==========================================
// נתיבים (Routes) כפי שהיו בשלב הקודם (לדוגמה)
// ==========================================

let visitCount = 0;
const requestsList = [];

app.get('/requests', (req, res) => {
    visitCount++;
    requestsList.push(`GET /requests`);
    res.send(`מספר הביקורים בשרת: ${visitCount}\nרשימת הבקשות:\n${requestsList.join('\n')}`);
});

app.use((req, res) => {
    res.send(`ברוך הבא לאתר שלנו, הפעלת מתודת ${req.method} לכתובת: ${req.url}`);
});

// ==========================================
// הפעלת השרת
// ==========================================
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});