document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('searchButton');
    
    searchButton.addEventListener('click', () => {
        const searchTerm = document.querySelector('.search input').value;
        if (searchTerm) {
            alert(`Searching for: ${searchTerm}`);
        } else {
            alert('Please enter a search term.');
        }
    });

    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (name && email && message) {
            alert('Your message has been sent successfully!');
            contactForm.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cvCardsContainer = document.getElementById('cvCardsContainer');

    // Đây là dữ liệu giả lập, bạn có thể lấy từ API server
    const sharedCVs = [
        {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            experiences: [
                {
                    jobTitle: 'Software Engineer',
                    company: 'ABC Corp',
                    dates: 'Jan 2020 - Dec 2021',
                    description: 'Developed web applications using JavaScript.'
                }
            ],
            education: [
                {
                    degree: 'B.Sc. Computer Science',
                    institution: 'XYZ University',
                    dates: 'Sep 2016 - Jun 2020',
                    description: 'Graduated with honors.'
                }
            ],
            skills: 'JavaScript, HTML, CSS'
        },
        {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            experiences: [
                {
                    jobTitle: 'Software Engineer',
                    company: 'ABC Corp',
                    dates: 'Jan 2020 - Dec 2021',
                    description: 'Developed web applications using JavaScript.'
                }
            ],
            education: [
                {
                    degree: 'B.Sc. Computer Science',
                    institution: 'XYZ University',
                    dates: 'Sep 2016 - Jun 2020',
                    description: 'Graduated with honors.'
                }
            ],
            skills: 'JavaScript, HTML, CSS'
        },
        {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            experiences: [
                {
                    jobTitle: 'Software Engineer',
                    company: 'ABC Corp',
                    dates: 'Jan 2020 - Dec 2021',
                    description: 'Developed web applications using JavaScript.'
                }
            ],
            education: [
                {
                    degree: 'B.Sc. Computer Science',
                    institution: 'XYZ University',
                    dates: 'Sep 2016 - Jun 2020',
                    description: 'Graduated with honors.'
                }
            ],
            skills: 'JavaScript, HTML, CSS'
        },
        {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            experiences: [
                {
                    jobTitle: 'Software Engineer',
                    company: 'ABC Corp',
                    dates: 'Jan 2020 - Dec 2021',
                    description: 'Developed web applications using JavaScript.'
                }
            ],
            education: [
                {
                    degree: 'B.Sc. Computer Science',
                    institution: 'XYZ University',
                    dates: 'Sep 2016 - Jun 2020',
                    description: 'Graduated with honors.'
                }
            ],
            skills: 'JavaScript, HTML, CSS'
        },
        {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            experiences: [
                {
                    jobTitle: 'Software Engineer',
                    company: 'ABC Corp',
                    dates: 'Jan 2020 - Dec 2021',
                    description: 'Developed web applications using JavaScript.'
                }
            ],
            education: [
                {
                    degree: 'B.Sc. Computer Science',
                    institution: 'XYZ University',
                    dates: 'Sep 2016 - Jun 2020',
                    description: 'Graduated with honors.'
                }
            ],
            skills: 'JavaScript, HTML, CSS'
        },
        {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            experiences: [
                {
                    jobTitle: 'Software Engineer',
                    company: 'ABC Corp',
                    dates: 'Jan 2020 - Dec 2021',
                    description: 'Developed web applications using JavaScript.'
                }
            ],
            education: [
                {
                    degree: 'B.Sc. Computer Science',
                    institution: 'XYZ University',
                    dates: 'Sep 2016 - Jun 2020',
                    description: 'Graduated with honors.'
                }
            ],
            skills: 'JavaScript, HTML, CSS'
        },
        {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            experiences: [
                {
                    jobTitle: 'Software Engineer',
                    company: 'ABC Corp',
                    dates: 'Jan 2020 - Dec 2021',
                    description: 'Developed web applications using JavaScript.'
                }
            ],
            education: [
                {
                    degree: 'B.Sc. Computer Science',
                    institution: 'XYZ University',
                    dates: 'Sep 2016 - Jun 2020',
                    description: 'Graduated with honors.'
                }
            ],
            skills: 'JavaScript, HTML, CSS'
        },
        // Thêm nhiều CV khác nếu cần
    ];

    sharedCVs.forEach(cv => {
        const cvCard = document.createElement('div');
        cvCard.className = 'cv-card';

        cvCard.innerHTML = `
            <h3>${cv.fullName}</h3>
            <p>Email: ${cv.email}</p>
            <p>Phone: ${cv.phone}</p>
            <h4>Experience</h4>
            <ul>
                ${cv.experiences.map(exp => `
                    <li>
                        <strong>${exp.jobTitle}</strong> at ${exp.company} (${exp.dates})
                        <p>${exp.description}</p>
                    </li>
                `).join('')}
            </ul>
            <h4>Education</h4>
            <ul>
                ${cv.education.map(edu => `
                    <li>
                        <strong>${edu.degree}</strong> at ${edu.institution} (${edu.dates})
                        <p>${edu.description}</p>
                    </li>
                `).join('')}
            </ul>
            <h4>Skills</h4>
            <p>${cv.skills}</p>
        `;

        cvCardsContainer.appendChild(cvCard);
    });
});
