document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form[action="/login"]');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Ngăn chặn form submit mặc định

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username === "" || password === "") {
            alert("Please enter both username and password.");
            return;
        }

        try {

            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const result = await response.json();

            if (response.ok) {
                alert("Login successful!");
                window.location.href = "/index.html"; // Điều hướng đến trang chủ sau khi đăng nhập thành công
            } else {
                alert(result.message || "Login failed. Please try again.");
            }
        } catch (error) {
            alert("An error occurred during login. Please try again later: " + error);
        }
    });
});
// ------------------------------Xử lý lấy qsl back end ở đây---------------------------------------
const express = require('express');
const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "password123") {
        res.json({ success: true, message: "Login successful" });
        window.location.href = '/index.html';
    
    } else {
        res.status(401).json({ success: false, message: "Invalid username or password" });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
