// server.js (Máy chủ Node.js)
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Cho phép truy cập từ các nguồn khác

const connection = mysql.createConnection({
    host: 'database-2.cvc8e4mqgkzh.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'khoi12345',
    database: 'MyCVDatabase'
});

connection.connect();

app.post('/signup', (req, res) => {
    const { fullName, email, username, password } = req.body;
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const milliseconds = Date.now();
    const seconds = Math.floor(milliseconds / 1000);
    const formattedDate = `${day}-${month}-${year}`;
    const query = 'INSERT INTO users (id, full_name, email, username, password, created_at) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(query, [seconds, fullName, email, username, password, formattedDate], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Lỗi khi thực hiện truy vấn', error: err });
            return;
        }
        res.status(200).json({ message: 'Dữ liệu đã được chèn thành công', results });
    });
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Vui lòng nhập tên người dùng và mật khẩu.' });
    }

    const query2 = 'SELECT * FROM users WHERE username = ?';
    const query = "SELECT * FROM MyCVDatabase.users where username='lovankhoi0110'";
    connection.query(query, [username], async (err, results) => {
        if (err) {
            console.error('Lỗi khi thực hiện truy vấn: ', err);
            return res.status(500).json({ message: 'Lỗi khi thực hiện truy vấn.', error: err });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Tên người dùng không tồn tại.' });
        }
        const user = results[0];

        if (password==user.password) {
            res.status(200).json({ message: 'Đăng nhập thành công', user });
            return user.id
        } else {
            res.status(401).json({ message: 'Mật khẩu không chính xác.' });
            return false
        }
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
