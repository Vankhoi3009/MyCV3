
// Kết nối với MySQL
import mysql from 'mysql2';
function connect(){
    const connection = mysql.createConnection({
        host: 'database-2.cvc8e4mqgkzh.us-east-1.rds.amazonaws.com',    // Thay bằng host MySQL của bạn (có thể là localhost hoặc IP của server)
        user: 'admin',         // Tên người dùng MySQL
        password: 'khoi12345', // Mật khẩu MySQL
        database: 'MyCVDatabase'    // Tên cơ sở dữ liệu bạn muốn kết nối
    });
    connection.connect((err) => {
        if (err) {
            console.error('Kết nối thất bại: ', err);
            return false;
        }
        console.log('Kết nối thành công tới MySQL');
        return connection;
    });
}

export function queryDatabase(fullName, email, username, password ) {
    // Lấy ngày, tháng và năm
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Tháng bắt đầu từ 0, vì vậy cộng 1
    const year = now.getFullYear();
    
    // Chuyển đổi mili giây thành giây
    const milliseconds = Date.now();
    const seconds = Math.floor(milliseconds / 1000);

    // Định dạng ngày tháng năm
    const formattedDate = `${day}-${month}-${year}`;

    const query = 'INSERT INTO users (id,full_name, email, username, password,created_at) VALUES (?, ?, ?, ?, ?, ?)';

    // Thực hiện câu lệnh SQL
    connection.query(query, [seconds, fullName, email, username, password, formattedDate], (err, results) => {
        if (err) {
            alert('Lỗi khi thực hiện truy vấn: ', err);
            return false;
        }
        alert('Dữ liệu đã được chèn thành công:', results);
        return true;

    });

}
