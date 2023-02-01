CREATE TABLE student_in_group(
    studet_in_group_id SERIAL PRIMARY KEY,
    group_id INT NOT NULL,
    student_id INT NOT NULL,

    FOREIGN KEY (group_id) REFERENCES student_group(student_group_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);