CREATE TABLE admins(
    admin_id SERIAL PRIMARY KEY,
    type_id INT NOT NULL,
    national_id VARCHAR(14) UNIQUE NOT NULL,
    arabic_name VARCHAR(50) NOT NULL,
    english_name VARCHAR(50) NULL,
    username VARCHAR(50) NULL UNIQUE,
    password TEXT NOT NULL,
    phone VARCHAR(15) NULL, 
    faculty_id int NULL,

    FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id),
    FOREIGN KEY (type_id) REFERENCES admin_type(admin_type_id)
)