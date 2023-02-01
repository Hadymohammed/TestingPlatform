CREATE TABLE student_group(
    student_group_id SERIAL PRIMARY KEY,
    creator_id INT NOT NULL,
    name VARCHAR(30) NOT NULL,

    FOREIGN KEY (creator_id) REFERENCES admins(admin_id)
);