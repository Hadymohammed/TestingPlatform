CREATE TABLE tests_for_student(
    id SERIAL primary key,
    test_id int NOT NULL ,
    student_id int NOT NULL,

    FOREIGN KEY (test_id) REFERENCES tests(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
);