CREATE TABLE studentEndTest(
    id SERIAL primary key,
    test_id int NOT NULL ,
    student_id int NOT NULL,
    date timestamp default CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (test_id) REFERENCES tests(id)
);