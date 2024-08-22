const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); 
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
            res.status(500).json({ message: 'Signup error ', error: err });
            console.log(`Signup error ! `);
            return false;
        }
        res.status(200).json({ message: 'Signup success', results });
        console.log(`Signup success `);
        return true
    });
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        console.log(`Vui lòng nhập tên người dùng và mật khẩu `);
        return res.status(400).json({ message: 'Vui lòng nhập tên người dùng và mật khẩu.' });
    }
    const query = "SELECT * FROM MyCVDatabase.users where username='?'";
    connection.query(query, [username], async (err, results) => {
        if (err) {
            console.log(`error login ! `);
            return res.status(500).json({ message: 'Lỗi khi thực hiện truy vấn.', error: err });
        }

        if (results.length === 0) {
            console.log(`Tên người dùng không tồn tại ! `);
            return res.status(401).json({ message: 'Tên người dùng không tồn tại.' });
        }
        const user = results[0];

        if (password==user.password) {
            console.log(`Đăng nhập thành công `);
            res.status(200).json({ message: 'Đăng nhập thành công', user });
            return user.id
        } else {
            console.log(`Mật khẩu không chính xác. `);
            res.status(401).json({ message: 'Mật khẩu không chính xác.' });
            return false
        }
    });
});

try{
    
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
    
}
catch(error){
    console.log(`error :${error}`);

}
