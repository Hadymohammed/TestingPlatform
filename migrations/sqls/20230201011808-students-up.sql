CREATE TABLE students(
    student_id SERIAL PRIMARY KEY,
    national_id VARCHAR(14) UNIQUE NOT NULL,
    university_id VARCHAR(20) UNIQUE NULL,
    arabic_name VARCHAR(50) NOT NULL,
    english_name VARCHAR(50) NULL,
    username VARCHAR(50) NULL UNIQUE,
    password TEXT NOT NULL,
    phone VARCHAR(15) NULL, 
    faculty_id int NOT NULL,
    grade VARCHAR(20),
    
    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id)
);