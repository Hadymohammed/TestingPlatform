CREATE TABLE students(
    student_id SERIAL PRIMARY KEY,
    national_id VARCHAR(14) UNIQUE NOT NULL,
    university_id VARCHAR(20) UNIQUE NULL,
    arabic_name VARCHAR(50) NOT NULL,
    english_name VARCHAR(50) NULL,
    username VARCHAR(50) NULL UNIQUE,
    password TEXT NOT NULL,
    phone VARCHAR(15) NULL, 
    facutly_id int NOT NULL,

    FOREIGN KEY (facutly_id) REFERENCES facutly(facutly_id)
);