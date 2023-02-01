CREATE TABLE student_test(
    id SERIAL primary key,
    test_id int NOT NULL ,
    student_id int NOT NULL,
    score int,
    start_date BIGINT,
    end_date BIGINT,

    FOREIGN KEY (test_id) REFERENCES tests(test_id),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);