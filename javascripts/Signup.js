document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.querySelector('form[action="/signup"]');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');

    signUpForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Ngăn chặn form submit mặc định

        const fullName = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const username = document.getElementById('username').value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // Kiểm tra xem mật khẩu và xác nhận mật khẩu có khớp không
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }

        // Kiểm tra các trường đã được điền đầy đủ chưa
        if (!fullName || !email || !username || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: fullName, email, username, password })
            });

            const result = await response.json();

            if (response.ok) {
                alert("Sign-up successful! You can now log in.");
                window.location.href = "login.html"; // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
            } else {
                alert(result.message || "Sign-up failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during sign-up:", error);
            alert("An error occurred during sign-up. Please try again later.");
        }
    });
});
