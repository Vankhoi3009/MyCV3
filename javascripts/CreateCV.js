document.addEventListener('DOMContentLoaded', () => {
    const cvForm = document.getElementById('cvForm');
    const cvContent = document.getElementById('cvContent');
    const addExperienceButton = document.getElementById('addExperience');
    const addEducationButton = document.getElementById('addEducation');
    const experienceFields = document.getElementById('experienceFields');
    const educationFields = document.getElementById('educationFields');
    const backButton = document.getElementById('backButton');

    function addExperience() {
        const experienceDiv = document.createElement('div');
        experienceDiv.classList.add('experience');
        experienceDiv.innerHTML = `
            <label for="jobTitle">Job Title:</label>
            <input type="text" class="jobTitle" required>
            
            <label for="company">Company:</label>
            <input type="text" class="company" required>
            
            <label for="experienceDates">Dates:</label>
            <input type="text" class="experienceDates" placeholder="e.g., Jan 2020 - Dec 2021" required>
            
            <label for="experienceDescription">Description:</label>
            <textarea class="experienceDescription" rows="3" required></textarea>
        `;
        experienceFields.appendChild(experienceDiv);
    }

    function addEducation() {
        const educationDiv = document.createElement('div');
        educationDiv.classList.add('education');
        educationDiv.innerHTML = `
            <label for="degree">Degree:</label>
            <input type="text" class="degree" required>
            
            <label for="institution">Institution:</label>
            <input type="text" class="institution" required>
            
            <label for="educationDates">Dates:</label>
            <input type="text" class="educationDates" placeholder="e.g., Sep 2016 - Jun 2020" required>
            
            <label for="educationDescription">Description:</label>
            <textarea class="educationDescription" rows="3" required></textarea>
        `;
        educationFields.appendChild(educationDiv);
    }

    addExperienceButton.addEventListener('click', addExperience);
    addEducationButton.addEventListener('click', addEducation);

    cvForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let cvHtml = `
            <h1>${document.getElementById('fullName').value}</h1>
            <p>Email: ${document.getElementById('email').value}</p>
            <p>Phone: ${document.getElementById('phone').value}</p>
            <h2>Experience</h2>
        `;

        document.querySelectorAll('.experience').forEach((exp) => {
            cvHtml += `
                <h3>${exp.querySelector('.jobTitle').value}</h3>
                <p>Company: ${exp.querySelector('.company').value}</p>
                <p>Dates: ${exp.querySelector('.experienceDates').value}</p>
                <p>${exp.querySelector('.experienceDescription').value}</p>
            `;
        });

        cvHtml += `<h2>Education</h2>`;

        document.querySelectorAll('.education').forEach((edu) => {
            cvHtml += `
                <h3>${edu.querySelector('.degree').value}</h3>
                <p>Institution: ${edu.querySelector('.institution').value}</p>
                <p>Dates: ${edu.querySelector('.educationDates').value}</p>
                <p>${edu.querySelector('.educationDescription').value}</p>
            `;
        });

        cvHtml += `<h2>Skills</h2><p>${document.getElementById('skills').value}</p>`;

        cvContent.innerHTML = cvHtml;
    });

    backButton.addEventListener('click', () => {
        window.history.back();
    });
});
function downloadCV() {
    const cvContent = document.getElementById('cvContent');

    // Use html2canvas to capture the screenshot of the CV content
    html2canvas(cvContent, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF('p', 'mm', 'a4');

        // Calculate the position to center the content
        const imgWidth = 210; // Width of A4 page in mm
        const pageHeight = 297; // Height of A4 page in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;

        // Center the content horizontally
        const marginLeft = (imgWidth - imgWidth) / 2;

        // Add image to PDF document
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Handle multi-page content
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            doc.addPage();
            doc.addImage(imgData, 'PNG', marginLeft, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        // Save the PDF with the desired filename
        doc.save('my-cv.pdf');
    }).catch(err => {
        console.error("Error generating PDF:", err);
    });
}

document.getElementById('downloadButton').addEventListener('click', downloadCV);

document.addEventListener('DOMContentLoaded', () => {
    const saveButton = document.getElementById('saveButton');
    const cvForm = document.getElementById('cvForm');
    
    saveButton.addEventListener('click', () => {
        // Lấy dữ liệu từ form
        const formData = new FormData(cvForm);
        
        // Tạo đối tượng chứa dữ liệu CV
        const cvData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            experiences: [], // Lưu danh sách kinh nghiệm
            education: [], // Lưu danh sách giáo dục
            skills: formData.get('skills')
        };

        // Lấy thông tin từ các trường kinh nghiệm
        document.querySelectorAll('#experienceFields .experience').forEach(exp => {
            cvData.experiences.push({
                jobTitle: exp.querySelector('.jobTitle').value,
                company: exp.querySelector('.company').value,
                dates: exp.querySelector('.experienceDates').value,
                description: exp.querySelector('.experienceDescription').value
            });
        });

        // Lấy thông tin từ các trường giáo dục
        document.querySelectorAll('#educationFields .education').forEach(edu => {
            cvData.education.push({
                degree: edu.querySelector('.degree').value,
                institution: edu.querySelector('.institution').value,
                dates: edu.querySelector('.educationDates').value,
                description: edu.querySelector('.educationDescription').value
            });
        });

        // Chuyển dữ liệu thành JSON và lưu vào local storage
        localStorage.setItem('savedCV', JSON.stringify(cvData));
        
        // Thông báo người dùng
        alert('CV đã được lưu thành công!');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const shareButton = document.getElementById('shareButton');
    const cvForm = document.getElementById('cvForm');
    
    shareButton.addEventListener('click', () => {
        // Lấy dữ liệu từ form
        const formData = new FormData(cvForm);
        
        // Tạo đối tượng chứa dữ liệu CV
        const cvData = {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            experiences: [], // Lưu danh sách kinh nghiệm
            education: [], // Lưu danh sách giáo dục
            skills: formData.get('skills')
        };

        // Lấy thông tin từ các trường kinh nghiệm
        document.querySelectorAll('#experienceFields .experience').forEach(exp => {
            cvData.experiences.push({
                jobTitle: exp.querySelector('.jobTitle').value,
                company: exp.querySelector('.company').value,
                dates: exp.querySelector('.experienceDates').value,
                description: exp.querySelector('.experienceDescription').value
            });
        });

        // Lấy thông tin từ các trường giáo dục
        document.querySelectorAll('#educationFields .education').forEach(edu => {
            cvData.education.push({
                degree: edu.querySelector('.degree').value,
                institution: edu.querySelector('.institution').value,
                dates: edu.querySelector('.educationDates').value,
                description: edu.querySelector('.educationDescription').value
            });
        });

        // Gửi dữ liệu CV lên server để lưu trữ và chia sẻ
        fetch('/share-cv', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cvData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Chia sẻ thành công
                alert('CV đã được chia sẻ lên trang chủ!');
            } else {
                // Xử lý lỗi
                alert('Có lỗi xảy ra khi chia sẻ CV.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Có lỗi xảy ra khi chia sẻ CV.');
        });
    });
});

// -------------------------------Xử lý lấy sql backend ở đây----------------------------------------------------------
const express = require('express');
const app = express();

app.use(express.json());

app.post('/share-cv', (req, res) => {
    const cvData = req.body;

    // Xử lý lưu trữ CV lên cơ sở dữ liệu hoặc nơi lưu trữ khác
    // Giả sử bạn lưu CV thành công
    const success = true;

    if (success) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});



