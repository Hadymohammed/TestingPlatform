CREATE TABLE studentSolveQuestion(
    id SERIAL primary key,
    test_id int NOT NULL ,
    student_id int NOT NULL,
    question_id int NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (test_id) REFERENCES tests(id),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);